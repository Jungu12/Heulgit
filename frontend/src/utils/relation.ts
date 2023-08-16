export const findParams = (url: string) => {
	if (url.includes('eureka')) {
		return 'eureka';
	}
	if (url.includes('free')) {
		return 'freeboard';
	}
	return 'heulgit';
};
