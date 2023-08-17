import CommentList from '@components/Home/CommentList';
import FeedItem from '@components/Home/FeedItem';
import Header from '@components/common/Header';
import Loading from '@components/common/Loading';
import { colors } from '@constants/colors';
import {
	HeulGitCommentType,
	HeulGitPostType,
	HeulgitCommentWriteType,
} from '@typedef/home/heulgit.types';
import { authHttp } from '@utils/http';
import React, { useState, useCallback, useEffect } from 'react';
import { OnChangeHandlerFunc } from 'react-mentions';
import ReactModal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

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

const FeedItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 60px;
	overflow: hidden;
	min-height: calc(100vh - 112px);
`;

const StyledViewContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Separation = styled.div`
	background-color: ${colors.greyScale.grey3};
	width: 100%;
	height: 1px;
	margin-top: 20px;
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

const StyledUnderline = styled.div`
	width: 100%;
	border: 1px solid ${colors.greyScale.grey3};

	/* margin-bottom: 12px; */
`;

const RepoViewPage = () => {
	const { repoId } = useParams();
	const navigation = useNavigate();
	const [feed, setFeed] = useState<HeulGitPostType>();
	const [commentInput, setCommentInput] = useState('');
	const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [commentList, setCommentList] = useState<HeulGitCommentType[]>([]);
	const [seletedComment, setseletedComment] = useState(-1);
	const [mentionList, setMentionList] = useState<string[]>([]);

	const loadFeed = useCallback(() => {
		authHttp.get<HeulGitPostType>(`heulgit/posts/${repoId}`).then((res) => {
			setFeed(res);
		});
	}, [repoId]);

	const loadCommentList = useCallback(async () => {
		const newCommentList = await authHttp
			.get<HeulGitCommentType[]>(`h-comments/${repoId}?pages=${page}`)
			.then((res) => {
				if (res.length === 20) setPage((prev) => prev + 1);
				return res;
			});

		setCommentList((prev) => [...prev, ...newCommentList]);
		return newCommentList;
	}, [authHttp, page, repoId]);

	const handleInputChange: OnChangeHandlerFunc = useCallback(
		(event, newValue, newPlainTextValue, mentions) => {
			setCommentInput(newPlainTextValue);
			setMentionList(
				mentions.map((mention) => mention.display.replace(/@|\s/g, '')),
			);
		},
		[],
	);

	const onClickCommentMenuClose = useCallback(
		() => setIsCommentMenuOpen(false),
		[],
	);

	const onClickCommentMenuOpen = useCallback((commentId: number) => {
		console.log(commentId, '선택된 메뉴 오픈');

		setIsCommentMenuOpen(true);
		setseletedComment(commentId);
	}, []);

	const onClickCommentDelete = useCallback(() => {
		console.log('삭제할 댓글 번호', seletedComment);

		if (confirm('정말 삭제하시겠습니까?')) {
			authHttp.delete(`h-comments/${seletedComment}`).then(() => {
				alert('댓글이 삭제됬습니다.');
				setIsCommentMenuOpen(false);
				setCommentList([]);
				loadCommentList();
			});
		}
	}, [authHttp, seletedComment]);

	const onClickSubbmit = useCallback(async () => {
		if (commentInput.trim() === '') return;

		try {
			await authHttp.post<HeulgitCommentWriteType>('h-comments/comments', {
				content: commentInput,
				heulgitId: repoId,
				mentionedFollowers: mentionList,
				parentId: null,
			});
			setCommentInput('');
			setCommentList([]);
			loadCommentList();
		} catch (err) {
			console.error(err);
		}
	}, [authHttp, commentInput, repoId, setCommentInput, loadCommentList]);

	useEffect(() => {
		console.log('[feed]', feed);

		loadFeed();
	}, []);

	if (!feed) {
		return <Loading />;
	}

	return (
		<StyledViewContainer>
			<Header
				title={feed.heulgitName}
				onClickBackButton={() => {
					navigation('/');
				}}
			/>
			<FeedItemContainer>
				<FeedItem feed={feed} type="full" />
			</FeedItemContainer>
			<Separation />
			<CommentList
				comments={commentList}
				onClickSubbmit={onClickSubbmit}
				input={commentInput}
				handleInputChange={handleInputChange}
				onClickCommentMenuOpen={onClickCommentMenuOpen}
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
		</StyledViewContainer>
	);
};

export default RepoViewPage;
