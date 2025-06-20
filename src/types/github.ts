import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

// GitHub API型のエイリアス
export type GitHubUser = RestEndpointMethodTypes["users"]["getByUsername"]["response"]["data"];
export type GitHubRepository = RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"][number];
export type GitHubGist = RestEndpointMethodTypes["gists"]["listForUser"]["response"]["data"][number];
export type GitHubOrganization = RestEndpointMethodTypes["orgs"]["listForUser"]["response"]["data"][number];
export type GitHubStarred = RestEndpointMethodTypes["activity"]["listReposStarredByUser"]["response"]["data"][number];

// 基本的なユーザー情報の型
export interface BaseUserData {
  name: string;
  username: string;
  bio: string;
  location?: string | null;
  company?: string | null;
  email?: string | null;
  website?: string | null;
  avatar: string;
  twitterUsername?: string | null;
  hireable?: boolean | null;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt?: string | null;
  updatedAt?: string | null;
  type?: string;
  siteAdmin?: boolean;
  publicGists?: number;
  gravatarId?: string | null;
}

// GitHub統計データの型
export interface GitHubStatsData {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  totalGists: number;
  starredCount: number;
  subscriptionsCount: number;
  publicKeysCount: number;
  gpgKeysCount: number;
  sshSigningKeysCount: number;
  packagesCount: number;
  followerToFollowingRatio: number;
  createdAt?: string | null;
}

// 高度な統計データの型
export interface AdvancedStatsData {
  topLanguages: [string, number][];
  followerToFollowingRatio: number;
  packageEcosystems: Record<string, number>;
  dayOfWeekStats: Record<string, number>;
  monthlyActivity: Record<string, number>;
  repos: GitHubRepository[];
}

// 最近のアクティビティデータの型
export interface RecentActivityData {
  recentCommits: number;
  recentPRs: number;
  recentIssues: number;
  eventTypeStats: Record<string, number>;
  dayOfWeekStats: Record<string, number>;
  monthlyActivity: Record<string, number>;
  repos: GitHubRepository[];
  packagesCount: number;
  packageEcosystems: Record<string, number>;
  starred: GitHubStarred[];
  receivedPublicEventsCount: number;
}

// ユーザーヘッダー用のデータの型
export interface UserHeaderData {
  name: string;
  username: string;
  bio: string;
  location?: string | null;
  company?: string | null;
  twitterUsername?: string | null;
  hireable?: boolean | null;
  avatar: string;
  socialAccounts?: Array<{ provider: string }>;
  organizations: Array<{ avatar_url: string; login: string }>;
}

// 包括的なユーザーデータの型（route.tsxで使用）
export interface ComprehensiveUserData extends BaseUserData {
  totalStars: number;
  totalForks: number;
  topLanguages: [string, number][];
  repos: GitHubRepository[];
  gists: GitHubGist[];
  organizations: GitHubOrganization[];
  recentCommits: number;
  recentPRs: number;
  recentIssues: number;
  totalGists: number;
  totalOrganizations: number;
  starred: GitHubStarred[];
  starredCount: number;
  starredLanguageStats: Record<string, number>;
  subscriptions: any[];
  subscriptionsCount: number;
  receivedEvents: any[];
  publicKeys: any[];
  publicKeysCount: number;
  gpgKeys: any[];
  gpgKeysCount: number;
  socialAccounts?: Array<{ provider: string }>;
  yearlyCommits: Record<string, number>;
  eventTypeStats: Record<string, number>;
  followersData: any[];
  followersCount: number;
  receivedPublicEvents: any[];
  receivedPublicEventsCount: number;
  sshSigningKeys: any[];
  sshSigningKeysCount: number;
  packages: any[];
  packagesCount: number;
  followingCount: number;
  followerToFollowingRatio: number;
  dayOfWeekStats: Record<string, number>;
  monthlyActivity: Record<string, number>;
  packageEcosystems: Record<string, number>;
}


