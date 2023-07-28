// 디코딩 함수
export const decodeUnicode = (str: string) => {
	return decodeURIComponent(
		atob(str)
			.split('')
			.map((c) => {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join(''),
	);
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
