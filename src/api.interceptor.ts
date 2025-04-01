import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T, HttpResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<HttpResponse<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data: T) => this.createSuccessResponse(data, request)),
      catchError((error: unknown) => throwError(() => this.createErrorResponse(error))),
    );
  }

  private createSuccessResponse<T>(data: T, request: Request): HttpResponse<T> {
    const pagination = this.getPagination(data, request);
    const sorting = this.getSorting(request);
    const filters = this.getFilters(request);

    return {
      result: data,
      status: true,
      timestamp: new Date().toISOString(),
      ...(pagination && { pagination }),
      ...(sorting && { sorting }),
      ...(filters && { filters }),
    };
  }

  private getPagination(data: any, req: Request): Pagination | undefined {
    if (!req?.query?.page || !req?.query?.limit || !Array.isArray(data)) return undefined;

    return {
      page: Number(req?.query?.page),
      limit: Number(req?.query?.limit),
      total: data.length,
      pages: Math.ceil((data?.length || 0) / Number(req.query.limit)),
    };
  }

  private getSorting(req: HttpRequest<any>): Sorting[] | undefined {
    if (!req.query?.sort) return undefined;

    const sortValue = req.query.sort;
    let sortParams: string[] = [];

    // ParsedQs türünü güvenli şekilde işleyelim
    if (Array.isArray(sortValue)) {
      // Dizi ise her öğeyi güvenli şekilde string'e dönüştürelim
      sortParams = sortValue.map((item) => (typeof item === 'string' ? item : JSON.stringify(item)));
    } else if (typeof sortValue === 'string') {
      // String ise doğrudan split edebiliriz
      sortParams = sortValue.split(',');
    } else if (sortValue !== null && typeof sortValue === 'object') {
      // Obje ise güvenli bir string temsiline dönüştürelim
      sortParams = [JSON.stringify(sortValue)];
    } else {
      // Diğer durumlarda boş dizi döndürelim
      sortParams = [];
    }

    return sortParams.map((param) => {
      const parts = param.split(':');
      const field = parts[0]?.trim() ?? '';
      const directionValue = parts[1]?.toLowerCase() ?? '';

      return {
        field,
        direction: directionValue === 'desc' ? 'desc' : 'asc',
      };
    });
  }

  private getFilters(req: HttpRequest<any>): Record<string, string> | undefined {
    const filters = Object.entries(req.query)
      .filter(([key]) => !['page', 'limit', 'sort'].includes(key))
      .reduce(
        (acc, [key, value]) => {
          acc[key] = value as string;
          return acc;
        },
        {} as Record<string, string>,
      );

    return Object.keys(filters).length > 0 ? filters : undefined;
  }

  private createErrorResponse(error: unknown): HttpResponse<null> {
    let errors: HttpError[] = [];
    let statusCode = 500;

    if (error instanceof HttpException) {
      const response = error.getResponse();
      statusCode = error.getStatus();

      if (typeof response === 'object' && response !== null) {
        const responseObj = response as Record<string, unknown>;
        const message = responseObj.message;

        if (Array.isArray(message) && message.every((msg) => typeof msg === 'string')) {
          errors = message.map((msg) => this.formatHttpError(statusCode, msg));
        } else if (typeof message === 'string') {
          errors = [this.formatHttpError(statusCode, message)];
        }
      }
    } else if (error instanceof Error) {
      errors = [this.formatHttpError(statusCode, error.message)];
    } else {
      errors = [this.formatHttpError(statusCode, 'An unexpected error occurred.')];
    }

    return {
      result: null,
      status: false,
      timestamp: new Date().toISOString(),
      errors,
    };
  }

  private formatHttpError(statusCode: number, message: string): HttpError {
    return {
      code: this.getStatusCodeMessage(statusCode),
      description: message,
    };
  }

  private getStatusCodeMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'VALIDATION_ERROR';
      case 401:
        return 'UNAUTHORIZED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'RESOURCE_NOT_FOUND';
      case 500:
        return 'INTERNAL_SERVER_ERROR';
      default:
        return 'UNKNOWN_ERROR';
    }
  }
}
