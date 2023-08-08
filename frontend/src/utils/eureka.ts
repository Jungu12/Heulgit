export function isGitHubIssuesOrPullUrl(url: string) {
	const pattern = /github\.com.*(issues|pull)/;
	return pattern.test(url);
}
