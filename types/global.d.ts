import { Request } from 'express';

declare global {
  interface HttpRequest<T> extends Request {
    body: T;
  }

  interface HttpResponse<T> {
    result: T | null;
    status: boolean;
    timestamp: string;
    errors?: HttpError[];
    pagination?: Pagination;
    sorting?: Sorting[];
    filters?: Record<string, string>;
  }

  interface HttpError {
    code: string; // Hatanın kodu (örneğin, VALIDATION_ERROR, RESOURCE_NOT_FOUND)
    field?: string;
    description: string;
  }

  interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
  }

  interface Sorting {
    field: string;
    direction: 'asc' | 'desc';
  }

  /**
   * Login
   */

  interface PassportRequest extends Request {
    user: User;
  }

  /**
   * User
   */
  interface User {
    id: number;
    username: string;
    password?: string;
    name: string;
    email: string;
    surname: string;
  }

  /**
   * Github
   */

  interface GitHubPushWebhook {
    ref: string;
    before: string;
    after: string;
    repository: {
      id: number;
      node_id: string;
      name: string;
      full_name: string;
      private: boolean;
      owner: {
        name?: string;
        email?: string;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
      };
      html_url: string;
      description: string;
      fork: boolean;
      url: string;
      forks_url: string;
      keys_url: string;
      collaborators_url: string;
      teams_url: string;
      hooks_url: string;
      issue_events_url: string;
      events_url: string;
      assignees_url: string;
      branches_url: string;
      tags_url: string;
      blobs_url: string;
      git_tags_url: string;
      git_refs_url: string;
      trees_url: string;
      statuses_url: string;
      languages_url: string;
      stargazers_url: string;
      contributors_url: string;
      subscribers_url: string;
      subscription_url: string;
      commits_url: string;
      git_commits_url: string;
      comments_url: string;
      issue_comment_url: string;
      contents_url: string;
      compare_url: string;
      merges_url: string;
      archive_url: string;
      downloads_url: string;
      issues_url: string;
      pulls_url: string;
      milestones_url: string;
      notifications_url: string;
      labels_url: string;
      releases_url: string;
      deployments_url: string;
      created_at: number;
      updated_at: string;
      pushed_at: number;
      git_url: string;
      ssh_url: string;
      clone_url: string;
      svn_url: string;
      homepage: string;
      size: number;
      stargazers_count: number;
      watchers_count: number;
      language: string;
      has_issues: boolean;
      has_projects: boolean;
      has_downloads: boolean;
      has_wiki: boolean;
      has_pages: boolean;
      forks_count: number;
      mirror_url?: string;
      archived: boolean;
      disabled: boolean;
      open_issues_count: number;
      license?: string;
      allow_forking: boolean;
      is_template: boolean;
      web_commit_signoff_required: boolean;
      topics: string[];
      visibility: string;
      forks: number;
      open_issues: number;
      watchers: number;
      default_branch: string;
      stargazers: number;
      master_branch: string;
    };
    pusher: {
      name: string;
      email: string;
    };
    sender: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
    };
    created: boolean;
    deleted: boolean;
    forced: boolean;
    base_ref?: string;
    compare: string;
    commits: Array<{
      id: string;
      tree_id: string;
      distinct: boolean;
      message: string;
      timestamp: string;
      url: string;
      author: {
        name: string;
        email: string;
        username?: string;
      };
      committer: {
        name: string;
        email: string;
        username?: string;
      };
      added: string[];
      removed: string[];
      modified: string[];
    }>;
    head_commit?: {
      id: string;
      tree_id: string;
      distinct: boolean;
      message: string;
      timestamp: string;
      url: string;
      author: {
        name: string;
        email: string;
        username?: string;
      };
      committer: {
        name: string;
        email: string;
        username?: string;
      };
      added: string[];
      removed: string[];
      modified: string[];
    };
  }
}

export {};
