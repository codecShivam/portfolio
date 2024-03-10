"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { repositories } from "@/constants/repoDetails";

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

const MyComponent: React.FC = () => {
  const [pullRequests, setPullRequests] = useState<PullRequestData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Token:", token);

      if (!token) {
        setError("Missing GitHub access token");
        return;
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

        setPullRequests(allPullRequests);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("API Error:", error.response?.data);
          setError("Failed to fetch pull requests");
        } else {
          console.error("Unexpected Error:", error);
          setError("An unexpected error occurred");
        }
      }
    };

    fetchData();
  }, []);

  console.log("Pull Requests:", pullRequests);
  error && console.error("Error:", error);
  return null;
};

export default MyComponent;
