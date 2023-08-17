// 자유게시판 피드 리스트 모바일 버전

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import {
	FreeBoarFeedResponseType,
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
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult,
} from '@tanstack/react-query';

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
	freeboardFeedList: InfiniteData<FreeBoarFeedResponseType>;
	freeboardFetchNextPage: (
		options?: FetchNextPageOptions | undefined,
	) => Promise<InfiniteQueryObserverResult<FreeBoardPostType[], unknown>>;
	freeboardHasNextPage: boolean;
};

const FreeBoardFeedItemListMobile = ({
	freeboardFeedList,
	freeboardFetchNextPage,
	freeboardHasNextPage,
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
			console.error(error);
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
		mentionList,
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
			{freeboardFeedList && (
				<InfiniteScroll
					dataLength={freeboardFeedList.pages.length}
					next={freeboardFetchNextPage}
					hasMore={freeboardHasNextPage}
					loader={<div>로딩중...</div>}
					height={`calc(100vh - 234px)`}
				>
					{freeboardFeedList.pages.map((feed) =>
						feed.content.map((item) => (
							<div key={item.freeBoardId}>
								<FreeBoardFeedItem
									feed={item}
									onClickComment={onClickComment}
								/>
								<Separation />
							</div>
						)),
					)}
				</InfiniteScroll>
			)}
			{
				<CBottomSheet
					open={isCommentOpen}
					onDismiss={() => {
						setIsCommentOpen(false);
					}}
					onHandleComment={onHandleComment}
					onClickSubbmit={() => onClickSubbmit()}
					input={commentInput}
				>
					<FreeBoardCommentList
						commentList={commentList}
						onClickDelete={onClickDelete}
					/>
				</CBottomSheet>
			}
		</StyledFeedListSection>
	);
};

export default FreeBoardFeedItemListMobile;
