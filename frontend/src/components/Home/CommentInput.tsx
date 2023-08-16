import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { RootState } from '@store/index';
import { authHttp } from '@utils/http';
import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Mention, MentionsInput, OnChangeHandlerFunc } from 'react-mentions';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

const MentionInputStyle = {
	outline: 'none',

	suggestions: {
		bottom: '50px',
		top: 'auto',
		list: {
			display: 'flex',
			flexDirection: 'column',
			gap: '6px',
			background: 'white',
			border: '1px solid rgba(0, 0, 0, 0.15)',
			maxHeight: '75vh',
			overflow: 'scroll',
		},
	},
};

const CommentInputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 56px;
	padding: 0 12px;
`;

const StyledProfile = styled.img`
	width: 28px;
	height: 28px;
	margin-right: 20px;
	border-radius: 50%;
`;

const StyledInputContainer = styled.div`
	display: flex;
	position: relative;
	flex: 1;
`;

const StyledInput = styled(MentionsInput)`
	font-size: 16px;
	font-weight: 500;
	flex: 1;
	margin-right: 12px;
	white-space: pre-wrap;
	padding-top: 6px;

	textarea {
		outline: none;
	}
`;

const StyledSubmitButton = styled.button`
	border: none;
	color: ${colors.primary.primary};
	background-color: white;
	cursor: pointer;
	img {
		width: 24px;
		height: 24px;
	}
`;

const StyledMentionContainer = styled.div`
	display: flex;
	align-items: center;
	display: flex;
	align-items: center;
	padding: 5px 15px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);

	&:focus {
		background-color: #cee4e5;
	}

	span {
		font-size: 14px;
		font-weight: 700;
	}
`;

const StyledMentionImage = styled.img`
	height: 32px;
	width: 32px;
	margin-right: 12px;
	border-radius: 50%;
`;

type Props = {
	input: string;
	onHandleComment: OnChangeHandlerFunc;
	onClickSubbmit: () => Promise<void>;
};

type UserSimpleType = {
	avater_url: string;
	id: string;
};

const CommentInput = ({ input, onHandleComment, onClickSubbmit }: Props) => {
	const user = useSelector((state: RootState) => state.user.user);
	const [followingList, setFollowingList] = useState<UserSimpleType[]>([]);

	const getFollersData = useCallback(() => {
		authHttp
			.get<UserSimpleType[]>(`relations/followings/${user?.githubId}`)
			.then((res) => {
				console.log(res);
				setFollowingList(res);
			});
	}, [authHttp]);

	useEffect(() => {
		getFollersData();
	}, []);

	useEffect(() => {
		console.log('[내 팔로우 목록]', followingList);
	}, [followingList]);

	return (
		<CommentInputContainer>
			<StyledProfile src={user?.avatarUrl} alt="profile" />
			<StyledInputContainer>
				<StyledInput
					placeholder="댓글을 입력해주세요."
					maxLength={50}
					value={input}
					onChange={onHandleComment}
					style={MentionInputStyle}
				>
					<Mention
						trigger="@"
						markup="@__display__ "
						displayTransform={(username, id) => `@${id} `}
						data={followingList.map((v, index) => ({
							id: index,
							display: v.id,
						}))}
						renderSuggestion={(suggestion) => (
							<StyledMentionContainer>
								<StyledMentionImage
									src={followingList[suggestion.id as number].avater_url}
									alt=""
								/>
								<span>{suggestion.display}</span>
							</StyledMentionContainer>
						)}
					/>
				</StyledInput>
				<StyledSubmitButton>
					<img src={images.send} alt="send" onClick={onClickSubbmit} />
				</StyledSubmitButton>
			</StyledInputContainer>
		</CommentInputContainer>
	);
};

export default CommentInput;
