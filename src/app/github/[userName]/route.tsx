/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import {
  fetchGitHubUser,
  fetchUserStats,
  fetchUserFollowing,
} from "@/lib/github";
import { Flex } from "./_components";
import type { ComprehensiveUserData } from "@/types/github";

export const runtime = "edge";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userName: string }> },
) {
  const { userName } = await params;
  const gitHubUser = await fetchGitHubUser(userName);
  if (!gitHubUser) {
    return new Response("User not found", { status: 404 });
  }

  const [userStats, following] = await Promise.all([
    fetchUserStats(userName),
    fetchUserFollowing(userName),
  ]);

  const userData: ComprehensiveUserData = {
    name: gitHubUser.name ?? gitHubUser.login,
    username: gitHubUser.login,
    bio: gitHubUser.bio ?? "GitHub Developer",
    company: gitHubUser.company ?? "",
    location: gitHubUser.location ?? "",
    email: gitHubUser.email ?? "",
    website: gitHubUser.blog ?? `https://github.com/${gitHubUser.login}`,
    avatar: gitHubUser.avatar_url,
    publicRepos: gitHubUser.public_repos,
    followers: gitHubUser.followers,
    following,
    totalStars: userStats.totalStars,
    totalForks: userStats.totalForks,
    topLanguages: userStats.topLanguages,
    repos: userStats.repos,
    gists: userStats.gists,
    organizations: userStats.organizations,
    recentCommits: userStats.recentCommits,
    recentPRs: userStats.recentPRs,
    recentIssues: userStats.recentIssues,
    totalGists: userStats.totalGists,
    totalOrganizations: userStats.totalOrganizations,
    starred: userStats.starred,
    starredCount: userStats.starredCount,
    starredLanguageStats: userStats.starredLanguageStats,
    subscriptions: userStats.subscriptions,
    subscriptionsCount: userStats.subscriptionsCount,
    receivedEvents: userStats.receivedEvents,
    publicKeys: userStats.publicKeys,
    publicKeysCount: userStats.publicKeysCount,
    gpgKeys: userStats.gpgKeys,
    gpgKeysCount: userStats.gpgKeysCount,
    socialAccounts: userStats.socialAccounts,
    yearlyCommits: userStats.yearlyCommits,
    eventTypeStats: userStats.eventTypeStats,
    followersData: userStats.followers,
    followersCount: userStats.followersCount,
    receivedPublicEvents: userStats.receivedPublicEvents,
    receivedPublicEventsCount: userStats.receivedPublicEventsCount,
    sshSigningKeys: userStats.sshSigningKeys,
    sshSigningKeysCount: userStats.sshSigningKeysCount,
    packages: userStats.packages,
    packagesCount: userStats.packagesCount,
    followingCount: userStats.followingCount,
    followerToFollowingRatio: userStats.followerToFollowingRatio,
    dayOfWeekStats: userStats.dayOfWeekStats,
    monthlyActivity: userStats.monthlyActivity,
    packageEcosystems: userStats.packageEcosystems,
    createdAt: gitHubUser.created_at,
    updatedAt: gitHubUser.updated_at,
    type: gitHubUser.type,
    siteAdmin: gitHubUser.site_admin,
    publicGists: gitHubUser.public_gists,
    hireable: gitHubUser.hireable,
    twitterUsername: gitHubUser.twitter_username,
    gravatarId: gitHubUser.gravatar_id,
  };

  try {
    return new ImageResponse(
      (
        <Flex tw="h-full w-full bg-white font-sans flex-row p-6">
          {/* Left side - User info */}
          <Flex tw="flex-col w-1/2 pr-8">
            <Flex tw="flex items-start mb-6">
              <img
                src={userData.avatar}
                tw="w-20 h-20 rounded-full mr-4"
                alt="Avatar"
              />
              <Flex tw="flex-col flex-1">
                <Flex tw="text-gray-900 text-2xl font-bold mb-1">
                  {userData.name}
                </Flex>
                <Flex tw="text-gray-600 text-base mb-2">
                  @{userData.username}
                </Flex>
                <Flex tw="text-gray-700 text-sm leading-relaxed flex-col">
                  {userData.bio.split("\n").map((line, index) => (
                    <Flex key={index} tw="mb-1">
                      {line}
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
            <Flex tw="flex-col">
              {userData.location && (
                <Flex tw="flex items-center text-gray-600 text-xs mb-1">
                  <Flex tw="mr-1">📍</Flex>
                  <Flex>{userData.location}</Flex>
                </Flex>
              )}
              {userData.company && (
                <Flex tw="flex items-center text-gray-600 text-xs mb-1">
                  <Flex tw="mr-1">🏢</Flex>
                  <Flex>{userData.company}</Flex>
                </Flex>
              )}
              {userData.website && (
                <Flex tw="flex items-center text-gray-600 text-xs mb-1">
                  <Flex tw="mr-1">🌐</Flex>
                  <Flex>{userData.website}</Flex>
                </Flex>
              )}
              {userData.email && (
                <Flex tw="flex items-center text-gray-600 text-xs mb-1">
                  <Flex tw="mr-1">📧</Flex>
                  <Flex>{userData.email}</Flex>
                </Flex>
              )}
              {userData.twitterUsername && (
                <Flex tw="flex items-center text-gray-600 text-xs mb-1">
                  <Flex tw="mr-1">🐦</Flex>
                  <Flex>@{userData.twitterUsername}</Flex>
                </Flex>
              )}
              {userData.hireable && (
                <Flex tw="flex items-center text-green-600 text-xs mb-1">
                  <Flex tw="mr-1">💼</Flex>
                  <Flex>Available for hire</Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
          {/* Right side - Stats */}
          <Flex tw="flex-col w-1/2 pl-6 border-l border-gray-200">
            <Flex tw="text-gray-900 text-lg font-bold mb-2 bg-gray-100 px-2 py-1 rounded">
              GitHub Profile
            </Flex>
            {/* Basic Stats - Ultra Compact */}
            <Flex tw="flex-col mb-3">
              <Flex tw="text-gray-900 text-sm font-bold mb-1 bg-blue-50 px-2 py-0.5 rounded">
                📊 Stats
              </Flex>
              <Flex tw="flex justify-between items-center py-0.5">
                <Flex tw="text-gray-700 text-xs">Repos/Gists</Flex>
                <Flex tw="text-blue-600 font-semibold text-xs">
                  {userData.publicRepos}/{userData.totalGists}
                </Flex>
              </Flex>
              <Flex tw="flex justify-between items-center py-0.5">
                <Flex tw="text-gray-700 text-xs">Followers/Following</Flex>
                <Flex tw="text-green-600 font-semibold text-xs">
                  {userData.followers}/{userData.following}
                </Flex>
              </Flex>
              <Flex tw="flex justify-between items-center py-0.5">
                <Flex tw="text-gray-700 text-xs">⭐Stars/🍴Forks</Flex>
                <Flex tw="text-orange-600 font-semibold text-xs">
                  {userData.totalStars}/{userData.totalForks}
                </Flex>
              </Flex>
              <Flex tw="flex justify-between items-center py-0.5">
                <Flex tw="text-gray-700 text-xs">Starred/Subscriptions</Flex>
                <Flex tw="text-purple-600 font-semibold text-xs">
                  {userData.starredCount}/{userData.subscriptionsCount}
                </Flex>
              </Flex>
            </Flex>
            {/* Languages - Compact */}
            {userData.topLanguages && userData.topLanguages.length > 0 && (
              <Flex tw="flex-col mb-3">
                <Flex tw="text-gray-900 text-sm font-bold mb-1 bg-green-50 px-2 py-0.5 rounded">
                  💻 Languages
                </Flex>
                {userData.topLanguages
                  .slice(0, 3)
                  .map(([name, percentage], index) => {
                    const getLanguageIconUrl = (lang: string) => {
                      const langMap: Record<string, string> = {
                        JavaScript: "javascript/javascript-original",
                        TypeScript: "typescript/typescript-original",
                        Python: "python/python-original",
                        Java: "java/java-original",
                        "C++": "cplusplus/cplusplus-original",
                        "C#": "csharp/csharp-original",
                        PHP: "php/php-original",
                        Ruby: "ruby/ruby-original",
                        Go: "go/go-original",
                        Rust: "rust/rust-plain",
                        Swift: "swift/swift-original",
                        Kotlin: "kotlin/kotlin-original",
                        Dart: "dart/dart-original",
                        HTML: "html5/html5-original",
                        CSS: "css3/css3-original",
                        Shell: "bash/bash-original",
                        Vue: "vuejs/vuejs-original",
                        React: "react/react-original",
                        Angular: "angularjs/angularjs-original",
                        "Node.js": "nodejs/nodejs-original",
                        Docker: "docker/docker-original",
                        GraphQL: "graphql/graphql-plain",
                        MongoDB: "mongodb/mongodb-original",
                        PostgreSQL: "postgresql/postgresql-original",
                        MySQL: "mysql/mysql-original",
                        Redis: "redis/redis-original",
                        Nginx: "nginx/nginx-original",
                        Ubuntu: "ubuntu/ubuntu-plain",
                        Linux: "linux/linux-original",
                        Git: "git/git-original",
                        GitHub: "github/github-original",
                        VSCode: "vscode/vscode-original",
                      };
                      const iconPath =
                        langMap[lang] ??
                        `${lang.toLowerCase()}/${lang.toLowerCase()}-original`;
                      return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}.svg`;
                    };
                    return (
                      <Flex
                        key={index}
                        tw="flex justify-between items-center py-0"
                      >
                        <Flex tw="text-gray-700 text-xs flex items-center">
                          <img
                            src={getLanguageIconUrl(name)}
                            tw="w-3 h-3 mr-1"
                            alt={name}
                          />
                          <Flex>{name}</Flex>
                        </Flex>
                        <Flex tw="text-gray-600 text-xs">
                          {Math.round(percentage)}%
                        </Flex>
                      </Flex>
                    );
                  })}
              </Flex>
            )}
            {/* Activity */}
            <Flex tw="flex-col mb-3">
              <Flex tw="text-gray-900 text-sm font-bold mb-1 bg-orange-50 px-2 py-0.5 rounded">
                🚀 Activity
              </Flex>
              {userData.yearlyCommits &&
                Array.isArray(userData.yearlyCommits) &&
                userData.yearlyCommits.length > 0 && (
                  <Flex tw="flex justify-between items-center py-0">
                    <Flex tw="text-gray-700 text-xs">Year Commits</Flex>
                    <Flex tw="text-indigo-600 text-xs">
                      {userData.yearlyCommits.reduce(
                        (sum: number, month: { count?: number }) =>
                          sum + (month.count ?? 0),
                        0,
                      )}
                    </Flex>
                  </Flex>
                )}
              {userData.recentCommits && userData.recentCommits > 0 && (
                <Flex tw="flex justify-between items-center py-0">
                  <Flex tw="text-gray-700 text-xs">Recent C/PR/I</Flex>
                  <Flex tw="text-blue-500 text-xs">
                    {userData.recentCommits}/{userData.recentPRs}/
                    {userData.recentIssues}
                  </Flex>
                </Flex>
              )}
              {userData.eventTypeStats &&
                Object.keys(userData.eventTypeStats).length > 0 && (
                  <Flex tw="flex justify-between items-center py-0">
                    <Flex tw="text-gray-700 text-xs">Event Types</Flex>
                    <Flex tw="text-violet-600 text-xs">
                      {Object.keys(userData.eventTypeStats).length}
                    </Flex>
                  </Flex>
                )}
            </Flex>
            {/* Community */}
            <Flex tw="flex-col mb-3">
              <Flex tw="text-gray-900 text-sm font-bold mb-1 bg-purple-50 px-2 py-0.5 rounded">
                👥 Community
              </Flex>
              <Flex tw="flex justify-between items-center py-0">
                <Flex tw="text-gray-700 text-xs">Organizations</Flex>
                <Flex tw="text-teal-600 text-xs">
                  {userData.totalOrganizations}
                </Flex>
              </Flex>
              {userData.packagesCount > 0 && (
                <Flex tw="flex justify-between items-center py-0">
                  <Flex tw="text-gray-700 text-xs">Packages</Flex>
                  <Flex tw="text-pink-600 text-xs">
                    {userData.packagesCount}
                  </Flex>
                </Flex>
              )}
              {userData.followerToFollowingRatio && (
                <Flex tw="flex justify-between items-center py-0">
                  <Flex tw="text-gray-700 text-xs">F/F Ratio</Flex>
                  <Flex tw="text-cyan-600 text-xs">
                    {userData.followerToFollowingRatio.toFixed(1)}
                  </Flex>
                </Flex>
              )}
            </Flex>
            {/* Account Info */}
            <Flex tw="flex-col">
              <Flex tw="text-gray-900 text-sm font-bold mb-1 bg-gray-50 px-2 py-0.5 rounded">
                👤 Account
              </Flex>
              {userData.createdAt && (
                <Flex tw="flex justify-between items-center py-0">
                  <Flex tw="text-gray-700 text-xs">Member Since</Flex>
                  <Flex tw="text-gray-600 text-xs">
                    {new Date(userData.createdAt).getFullYear()}
                  </Flex>
                </Flex>
              )}
              {userData.type && (
                <Flex tw="flex justify-between items-center py-0">
                  <Flex tw="text-gray-700 text-xs">Type</Flex>
                  <Flex tw="text-gray-600 text-xs">{userData.type}</Flex>
                </Flex>
              )}
              {userData.siteAdmin && (
                <Flex tw="flex justify-between items-center py-0">
                  <Flex tw="text-gray-700 text-xs">Admin</Flex>
                  <Flex tw="text-red-600 text-xs">Yes</Flex>
                </Flex>
              )}
              {userData.receivedPublicEventsCount > 0 && (
                <Flex tw="flex justify-between items-center py-0">
                  <Flex tw="text-gray-700 text-xs">Public Events</Flex>
                  <Flex tw="text-indigo-500 text-xs">
                    {userData.receivedPublicEventsCount}
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      ),
      {
        width: 910,
        height: 550,
      },
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}
