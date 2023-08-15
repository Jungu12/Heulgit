import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { RootState } from '@store/index';
import { UserType } from '@typedef/common.types';
import { authHttp } from '@utils/http';
import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Mention, MentionsInput, OnChangeHandlerFunc } from 'react-mentions';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

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
	outline: none;
	margin-right: 12px;
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

type Props = {
	input: string;
	onHandleComment: OnChangeHandlerFunc;
	onClickSubbmit: () => Promise<void>;
};

const CommentInput = ({ input, onHandleComment, onClickSubbmit }: Props) => {
	const user = useSelector((state: RootState) => state.user.user);
	const [followingList, setFollowingList] = useState<UserType[]>([]);

	const getFollersData = useCallback(() => {
		authHttp
			.get<UserType[]>(`relations/followings?userId=${user?.githubId}`)
			.then((res) => {
				console.log(res);
				setFollowingList(res);
			});
	}, [authHttp]);

	useEffect(() => {
		getFollersData();
	}, []);

	return (
		<CommentInputContainer>
			<StyledProfile src={user?.avatarUrl} alt="profile" />
			<StyledInputContainer>
				<StyledInput
					placeholder="댓글을 입력해주세요."
					maxLength={50}
					value={input}
					onChange={onHandleComment}
				>
					<Mention
						trigger="@"
						data={followingList.map((v) => ({
							id: v.githubId,
							display: v.githubId,
						}))}
					/>
				</StyledInput>
				{/* <StyledInput
					placeholder="댓글을 입력해주세요."
					maxLength={50}
					value={input}
					onChange={(e) => onHandleComment(e)}
					// onChange={onHandleComment}
				></StyledInput> */}
				<StyledSubmitButton>
					<img src={images.send} alt="send" onClick={onClickSubbmit} />
				</StyledSubmitButton>
			</StyledInputContainer>
		</CommentInputContainer>
	);
};

export default CommentInput;
