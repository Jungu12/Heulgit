import { FreeBoarFeedResponseType } from '@typedef/community/freeboard.types';
import { authHttp } from '@utils/http';

/**
 * 유레카 피드 리스트 불러오기
 * @param 정렬 조건, 불러올 페이지
 * @returns 피드 리스트
 */
export const getFreeBoardFeedList = async (sort: string, page: number) => {
	const sortType = new Map([
		['전체 보기', 'all'],
		['좋아요 많은 순', 'likes'],
		['댓글 많은 순', 'comments'],
		['조회 순', 'views'],
	]);

	try {
		const response = await authHttp.get<FreeBoarFeedResponseType>(
			`freeboard/posts?sort=${sortType.get(sort)}&pages=${page}`,
		);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * 유저 등록
 * @param id
 * @param name
 */
// export const postUser = async (id: number, name: string) => {
// 	return customedAxios.post(`/user`, { id: id, name: name });
// };
