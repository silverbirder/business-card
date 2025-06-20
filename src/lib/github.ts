import { Octokit } from "octokit";
import { env } from "@/env";
import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

function createOctokit() {
  return new Octokit({
    auth: env.GITHUB_TOKEN,
  });
}

export async function fetchGitHubUser(
  userName: string,
): Promise<
  RestEndpointMethodTypes["users"]["getByUsername"]["response"]["data"] | null
> {
  try {
    const octokit = createOctokit();
    const { data: user } = await octokit.rest.users.getByUsername({
      username: userName,
    });
    return user;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}

export async function fetchUserRepos(
  userName: string,
): Promise<
  RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"]
> {
  try {
    const octokit = createOctokit();
    const { data: repos } = await octokit.rest.repos.listForUser({
      username: userName,
      sort: "updated",
      per_page: 10,
    });
    return repos;
  } catch (error) {
    console.error("Error fetching user repos:", error);
    return [];
  }
}

export async function fetchUserGists(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: gists } = await octokit.rest.gists.listForUser({
      username: userName,
      per_page: 10,
    });
    return gists;
  } catch (error) {
    console.error("Error fetching user gists:", error);
    return [];
  }
}

export async function fetchUserOrganizations(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: orgs } = await octokit.rest.orgs.listForUser({
      username: userName,
      per_page: 10,
    });
    return orgs;
  } catch (error) {
    console.error("Error fetching user organizations:", error);
    return [];
  }
}

export async function fetchUserEvents(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: events } =
      await octokit.rest.activity.listPublicEventsForUser({
        username: userName,
        per_page: 30,
      });
    return events;
  } catch (error) {
    console.error("Error fetching user events:", error);
    return [];
  }
}

export async function fetchUserFollowing(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: following } = await octokit.rest.users.listFollowingForUser({
      username: userName,
      per_page: 1,
    });
    return following.length;
  } catch (error) {
    console.error("Error fetching user following:", error);
    return 0;
  }
}

export async function fetchUserStarred(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: starred } =
      await octokit.rest.activity.listReposStarredByUser({
        username: userName,
        per_page: 10,
        sort: "created",
      });
    return starred;
  } catch (error) {
    console.error("Error fetching user starred repos:", error);
    return [];
  }
}

export async function fetchUserSubscriptions(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: subscriptions } =
      await octokit.rest.activity.listReposWatchedByUser({
        username: userName,
        per_page: 10,
      });
    return subscriptions;
  } catch (error) {
    console.error("Error fetching user subscriptions:", error);
    return [];
  }
}

export async function fetchUserReceivedEvents(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: receivedEvents } =
      await octokit.rest.activity.listReceivedEventsForUser({
        username: userName,
        per_page: 30,
      });
    return receivedEvents;
  } catch (error) {
    console.error("Error fetching user received events:", error);
    return [];
  }
}

export async function fetchUserPublicKeys(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: keys } = await octokit.rest.users.listPublicKeysForUser({
      username: userName,
    });
    return keys;
  } catch (error) {
    console.error("Error fetching user public keys:", error);
    return [];
  }
}

export async function fetchUserGpgKeys(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: gpgKeys } = await octokit.rest.users.listGpgKeysForUser({
      username: userName,
    });
    return gpgKeys;
  } catch (error) {
    console.error("Error fetching user GPG keys:", error);
    return [];
  }
}

export async function fetchUserSocialAccounts(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: socialAccounts } =
      await octokit.rest.users.listSocialAccountsForUser({
        username: userName,
      });
    return socialAccounts;
  } catch (error) {
    console.error("Error fetching user social accounts:", error);
    return [];
  }
}

export async function fetchUserFollowers(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: followers } = await octokit.rest.users.listFollowersForUser({
      username: userName,
      per_page: 30,
    });
    return followers;
  } catch (error) {
    console.error("Error fetching user followers:", error);
    return [];
  }
}

export async function fetchUserReceivedPublicEvents(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: receivedPublicEvents } =
      await octokit.rest.activity.listReceivedPublicEventsForUser({
        username: userName,
        per_page: 30,
      });
    return receivedPublicEvents;
  } catch (error) {
    console.error("Error fetching user received public events:", error);
    return [];
  }
}

export async function fetchUserSshSigningKeys(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: sshSigningKeys } =
      await octokit.rest.users.listSshSigningKeysForUser({
        username: userName,
      });
    return sshSigningKeys;
  } catch (error) {
    console.error("Error fetching user SSH signing keys:", error);
    return [];
  }
}

export async function fetchUserPackages(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: packages } = await octokit.rest.packages.listPackagesForUser({
      username: userName,
      package_type: "npm",
      per_page: 30,
    });
    return packages;
  } catch (error) {
    console.error("Error fetching user packages:", error);
    return [];
  }
}

export async function searchUserRepositories(userName: string, query: string) {
  try {
    const octokit = createOctokit();
    const { data: searchResults } = await octokit.rest.search.repos({
      q: `user:${userName} ${query}`,
      sort: "updated",
      per_page: 30,
    });
    return searchResults;
  } catch (error) {
    console.error("Error searching user repositories:", error);
    return { total_count: 0, incomplete_results: false, items: [] };
  }
}

export async function searchUserCommits(userName: string, query?: string) {
  try {
    const octokit = createOctokit();
    const searchQuery = query
      ? `author:${userName} ${query}`
      : `author:${userName}`;
    const { data: searchResults } = await octokit.rest.search.commits({
      q: searchQuery,
      sort: "committer-date",
      per_page: 30,
    });
    return searchResults;
  } catch (error) {
    console.error("Error searching user commits:", error);
    return { total_count: 0, incomplete_results: false, items: [] };
  }
}

export async function searchUserIssues(userName: string, query?: string) {
  try {
    const octokit = createOctokit();
    const searchQuery = query
      ? `author:${userName} ${query}`
      : `author:${userName}`;
    const { data: searchResults } =
      await octokit.rest.search.issuesAndPullRequests({
        q: searchQuery,
        sort: "updated",
        per_page: 30,
      });
    return searchResults;
  } catch (error) {
    console.error("Error searching user issues:", error);
    return { total_count: 0, incomplete_results: false, items: [] };
  }
}

export async function searchUserCode(userName: string, query: string) {
  try {
    const octokit = createOctokit();
    const { data: searchResults } = await octokit.rest.search.code({
      q: `user:${userName} ${query}`,
      sort: "indexed",
      per_page: 30,
    });
    return searchResults;
  } catch (error) {
    console.error("Error searching user code:", error);
    return { total_count: 0, incomplete_results: false, items: [] };
  }
}

export async function checkIfUserFollowsUser(
  userName: string,
  targetUser: string,
) {
  try {
    const octokit = createOctokit();
    const response = await octokit.rest.users.checkFollowingForUser({
      username: userName,
      target_user: targetUser,
    });
    return response.status === 204;
  } catch (error) {
    console.error("Error checking if user follows user:", error);
    return false;
  }
}

export async function checkIfAuthenticatedUserFollowsUser(userName: string) {
  try {
    const octokit = createOctokit();
    const response =
      await octokit.rest.users.checkPersonIsFollowedByAuthenticated({
        username: userName,
      });
    return response.status === 204;
  } catch (error) {
    console.error("Error checking if authenticated user follows user:", error);
    return false;
  }
}

export async function fetchUserStats(userName: string) {
  try {
    const [
      repos,
      gists,
      orgs,
      events,
      starred,
      subscriptions,
      receivedEvents,
      publicKeys,
      gpgKeys,
      socialAccounts,
      followers,
      receivedPublicEvents,
      sshSigningKeys,
      packages,
    ] = await Promise.all([
      fetchUserRepos(userName),
      fetchUserGists(userName),
      fetchUserOrganizations(userName),
      fetchUserEvents(userName),
      fetchUserStarred(userName),
      fetchUserSubscriptions(userName),
      fetchUserReceivedEvents(userName),
      fetchUserPublicKeys(userName),
      fetchUserGpgKeys(userName),
      fetchUserSocialAccounts(userName),
      fetchUserFollowers(userName),
      fetchUserReceivedPublicEvents(userName),
      fetchUserSshSigningKeys(userName),
      fetchUserPackages(userName),
    ]);

    const languageStats: Record<string, number> = {};
    let totalStars = 0;
    let totalForks = 0;

    for (const repo of repos) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] ?? 0) + 1;
      }
      totalStars += repo.stargazers_count ?? 0;
      totalForks += repo.forks_count ?? 0;
    }

    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    // Recent activity analysis
    const recentCommits = events.filter(
      (event) =>
        event.type === "PushEvent" &&
        event.created_at &&
        new Date(event.created_at).getTime() >
          Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).length;

    const recentPRs = events.filter(
      (event) =>
        event.type === "PullRequestEvent" &&
        event.created_at &&
        new Date(event.created_at).getTime() >
          Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).length;

    const recentIssues = events.filter(
      (event) =>
        event.type === "IssuesEvent" &&
        event.created_at &&
        new Date(event.created_at).getTime() >
          Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).length;

    const starredLanguageStats: Record<string, number> = {};
    for (const starredRepo of starred) {
      const language =
        "language" in starredRepo
          ? starredRepo.language
          : starredRepo.repo?.language;
      if (language) {
        starredLanguageStats[language] =
          (starredLanguageStats[language] ?? 0) + 1;
      }
    }

    const yearlyCommits: Record<number, number> = {};

    events.forEach((event) => {
      if (event.type === "PushEvent" && event.created_at) {
        const year = new Date(event.created_at).getFullYear();
        yearlyCommits[year] = (yearlyCommits[year] ?? 0) + 1;
      }
    });

    const eventTypeStats = events.reduce(
      (acc: Record<string, number>, event) => {
        if (event.type) {
          acc[event.type] = (acc[event.type] ?? 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate follower to following ratio
    const followingCount = await fetchUserFollowing(userName);
    const followerToFollowingRatio =
      followingCount > 0 ? followers.length / followingCount : followers.length;

    // Analyze contribution patterns
    const contributionDays = events
      .filter((event) => event.type === "PushEvent" && event.created_at)
      .map((event) => new Date(event.created_at!).getDay());

    const dayOfWeekStats = contributionDays.reduce(
      (acc: Record<string, number>, day: number) => {
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const dayName = days[day];
        if (dayName) {
          acc[dayName] = (acc[dayName] ?? 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    // Monthly activity analysis
    const monthlyActivity = events.reduce(
      (acc: Record<string, number>, event) => {
        if (event.created_at) {
          const month = new Date(event.created_at).getMonth();
          const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const monthName = monthNames[month];
          if (monthName) {
            acc[monthName] = (acc[monthName] ?? 0) + 1;
          }
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    // Package ecosystem analysis
    const packageEcosystems = packages.reduce(
      (acc: Record<string, number>, pkg) => {
        const ecosystem = pkg.package_type;
        acc[ecosystem] = (acc[ecosystem] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalStars,
      totalForks,
      topLanguages,
      repoCount: repos.length,
      repos,
      gists,
      organizations: orgs,
      recentCommits,
      recentPRs,
      recentIssues,
      totalGists: gists.length,
      totalOrganizations: orgs.length,
      starred,
      starredCount: starred.length,
      starredLanguageStats,
      subscriptions,
      subscriptionsCount: subscriptions.length,
      receivedEvents,
      publicKeys,
      publicKeysCount: publicKeys.length,
      gpgKeys,
      gpgKeysCount: gpgKeys.length,
      socialAccounts,
      yearlyCommits,
      eventTypeStats,
      followers,
      followersCount: followers.length,
      receivedPublicEvents,
      receivedPublicEventsCount: receivedPublicEvents.length,
      sshSigningKeys,
      sshSigningKeysCount: sshSigningKeys.length,
      packages,
      packagesCount: packages.length,
      followingCount,
      followerToFollowingRatio,
      dayOfWeekStats,
      monthlyActivity,
      packageEcosystems,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      totalStars: 0,
      totalForks: 0,
      topLanguages: [],
      repoCount: 0,
      repos: [],
      gists: [],
      organizations: [],
      recentCommits: 0,
      recentPRs: 0,
      recentIssues: 0,
      totalGists: 0,
      totalOrganizations: 0,
      starred: [],
      starredCount: 0,
      starredLanguageStats: {},
      subscriptions: [],
      subscriptionsCount: 0,
      receivedEvents: [],
      publicKeys: [],
      publicKeysCount: 0,
      gpgKeys: [],
      gpgKeysCount: 0,
      socialAccounts: [],
      yearlyCommits: {},
      eventTypeStats: {},
      followers: [],
      followersCount: 0,
      receivedPublicEvents: [],
      receivedPublicEventsCount: 0,
      sshSigningKeys: [],
      sshSigningKeysCount: 0,
      packages: [],
      packagesCount: 0,
      followingCount: 0,
      followerToFollowingRatio: 0,
      dayOfWeekStats: {},
      monthlyActivity: {},
      packageEcosystems: {},
    };
  }
}

export async function fetchUserComprehensiveProfile(userName: string) {
  try {
    const [
      user,
      stats,
      recentCommitSearch,
      recentIssueSearch,
      isFollowedByAuth,
    ] = await Promise.all([
      fetchGitHubUser(userName),
      fetchUserStats(userName),
      searchUserCommits(userName, "sort:committer-date"),
      searchUserIssues(userName, "sort:updated"),
      checkIfAuthenticatedUserFollowsUser(userName).catch(() => false), // Fallback if not authenticated
    ]);

    if (!user) {
      return null;
    }

    return {
      user,
      stats,
      recentCommitSearch,
      recentIssueSearch,
      isFollowedByAuth,
      profileCompleteness: {
        hasAvatar: !!user.avatar_url,
        hasBio: !!user.bio,
        hasLocation: !!user.location,
        hasWebsite: !!user.blog,
        hasCompany: !!user.company,
        hasTwitter: !!user.twitter_username,
        hasPublicRepos: user.public_repos > 0,
        hasFollowers: user.followers > 0,
        hasFollowing: user.following > 0,
      },
      activityLevel: {
        totalPublicActivity: stats.eventTypeStats
          ? Object.values(stats.eventTypeStats).reduce(
              (a: number, b: number) => a + b,
              0,
            )
          : 0,
        recentActivity:
          stats.recentCommits + stats.recentPRs + stats.recentIssues,
        diversityScore: stats.topLanguages.length,
        socialEngagement: stats.followersCount + stats.totalOrganizations,
      },
    };
  } catch (error) {
    console.error("Error fetching comprehensive user profile:", error);
    return null;
  }
}
