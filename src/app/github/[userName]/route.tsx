/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import {
  fetchGitHubUser,
  fetchUserStatsLight,
  fetchUserFollowing,
  fetchContributionCalendar,
} from "@/lib/github";
import { Flex } from "./_components";

export const runtime = "edge";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(css);

  if (resource?.[1]) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userName: string }> },
) {
  const { userName } = await params;
  const gitHubUser = await fetchGitHubUser(userName);
  if (!gitHubUser) {
    return new Response("User not found", { status: 404 });
  }

  const [userStats, following, contributionCalendar] = await Promise.all([
    fetchUserStatsLight(userName),
    fetchUserFollowing(userName),
    fetchContributionCalendar(userName),
  ]);

  const userData = {
    name: gitHubUser.name ?? gitHubUser.login,
    username: gitHubUser.login,
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
    totalGists: userStats.totalGists,
    socialAccounts: userStats.socialAccounts,
    createdAt: gitHubUser.created_at,
  };

  try {
    const socialAccountsText =
      userData.socialAccounts
        ?.map((account: { provider: string; url: string }) => `${account.provider}:${account.url}`)
        .join("") ?? "";
    const allText = `${userData.name}${userData.username}${userData.company ?? ""}${userData.location ?? ""}${userData.email ?? ""}${userData.website ?? ""}${userData.followers}${userData.following}repositories${userData.publicRepos}stars${userData.totalStars}forks${userData.totalForks}gists${userData.totalGists}${socialAccountsText}GitHub since ${userData.createdAt ? new Date(userData.createdAt).getFullYear() : "unknown"}followers following`;

    return new ImageResponse(
      (
        <div
          style={{
            fontFamily: "Fira Code",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "64px",
            position: "relative",
            backgroundColor: "#111827",
          }}
        >
          {/* Background GitHub-style contribution grid */}
          <Flex tw="absolute inset-0 flex-row justify-center items-start">
            <Flex tw="flex-row">
              {contributionCalendar?.weeks?.slice(-52).map(
                (
                  week: {
                    contributionDays: {
                      contributionCount: number;
                      date: string;
                    }[];
                  },
                  weekIndex: number,
                ) => (
                  <Flex key={weekIndex} tw="flex-col">
                    {week.contributionDays?.map(
                      (
                        day: { contributionCount: number; date: string },
                        dayIndex: number,
                      ) => {
                        const count = day.contributionCount ?? 0;
                        let bgColor = "bg-gray-800";
                        if (count > 10) bgColor = "bg-green-500";
                        else if (count > 5) bgColor = "bg-green-600";
                        else if (count > 2) bgColor = "bg-green-700";
                        else if (count > 0) bgColor = "bg-green-800";

                        return (
                          <Flex
                            key={`${weekIndex}-${dayIndex}`}
                            tw={`w-2 h-2 m-1 rounded-sm ${bgColor}`}
                          />
                        );
                      },
                    )}
                  </Flex>
                ),
              ) ??
                // Fallback to random data if contribution data is not available
                Array.from({ length: 40 }, (_, col) => (
                  <Flex key={col} tw="flex-col">
                    {Array.from({ length: 25 }, (_, row) => {
                      const intensity = Math.random();
                      let bgColor = "bg-gray-800";
                      if (intensity > 0.7) bgColor = "bg-green-500";
                      else if (intensity > 0.5) bgColor = "bg-green-600";
                      else if (intensity > 0.3) bgColor = "bg-green-700";
                      else if (intensity > 0.1) bgColor = "bg-green-800";

                      return (
                        <Flex
                          key={`${col}-${row}`}
                          tw={`w-4 h-4 m-1 rounded-sm ${bgColor}`}
                        />
                      );
                    })}
                  </Flex>
                ))}
            </Flex>
          </Flex>

          {/* Center - Avatar, Name, Username */}
          <Flex tw="flex-col items-center justify-start">
            <img
              src={userData.avatar}
              tw="w-40 h-40 rounded-full mb-8 border-2 border-gray-700 bg-white"
              alt="Avatar"
            />
            <Flex tw="text-5xl font-bold mb-3 text-gray-50">
              {userData.name}
            </Flex>
            <Flex tw="text-2xl text-gray-400">@{userData.username}</Flex>
          </Flex>

          {/* Bottom Section */}
          <Flex tw="absolute bottom-12 left-16 right-16 flex justify-between items-start">
            {/* Left Bottom - User Info */}
            <Flex tw="flex-col text-sm">
              {userData.company && (
                <Flex tw="flex items-center text-gray-400 mb-2">
                  <Flex tw="mr-2">🏢</Flex>
                  <Flex>{userData.company}</Flex>
                </Flex>
              )}
              {userData.location && (
                <Flex tw="flex items-center text-gray-400 mb-2">
                  <Flex tw="mr-2">📍</Flex>
                  <Flex>{userData.location}</Flex>
                </Flex>
              )}
              {userData.email && (
                <Flex tw="flex items-center text-gray-400 mb-2">
                  <Flex tw="mr-2">📧</Flex>
                  <Flex>{userData.email}</Flex>
                </Flex>
              )}
              {userData.website && (
                <Flex tw="flex items-center text-gray-400 mb-2">
                  <Flex tw="mr-2">🌐</Flex>
                  <Flex>{userData.website}</Flex>
                </Flex>
              )}
              <Flex tw="flex items-center text-gray-400 mb-2">
                <Flex tw="mr-2">👥</Flex>
                <Flex>
                  {userData.followers} followers · {userData.following}{" "}
                  following
                </Flex>
              </Flex>
              {userData.socialAccounts &&
                userData.socialAccounts.length > 0 &&
                userData.socialAccounts[0] && (
                  <Flex tw="flex items-center text-gray-400 mb-2">
                    <Flex tw="mr-2">🔗</Flex>
                    <Flex>
                      {userData.socialAccounts[0].provider}:{" "}
                      {userData.socialAccounts[0].url}
                    </Flex>
                  </Flex>
                )}
            </Flex>

            {/* Right Bottom - GitHub Stats */}
            <Flex tw="flex-col text-sm text-right">
              <Flex tw="flex items-center justify-end text-gray-400 mb-2">
                <Flex>📚 {userData.publicRepos} repositories</Flex>
              </Flex>
              <Flex tw="flex items-center justify-end text-gray-400 mb-2">
                <Flex>⭐ {userData.totalStars} stars</Flex>
              </Flex>
              <Flex tw="flex items-center justify-end text-gray-400 mb-2">
                <Flex>🍴 {userData.totalForks} forks</Flex>
              </Flex>
              <Flex tw="flex items-center justify-end text-gray-400 mb-2">
                <Flex>📝 {userData.totalGists} gists</Flex>
              </Flex>
              {userData.topLanguages && userData.topLanguages.length > 0 && (
                <Flex tw="flex items-center justify-end text-gray-400 mb-2">
                  <Flex>
                    💻{" "}
                    {userData.topLanguages
                      .slice(0, 3)
                      .map(([language]: [string, number]) => language)
                      .join(", ")}
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>

          {/* Footer with createdAt */}
          <Flex tw="absolute bottom-0 left-0 right-0 bg-gray-800 px-16 py-3 flex justify-center">
            <Flex tw="text-xs text-gray-400">
              GitHub since{" "}
              {userData.createdAt
                ? new Date(userData.createdAt).getFullYear()
                : "unknown"}
            </Flex>
          </Flex>
        </div>
      ),
      {
        width: 910,
        height: 550,
        fonts: [
          {
            name: "Fira Code",
            data: await loadGoogleFont(
              "Fira+Code:wght@400;500;600;700",
              allText,
            ),
            style: "normal",
          },
        ],
      },
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}
