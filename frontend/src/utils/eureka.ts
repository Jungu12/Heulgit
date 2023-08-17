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

// 랜덤으로 색상을 출력하는 함수
export function getColorFromName(name: string) {
	const availableColors = [
		'#1A1A1A',
		'#353535',
		'#626262',
		'#989898',
		'#1D2431',
		'#386183',
		'#4177A2',
		'#4785B5',
		'#59AFEE',
		'#65CCFF',
		'#1D2B31',
		'#2C4235',
		'#3B5B39',
		'#599C42',
		'#77CC4B',
		'#95FF55',
		'#1D3131',
		'#2C4848',
		'#3B605F',
		'#4A7877',
		'#599E95',
		'#68B5B3',
		'#77CCD0',
		'#111111',
		'#FF0000',
		'#FF4C4C',
		'#FF7F7F',
		'#FF9999',
		'#800080',
		'#9932CC',
		'#A020F0',
		'#BA55D3',
		'#DA70D6',
		'#DDA0DD',
	];

	const shortName = name.substring(0, 3);
	const index = shortName
		.split('')
		.reduce((sum, char) => sum + char.charCodeAt(0), 0);
	const colorIndex = index % availableColors.length;
	return availableColors[colorIndex];
}
