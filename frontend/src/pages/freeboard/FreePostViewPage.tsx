// 자유게시판 게시물 리스트 보여지는 페이지

import Header from '@components/common/Header';
import CommentInput from '@pages/community/CommentInput';
import { images } from '@constants/images';
import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import FreePostViewFeedMobile from '@pages/freeboard/FreePostViewFeedMobile';
import CommunityFilterPC from '@pages/community/CommunityFilterPC';
import CommunitySideBarContent from '@pages/community/CommunitySideBarContent';
import Sidebar from '@components/common/Sidebar';
import TabletNavigation from '@components/common/TabletNavigation';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { authHttp } from '@utils/http';
import { colors } from '@constants/colors';
import {
	FreeBoardCommentWriteType,
	FreeBoardPostResponseType,
} from '@typedef/community/freeboard.types';
import FreePostCommentList from '@components/community/FreePostCommentList';
import ReactModal from 'react-modal';

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

// 자유게시판 상세페이지 테블릿 버전
const StyledFreeBoardPostViewTablet = styled.div`
	display: flex;

	justify-content: center;
`;

// 커뮤니티 테블릿 버전
const CommunityContainerTablet = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */

	max-width: 640px;
	margin-left: 125px;

	overflow-y: scroll;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledFilterButton = styled.button`
	position: fixed;
	top: 32px;
	right: 30px;
	cursor: pointer;
	background: none;

	img {
		width: 44px;
		height: 44px;
	}
`;

// 테블릿 끝

// 상세페이지 PC버전

// 커뮤니티 PC 버전
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

const FreePostViewPage = () => {
	const navigation = useNavigate();
	const { id } = useParams(); // 유저 id
	const userId = useSelector((state: RootState) => state.user.user?.githubId); // 리덕스 문법..?
	const [feed, setFeed] = useState<FreeBoardPostResponseType>(); // 불러온 피드 리스트
	const [isMenuOpen, setIsMenuOpen] = useState(false); // 수정, 삭제, 닫기 메뉴 버튼

	// 좋아요 버튼 state
	const [liked, setLiked] = useState(false);
	const [likeNum, setLikeNum] = useState(0);

	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const [input, setInput] = useState('');
	const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
	const [seletedComment, setseletedComment] = useState(-1);

	// 좋아요 클릭시 변환 이벤트
	const handleLikeClick = () => {
		if (feed) {
			if (liked) {
				authHttp
					.get(`freeboard/posts/unlike/${feed.freeBoardId}?userId=${userId}`)
					.then(() => {
						setLiked((prev) => !prev);
						setLikeNum((prev) => prev - 1);
					});
			} else {
				authHttp
					.get(`freeboard/posts/like/${feed.freeBoardId}?userId=${userId}`)
					.then(() => {
						setLiked((prev) => !prev);
						setLikeNum((prev) => prev + 1);
					});
			}
		}
	};

	// 좋아요 누른 사람 목록 보기
	const onClickLike = useCallback(() => {
		navigation(`${feed?.freeBoardId}/like`);
	}, [navigation]);

	const onClickUserProfile = useCallback(() => {
		navigation(`/profiles/${1}`);
	}, []);

	// 포스트 불러오기
	const loadPost = useCallback(() => {
		authHttp
			.get<FreeBoardPostResponseType>(`freeboard/posts/${id}`)
			.then((res) => {
				setFeed(res);
			});
	}, []);

	// 필터 여는 함수
	const onClickFilter = useCallback(() => {
		setIsFilterOpen(true);
	}, []);

	// 필터 닫는 함수
	const onClickClose = useCallback(() => {
		setIsFilterOpen(false);
	}, []);

	// 메뉴버튼 여는 함수
	const onClickMenu = useCallback(() => {
		setIsMenuOpen(true);
	}, []);

	// 메뉴버튼 닫는 함수
	const onClickMenuClose = useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	// 수정 함수
	const onClickEdit = useCallback(() => {
		navigation(`/community/free/${id}/edit`);
	}, []);

	// 삭제 함수
	const onClickDelete = useCallback(() => {
		if (confirm('정말 삭제하시겠습니까?')) {
			authHttp.delete(`freeboard/posts/${id}`).then(() => {
				navigation('/community/free');
			});
		}
	}, [id, authHttp]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const onSubmitComment = useCallback(async () => {
		if (input.trim() === '') return;

		try {
			await authHttp.post<FreeBoardCommentWriteType>('f-comments/comments', {
				content: input,
				freeBoardId: feed?.freeBoardId,
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
		console.log(commentId, '선택된 메뉴 오픈');

		setIsCommentMenuOpen(true);
		setseletedComment(commentId);
	}, []);

	const onClickCommentMenuClose = useCallback(
		() => setIsCommentMenuOpen(false),
		[],
	);

	const onClickCommentDelete = useCallback(() => {
		console.log('삭제할 댓글 번호', seletedComment);

		if (confirm('정말 삭제하시겠습니까?')) {
			authHttp.delete(`f-comments/${seletedComment}`).then(() => {
				alert('댓글이 삭제됐습니다.');
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
		<>
			<Mobile>
				<CommunityContainerMobile>
					<Header title="상세 페이지"></Header>
					<FreePostViewFeedMobile
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

					<FreePostCommentList
						commentList={feed?.freeBoardComments ?? []}
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
			</Mobile>

			<Tablet>
				<StyledFreeBoardPostViewTablet>
					<TabletNavigation />
					<CommunityContainerTablet>
						{/* <FreePostViewFeedTabletPC feed={dummyPost} />
						<FreePostCommentList comments={dummyComment} /> */}
						<CommentInput />
					</CommunityContainerTablet>
					{/* 우측 필터 버튼 */}
					<StyledFilterButton onClick={onClickFilter}>
						<img src={images.filter} alt="filter" />
					</StyledFilterButton>
					<Sidebar open={isFilterOpen}>
						<CommunitySideBarContent onClickClose={onClickClose} />
					</Sidebar>
				</StyledFreeBoardPostViewTablet>
			</Tablet>

			<PC>
				{/* <StyledFreeBoardPostViewPC> */}
				{/* <CommunityContainerPC> */}
				{/* <FreePostViewFeedTabletPC feed={dummyPost} />
						<FreePostCommentList comments={dummyComment} /> */}
				<CommentInput />
				{/* </CommunityContainerPC> */}
				<CommunityFilterPC />
				{/* </StyledFreeBoardPostViewPC> */}
			</PC>
		</>
	);
};

export default FreePostViewPage;
