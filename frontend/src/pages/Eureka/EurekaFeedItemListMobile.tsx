// 유레카 피드 리스트 모바일 버전
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import {
	EurekaCommentType,
	EurekaCommentWriteType,
	EurekaPostType,
} from '@typedef/community/eureka.types';
import EurekaFeedItem from './EurekaFeedItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import CBottomSheet from '@components/common/CBottomSheet';
import EurekaCommentList from '@components/community/EurekaCommentList';
import { authHttp } from '@utils/http';
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
	feedList: EurekaPostType[];
	eurekaHasMore: boolean;
	eurekaNextPageLoad: () => Promise<void>;
};

const EurekaFeedItemListMobile = ({
	feedList,
	eurekaHasMore,
	eurekaNextPageLoad,
}: Props) => {
	const scrollContinaerRef = useRef<HTMLDivElement>(null);
	const [isCommentOpen, setIsCommentOpen] = useState(false);
	const [seletedComment, setSeletedComment] = useState(-1);
	const [commentInput, setCommentInput] = useState('');
	const [commentList, setCommentList] = useState<EurekaCommentType[]>([]);
	const [mentionList, setMentionList] = useState<string[]>([]);
	// const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);

	// 댓글 모달 나오게 할 거
	const onClickComment = useCallback(
		(id: number) => {
			console.log('댓글 클릭');
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
			console.log(`${newValue} ${newPlainTextValue} ${mentions}`);
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
			console.log(error);
		}
	}, [setCommentList, authHttp, seletedComment]);

	const onClickSubbmit = useCallback(async () => {
		if (commentInput.trim() === '') return;

		try {
			await authHttp.post<EurekaCommentWriteType>('e-comments/comments', {
				content: commentInput,
				eurekaId: seletedComment,
				mentioedFollowers: mentionList,
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

	const onClickDelete = useCallback((commentId: number) => {
		console.log('삭제될 댓글', commentId);
	}, []);

	// const onClickCommentMenuOpen = useCallback(() => {
	// 	setIsCommentMenuOpen(true);
	// }, []);

	// const onClickCommentMenuClose = useCallback(() => {
	// 	setIsCommentMenuOpen(false);
	// 	console.log('메뉴 닫기');
	// }, []);

	useEffect(() => {
		if (seletedComment >= 0) {
			loadCommentList();
		}
	}, [seletedComment]);

	return (
		<StyledFeedListSection ref={scrollContinaerRef}>
			<InfiniteScroll
				dataLength={feedList.length}
				next={eurekaNextPageLoad}
				hasMore={eurekaHasMore}
				loader={<div>로딩중...</div>}
				height={`calc(100vh - 234px)`}
			>
				{feedList.map((feed, index) => (
					<div key={index}>
						<EurekaFeedItem feed={feed} onClickComment={onClickComment} />
						<Separation />
					</div>
				))}
			</InfiniteScroll>
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
						// onClickCommentMenuOpen={onClickCommentMenuOpen}
					/>
				</CBottomSheet>
			}
			{/* <ReactModal
				isOpen={isCommentMenuOpen}
				// onRequestClose={onClickCommentMenuClose}
				onRequestClose={() => console.log('dsdsd')}
				style={customStyles}
			>
				<StyledMenuContainer onClick={() => console.log('클릭됨')}>
					<StyledMenuItem
						style={{ color: 'red' }}
						onClick={() => console.log('삭제')}
					>
						삭제
					</StyledMenuItem>
					<StyledUnderline />
					<StyledMenuItem onClick={onClickCommentMenuClose}>
						닫기
					</StyledMenuItem>
				</StyledMenuContainer>
			</ReactModal> */}
		</StyledFeedListSection>
	);
};

export default EurekaFeedItemListMobile;
