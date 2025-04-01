export const ResponseGenerator = <T>(data: T, message: string = 'success', status: number = 200) => ({
  data,
  message,
  status,
});
