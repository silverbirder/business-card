import { Octokit } from "octokit";
import { env } from "@/env";
import type { GitHubUser, GitHubRepository } from "@/types/github";

function createOctokit() {
  return new Octokit({
    auth: env.GITHUB_TOKEN,
  });
}

export async function fetchGitHubUser(
  userName: string,
): Promise<GitHubUser | null> {
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
): Promise<GitHubRepository[]> {
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
    const [repos, gists, socialAccounts] = await Promise.all([
      fetchUserRepos(userName),
      fetchUserGists(userName),
      fetchUserSocialAccounts(userName),
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

    return {
      totalStars,
      totalForks,
      topLanguages,
      totalGists: gists.length,
      socialAccounts,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      totalStars: 0,
      totalForks: 0,
      topLanguages: [],
      totalGists: 0,
      socialAccounts: [],
    };
  }
}

export async function fetchContributionCalendar(userName: string) {
  try {
    const octokit = createOctokit();
    const query = `
      query($userName: String!) {
        user(login: $userName) {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            weeks: {
              contributionDays: {
                contributionCount: number;
                date: string;
              }[];
            }[];
          };
        };
      };
    } = await octokit.graphql(query, {
      userName,
    });

    return response.user?.contributionsCollection?.contributionCalendar ?? null;
  } catch (error) {
    console.error("Error fetching contribution calendar:", error);
    return null;
  }
}
