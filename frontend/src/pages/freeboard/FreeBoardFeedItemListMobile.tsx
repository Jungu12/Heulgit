// 자유게시판 피드 리스트 모바일 버전

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import {
	FreeBoardCommentType,
	FreeBoardCommentWriteType,
	FreeBoardPostType,
} from '@typedef/community/freeboard.types';
import FreeBoardFeedItem from './FreeBoardFeedItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { authHttp } from '@utils/http';
import CBottomSheet from '@components/common/CBottomSheet';
import FreeBoardCommentList from '@components/community/FreeBoardCommentList';
import { OnChangeHandlerFunc } from 'react-mentions';

const StyledFeedListSection = styled.section`
	overflow-y: scroll;

	height: calc(100vh - 234px);
	margin-bottom: 70px;

	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Separation = styled.div`
	height: 1px;
	width: 100%;
	background-color: ${colors.greyScale.grey2};
	margin-top: 12px;
`;

type Props = {
	feedList: FreeBoardPostType[];
	freeBoardHasMore: boolean;
	freeboardNextPageLoad: () => Promise<void>;
};

const FreeBoardFeedItemListMobile = ({
	feedList,
	freeBoardHasMore,
	freeboardNextPageLoad,
}: Props) => {
	const scrollContinaerRef = useRef<HTMLDivElement>(null);

	const [isCommentOpen, setIsCommentOpen] = useState(false); // 댓글 바텀시트 열기
	const [seletedComment, setSeletedComment] = useState(-1); // 댓글 선택
	const [commentInput, setCommentInput] = useState(''); // 댓글 입력
	const [commentList, setCommentList] = useState<FreeBoardCommentType[]>([]); // 댓글 리스트
	const [mentionList, setMentionList] = useState<string[]>([]);

	// 댓글 모달 나오게 할 거
	const onClickComment = useCallback(
		(id: number) => {
			console.log('댓글 클릭');
			setSeletedComment(id);
			setIsCommentOpen(true);
		},
		[setIsCommentOpen],
	);

	// 댓글 입력 함수
	const onHandleComment: OnChangeHandlerFunc = useCallback(
		(event, newValue, newPlainTextValue, mentions) => {
			setCommentInput(newPlainTextValue);
			setMentionList(
				mentions.map((mention) => mention.display.replace(/@|\s/g, '')),
			);
		},
		[],
	);

	//
	const loadCommentList = useCallback(async () => {
		try {
			const res = await authHttp.get<FreeBoardCommentType[]>(
				`f-comments/${seletedComment}`,
			);
			setCommentList(res);
		} catch (error) {
			console.log(error);
		}
	}, [setCommentList, authHttp, seletedComment]);

	const onClickSubbmit = useCallback(async () => {
		if (commentInput.trim() === '') return;

		try {
			await authHttp.post<FreeBoardCommentWriteType>('f-comments/comments', {
				content: commentInput,
				freeBoardId: seletedComment,
				mentionedFollowers: mentionList,
				parentId: null,
			});
			setCommentInput('');
			loadCommentList();
		} catch (err) {
			console.error(err);
		}
	}, [
		authHttp,
		commentInput,
		seletedComment,
		setCommentInput,
		loadCommentList,
	]);

	const onClickDelete = useCallback(
		(commentId: number) => {
			if (confirm('정말 삭제하시겠습니까?')) {
				authHttp.delete(`f-comments/${commentId}`).then(() => {
					loadCommentList();
				});
			}
		},
		[authHttp, loadCommentList],
	);

	useEffect(() => {
		if (seletedComment >= 0) {
			loadCommentList();
		}
	}, [seletedComment]);

	return (
		<StyledFeedListSection ref={scrollContinaerRef}>
			<InfiniteScroll
				dataLength={feedList.length}
				next={freeboardNextPageLoad}
				hasMore={freeBoardHasMore}
				loader={<div>로딩 중...</div>}
				height={`calc(100vh - 234px)`}
			>
				{feedList.map((feed, index) => (
					<div key={index}>
						<FreeBoardFeedItem feed={feed} onClickComment={onClickComment} />
						<Separation />
					</div>
				))}
			</InfiniteScroll>
			{
				<CBottomSheet
					open={isCommentOpen}
					onDismiss={() => {
						console.log('바텀 시트 클릭');
						setIsCommentOpen(false);
					}}
					onHandleComment={onHandleComment}
					onClickSubbmit={() => onClickSubbmit()}
					input={commentInput}
				>
					<FreeBoardCommentList
						commentList={commentList}
						onClickDelete={onClickDelete}
						// onClickCommentMenuOpen={onClickCommentMenuOpen}
					/>
				</CBottomSheet>
			}
		</StyledFeedListSection>
	);
};

export default FreeBoardFeedItemListMobile;
