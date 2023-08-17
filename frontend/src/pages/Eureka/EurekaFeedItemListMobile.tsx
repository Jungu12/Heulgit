// 유레카 피드 리스트 모바일 버전
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import {
	EurekaCommentType,
	EurekaCommentWriteType,
	EurekaFeedResponseType,
	EurekaPostType,
} from '@typedef/community/eureka.types';
import EurekaFeedItem from './EurekaFeedItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import CBottomSheet from '@components/common/CBottomSheet';
import EurekaCommentList from '@components/community/EurekaCommentList';
import { authHttp } from '@utils/http';
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
	feedList: InfiniteData<EurekaFeedResponseType>;
	eurekaHasMore: boolean;
	eurekaFetchNextPage: (
		options?: FetchNextPageOptions | undefined,
	) => Promise<InfiniteQueryObserverResult<EurekaPostType[], unknown>>;
};

const EurekaFeedItemListMobile = ({
	feedList,
	eurekaHasMore,
	eurekaFetchNextPage,
}: Props) => {
	const scrollContinaerRef = useRef<HTMLDivElement>(null);
	const [isCommentOpen, setIsCommentOpen] = useState(false);
	const [seletedComment, setSeletedComment] = useState(-1);
	const [commentInput, setCommentInput] = useState('');
	const [commentList, setCommentList] = useState<EurekaCommentType[]>([]);
	const [mentionList, setMentionList] = useState<string[]>([]);

	// 댓글 모달 나오게 할 거
	const onClickComment = useCallback(
		(id: number) => {
			setSeletedComment(id);
			setIsCommentOpen(true);
		},
		[setIsCommentOpen],
	);

	const onHandleComment: OnChangeHandlerFunc = useCallback(
		(event, newValue, newPlainTextValue, mentions) => {
			setCommentInput(newPlainTextValue);
			setMentionList(
				mentions.map((mention) => mention.display.replace(/@|\s/g, '')),
			);
		},
		[],
	);

	const loadCommentList = useCallback(async () => {
		try {
			const res = await authHttp.get<EurekaCommentType[]>(
				`e-comments/${seletedComment}`,
			);
			setCommentList(res);
		} catch (error) {
			console.error(error);
		}
	}, [setCommentList, authHttp, seletedComment]);

	const onClickSubbmit = useCallback(async () => {
		if (commentInput.trim() === '') return;

		try {
			await authHttp.post<EurekaCommentWriteType>('e-comments/comments', {
				content: commentInput,
				eurekaId: seletedComment,
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
				authHttp.delete(`e-comments/${commentId}`).then(() => {
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
			{feedList && (
				<InfiniteScroll
					dataLength={feedList.pages.length}
					next={eurekaFetchNextPage}
					hasMore={eurekaHasMore}
					loader={<div>로딩중...</div>}
					height={`calc(100vh - 234px)`}
				>
					{feedList.pages.map((feed) =>
						feed.content.map((item) => (
							<div key={item.eurekaId}>
								<EurekaFeedItem feed={item} onClickComment={onClickComment} />
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
					<EurekaCommentList
						commentList={commentList}
						onClickDelete={onClickDelete}
					/>
				</CBottomSheet>
			}
		</StyledFeedListSection>
	);
};

export default EurekaFeedItemListMobile;
