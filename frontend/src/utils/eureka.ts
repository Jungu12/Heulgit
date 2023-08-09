export function isGitHubIssuesOrPullUrl(url: string) {
	const pattern = /github\.com.*(issues|pull)/;
	return pattern.test(url);
}

// 파일을 Data URL로 읽는 함수
export async function readFileAsDataURL(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			if (event.target && event.target.result) {
				resolve(event.target.result as string);
			} else {
				reject(new Error('Failed to read file as Data URL.'));
			}
		};
		reader.readAsDataURL(file);
	});
}
