// 유레카 게시물 리스트 보여지는 페이지

import Header from '@components/common/Header';
import EurekaPostCommentList from '@components/community/EurekaPostCommentList';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
// import Sidebar from '@components/common/Sidebar';
// import TabletNavigation from '@components/common/TabletNavigation';
import { useNavigate, useParams } from 'react-router-dom';
import {
	EurekaCommentWriteType,
	EurekaPostResponseType,
} from '@typedef/community/eureka.types';
import { authHttp } from '@utils/http';
// import { images } from '@constants/images';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import EurekaPostViewFeedMobile from './EurekaPostViewFeedMobile';
import CommentInput from '@pages/community/CommentInput';
// import CommunitySideBarContent from '@pages/community/CommunitySideBarContent';
// import CommunityMenuBarPC from '@pages/community/CommunityMenuBarPC';
// import CommunityFilterPC from '@pages/community/CommunityFilterPC';
import ReactModal from 'react-modal';
import { colors } from '@constants/colors';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.3)', // 오버레이 배경색을 투명하게 설정
		zIndex: '100',
	},
	content: {
		top: 'auto',
		left: '50%',
		width: '100%',
		right: 'auto',
		bottom: '-40px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '100',
		display: 'flex',
		border: 'none',
		background: 'none',
		padding: '0 12px',
	},
};

// 커뮤니티 모바일 버전
const CommunityContainerMobile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	height: 100vh;

	overflow-y: scroll;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;
// 모바일 끝

// 유레카 상세페이지 테블릿 버전
// const StyledEurekaPostViewTablet = styled.div`
// 	display: flex;

// 	justify-content: center;
// `;

// 커뮤니티 테블릿 버전
// const CommunityContainerTablet = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	/* align-items: center; */

// 	max-width: 640px;
// 	margin-left: 125px;
// 	height: 100vh;

// 	overflow-y: scroll;
// 	scrollbar-width: none; /* 파이어폭스 */
// 	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
// 	&::-webkit-scrollbar {
// 		display: none;
// 	}
// `;

// const StyledFilterButton = styled.button`
// 	position: fixed;
// 	top: 32px;
// 	right: 30px;
// 	cursor: pointer;
// 	background: none;

// 	img {
// 		width: 44px;
// 		height: 44px;
// 	}
// `;
// 테블릿 끝

// 유레카 상세페이지 PC버전
// const StyledEurekaPostViewPC = styled.div`
// 	display: flex;

// 	justify-content: space-between;
// `;

// // 커뮤니티 PC 버전
// const CommunityContainerPC = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	/* align-items: center; */

// 	width: 520px;
// 	height: 100vh;

// 	overflow-y: scroll;
// 	scrollbar-width: none; /* 파이어폭스 */
// 	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
// 	&::-webkit-scrollbar {
// 		display: none;
// 	}
// `;

const StyledMenuItem = styled.div`
	height: 60px;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	font-weight: 400;
	font-size: 18px;
	cursor: pointer;
`;

const StyledMenuContainer = styled.div`
	margin-top: auto;
	/* padding: 12px 20px; */
	width: 100%;
	background-color: white;
	border-radius: 16px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const StyledUnderline = styled.div`
	width: 100%;
	border: 1px solid ${colors.greyScale.grey3};

	/* margin-bottom: 12px; */
`;

const EurekaPostViewPage = () => {
	const navigation = useNavigate();
	const { id } = useParams();
	const userId = useSelector((state: RootState) => state.user.user?.githubId);
	const [feed, setFeed] = useState<EurekaPostResponseType>();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// 좋아요 버튼 state
	const [liked, setLiked] = useState(false);
	const [likeNum, setLikeNum] = useState(0);
	// const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [input, setInput] = useState('');
	const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
	const [seletedComment, setseletedComment] = useState(-1);

	// 좋아요 클릭시 변환 이벤트
	const handleLikeClick = () => {
		if (feed) {
			if (liked) {
				authHttp
					.get(`eureka/posts/unlike/${feed.eurekaId}?userId=${userId}`)
					.then(() => {
						setLiked((prev) => !prev);
						setLikeNum((prev) => prev - 1);
					});
			} else {
				authHttp
					.get(`eureka/posts/like/${feed.eurekaId}?userId=${userId}`)
					.then(() => {
						setLiked((prev) => !prev);
						setLikeNum((prev) => prev + 1);
					});
			}
		}
	};

	// 좋아요 누른 사람 목록 보기
	const onClickLike = useCallback(() => {
		navigation('like');
	}, [navigation]);

	const onClickUserProfile = useCallback(() => {
		if (feed) {
			navigation(`/profiles/${feed.user.githubId}`);
		}
	}, [feed]);

	const loadPost = useCallback(() => {
		authHttp.get<EurekaPostResponseType>(`eureka/posts/${id}`).then((res) => {
			setFeed(res);
		});
	}, []);

	// const onClickFilter = useCallback(() => {
	// 	setIsFilterOpen(true);
	// }, []);

	// const onClickClose = useCallback(() => {
	// 	setIsFilterOpen(false);
	// }, []);

	const onClickMenu = useCallback(() => {
		setIsMenuOpen(true);
	}, []);

	const onClickMenuClose = useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	const onClickEdit = useCallback(() => {
		navigation(`/community/eureka/${id}/edit`);
	}, []);

	const onClickDelete = useCallback(() => {
		if (confirm('정말 삭제하시겠습니까?')) {
			authHttp.delete(`eureka/posts/${id}`).then(() => {
				navigation('/community/eureka');
			});
		}
	}, [id, authHttp]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const onSubmitComment = useCallback(async () => {
		if (input.trim() === '') return;

		try {
			await authHttp.post<EurekaCommentWriteType>('e-comments/comments', {
				content: input,
				eurekaId: feed?.eurekaId,
				mentionedFollowers: [],
				parentId: null,
			});
			setInput('');
			loadPost();
		} catch (err) {
			console.error(err);
		}
	}, [authHttp, input, feed]);

	const onClickCommentMenuOpen = useCallback((commentId: number) => {
		setIsCommentMenuOpen(true);
		setseletedComment(commentId);
	}, []);

	const onClickCommentMenuClose = useCallback(
		() => setIsCommentMenuOpen(false),
		[],
	);

	const onClickCommentDelete = useCallback(() => {
		if (confirm('정말 삭제하시겠습니까?')) {
			authHttp.delete(`e-comments/${seletedComment}`).then(() => {
				alert('댓글이 삭제됬습니다.');
				setIsCommentMenuOpen(false);
				loadPost();
			});
		}
	}, [authHttp, seletedComment]);

	useEffect(() => {
		loadPost();
	}, []);

	// 좋아요 한 목록에 내가 있나 확인
	useEffect(() => {
		if (feed) {
			const found = feed.likedUsers.find((user) => user.githubId === userId);
			if (found) {
				setLiked(true);
			} else {
				setLiked(false);
			}
			setLikeNum(feed.likedUsers.length);
		}
	}, [feed]);

	return (
		<CommunityContainerMobile>
			<Header title="상세 페이지"></Header>
			<EurekaPostViewFeedMobile
				feed={feed ?? null}
				userId={userId!}
				liked={liked}
				likeNum={likeNum}
				handleLikeClick={handleLikeClick}
				onClickLike={onClickLike}
				onClickUserProfile={onClickUserProfile}
				isMenuOpen={isMenuOpen}
				onClickMenu={onClickMenu}
				onClickDelete={onClickDelete}
				onClickMenuClose={onClickMenuClose}
				onClickEdit={onClickEdit}
			/>
			<EurekaPostCommentList
				comments={feed?.eurekaComments ?? []}
				onClickCommentMenuOpen={onClickCommentMenuOpen}
			/>
			<CommentInput
				input={input}
				onSubmitComment={onSubmitComment}
				handleInputChange={handleInputChange}
			/>
			<ReactModal
				isOpen={isCommentMenuOpen}
				onRequestClose={onClickCommentMenuClose}
				style={customStyles}
			>
				<StyledMenuContainer>
					<StyledMenuItem
						style={{ color: 'red' }}
						onClick={onClickCommentDelete}
					>
						삭제
					</StyledMenuItem>
					<StyledUnderline />
					<StyledMenuItem onClick={onClickCommentMenuClose}>
						닫기
					</StyledMenuItem>
				</StyledMenuContainer>
			</ReactModal>
		</CommunityContainerMobile>
	);
};

export default EurekaPostViewPage;
