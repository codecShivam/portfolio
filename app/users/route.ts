import { NextResponse } from "next/server";
import { repositories } from "@/constants/repoDetails";
import axios from "axios";

const token = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

interface PullRequestData {
  number: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
  merged_at?: string;
  error?: string;
}

export async function GET() {
  if (!token) {
    return NextResponse.json({ error: "Missing GitHub access token" });
  }

  try {
    const allPullRequests: PullRequestData[] = [];

    for (const { owner, repo } of repositories) {
      let hasNextPage = true;
      let page = 1;

      while (hasNextPage) {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&page=${page}&per_page=100`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );

        allPullRequests.push(
          ...response.data.filter(
            (pr: PullRequestData) =>
              pr.merged_at !== null && pr.user.login === "codecShivam"
          )
        );

        page++;
        hasNextPage = response.headers.link?.includes('rel="next"');
      }
    }

    return NextResponse.json({ pullRequests: allPullRequests });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: "Failed to fetch pull requests" });
    } else {
      console.error("Unexpected API Error:", error);
      return NextResponse.json({ error: "An unexpected error occurred" });
    }
  }
}
