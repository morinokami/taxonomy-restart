import { createServerFn } from "@tanstack/react-start";

export const getGithubStars = createServerFn().handler(async () => {
	try {
		const response = await fetch(
			"https://api.github.com/repos/morinokami/taxonomy-restart",
			{
				headers: {
					Accept: "application/vnd.github+json",
					Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
					"X-GitHub-Api-Version": "2022-11-28",
				},
			},
		);

		if (!response?.ok) {
			return null;
		}

		const json = await response.json();

		return parseInt(json.stargazers_count, 10).toLocaleString();
	} catch (_) {
		return null;
	}
});
