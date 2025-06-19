import { ImageResponse } from "@vercel/og";
import { type NextRequest } from "next/server";
import { Octokit } from "octokit";
import { env } from "@/env";
import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export const runtime = "edge";

function createOctokit() {
  return new Octokit({
    auth: env.GITHUB_TOKEN,
  });
}

async function fetchGitHubUser(
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

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userName: string }> },
) {
  const { userName } = await params;
  const gitHubUser = await fetchGitHubUser(userName);
  if (!gitHubUser) {
    return new Response("User not found", { status: 404 });
  }

  const userData = {
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
  };

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        >
          {JSON.stringify(userData)}
        </div>
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
