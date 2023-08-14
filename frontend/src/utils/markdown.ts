// 디코딩 함수
export const decodeUnicode = (str: string) => {
	try {
		const decodedBase64 = atob(str);
		const decodedUnicode = decodedBase64
			.split('')
			.map((c) => {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('');

		const result = decodeURIComponent(decodedUnicode);
		// result = result.replace('api', 'app');
		// result = result.replace('branch=master', 'branch=main');

		console.log('[변환된 코드]', result);

		return result;
	} catch (error) {
		console.error('Error decoding Unicode:', error);
		return '';
	}
};

export const getImgTag = (text: string) => {
	// 이미지 정보를 담을 배열
	const imageInfoArray = [];

	// 두 정규식을 OR(|) 연산자로 합친 정규식을 사용하여 값 추출
	const regex =
		/(\[image\]\((.*?)\))|(<img[^>]*src\s*=\s*["']?([^>"']+)["']?[^>]*>)/g;
	let match;

	while ((match = regex.exec(text)) !== null) {
		const value = match[2] || match[4]; // 첫 번째 그룹 또는 두 번째 그룹 사용
		imageInfoArray.push(value);
	}

	return imageInfoArray;
};

export function sliceTextToParagraph(text: string, maxLength: number) {
	const paragraphs = text.split('\n\n'); // 문단 단위로 분리

	let summary = '';
	for (const paragraph of paragraphs) {
		if (summary.length + paragraph.length + 2 <= maxLength) {
			// +2는 빈 줄 고려
			summary += paragraph + '\n\n';
		} else {
			break;
		}
	}

	return summary;
}
