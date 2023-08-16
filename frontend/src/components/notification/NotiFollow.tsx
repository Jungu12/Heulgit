import { colors } from '@constants/colors';
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
} from '@tanstack/react-query';
import { UnionNotificationType } from '@typedef/notification/notification.types';
import { getTimeAgo } from '@utils/date';
import { authHttp } from '@utils/http';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

// 팔로우 알림 컨테이너
const StyledFollowContainer = styled.div`
	display: flex;
	align-items: start;
	position: relative;
	flex-direction: column;
	justify-content: space-between;

	width: 100%;
	/* height: 50px; */
`;

// 프로필 이미지 + 팔로우 알림 내용 컨테이너
// const StyledContentContainer = styled.div`
// 	display: flex;
// 	align-items: center;
// 	position: relative;
// 	flex-direction: row;

// 	/* width: 100%; */
// `;

// 프로필 이미지 디브
// const StyledProfileImgDiv = styled.div`
// 	margin: 8px 15px;
// `;

// // 프로필 이미지
// const StyledProfileImg = styled.img`
// 	display: flex;
// 	align-items: center;

// 	width: 44px;
// 	height: 44px;

// 	background-color: #000000;

// 	border-radius: 50%;
// 	border: none;
// `;

// 팔로우 알림
// const StyledFollowMessage = styled.div`
// 	font-size: 14px;
// 	line-height: 130%;
// 	height: 44px;

// 	/* a {
// 		display: flex;
// 	} */
// `;

// // link 속성
// const StyledLink = styled(Link)`
// 	font-weight: 700;
// 	color: black;
// 	text-decoration-line: none;

// 	/* &:focus {

// 	} */
// `;

// 팔로우 여부 버튼 Div
// const StyledFollowButtonContainer = styled.div`
// 	display: flex;
// 	height: 44px;

// 	margin-right: 15px;
// `;

// 팔로우 여부 버튼
// const StyledFollowButton = styled.button<StyledFollowButtonProps>`
// 	width: 83px;
// 	height: 28px;
// 	margin-left: 10px;

// 	font-weight: 500;
// 	font-size: 14px;

// 	border-radius: 8px;

// 	background-color: ${(props) =>
// 		props.$following ? colors.greyScale.grey3 : colors.primary.primary};
// 	color: ${(props) => (props.$following ? 'black' : 'white')};
// `;

// notifications
// 	.filter((notification) => notification.type === 'follow')
// 	.map((noti) => {
// 		return noti.message;
// 	});

// notifications
// 	.filter((notification) => notification.type === 'like')
// 	.map((noti) => {
// 		noti.message += ': @ksgeun ㅋㅋㅋ 집가고 싶다';
// 	});

// notifications
// 	.filter((notification) => notification.type === 'mention')
// 	.map((noti) => {
// 		noti.message += ': @ksgeun ㅋㅋㅋ 집가고 싶다';
// 	});

// notifications
// 	.filter((notification) => notification.type === 'comment')
// 	.map((noti) => {
// 		noti.message += ': ㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁ';
// 	});

// 팔로우 팔로잉 여부 판별
type StyledFollowButtonProps = {
	$following?: boolean;
};

const StyledNotificationItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	height: 60px;
`;

const StyledProfileImage = styled.img`
	width: 44px;
	height: 44px;
	margin: 8px 15px;
	border-radius: 50%;
`;

const StyledNotificationTextBox = styled.div`
	flex: 1;
	margin-right: 12px;
	font-size: 14px;
	line-height: 1.5;
`;

const StyledSenderName = styled.span`
	font-weight: 700;
	color: black;
	cursor: pointer;
`;

const StyledNotificationDate = styled.span`
	font-weight: 400;
	color: ${colors.greyScale.grey4};
	margin-left: 4px;
`;

const StyledNoficationContent = styled.span`
	font-weight: 500;
	color: black;
	cursor: pointer;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const StyledFollowButton = styled.button<StyledFollowButtonProps>`
	width: 83px;
	height: 28px;
	margin-left: 10px;
	font-weight: 500;
	font-size: 14px;
	border-radius: 8px;
	cursor: pointer;
	background-color: ${(props) =>
		props.$following ? colors.primary.primary : colors.greyScale.grey3};
	color: ${(props) => (props.$following ? 'white' : 'black')};
	margin-left: auto;
`;

type Props = {
	notificationList: UnionNotificationType[];
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
	) => Promise<QueryObserverResult<UnionNotificationType[], unknown>>;
};

const NotiFollow = ({ notificationList, refetch }: Props) => {
	const navigation = useNavigate();

	const onClickFollowButton = useCallback(
		(isFollow: boolean, sender: string) => {
			if (isFollow) {
				authHttp.delete(`relations/unfollow?to=${sender}`);
			}
			if (!isFollow) {
				authHttp.post(`relations/follow?to=${sender}`);
			}
			refetch();
		},
		[],
	);

	return (
		<StyledFollowContainer>
			{notificationList.map((noti) => {
				if (noti.type === 'LIKE') {
					return (
						<StyledNotificationItem>
							<StyledProfileImage src={noti.sender.avatarUrl} alt="profile" />
							<StyledNotificationTextBox>
								<StyledSenderName
									onClick={() =>
										navigation(`/profiles/${noti.sender.githubId}`)
									}
								>
									{noti.sender.githubId}
								</StyledSenderName>
								<StyledNoficationContent
									onClick={() => {
										const notiType = noti.relatedLink.split('/posts/');
										const boardType = notiType[0].slice(1);
										const postId = notiType[1].trim();
										console.log(postId);

										if (boardType === 'heulgit') {
											navigation(`/repo/${Number(postId)}`);
										}
										if (boardType === 'freeboard') {
											navigation(`/community/free/${Number(postId)}`);
										} else {
											navigation(`/community/${boardType}/${Number(postId)}`);
										}
									}}
								>{`님이 게시물에 좋아요를 했습니다.`}</StyledNoficationContent>
								<StyledNotificationDate>
									{getTimeAgo(noti.createdDate)}
								</StyledNotificationDate>
							</StyledNotificationTextBox>
						</StyledNotificationItem>
					);
				}
				if (noti.type === 'FOLLOW') {
					return (
						<StyledNotificationItem>
							<StyledProfileImage src={noti.sender.avatarUrl} alt="profile" />
							<StyledNotificationTextBox>
								<StyledSenderName
									onClick={() =>
										navigation(`/profiles/${noti.sender.githubId}`)
									}
								>
									{noti.sender.githubId}
								</StyledSenderName>
								<StyledNoficationContent
									style={{ cursor: 'default' }}
								>{`님이 당신을 팔로우했습니다.`}</StyledNoficationContent>
								<StyledNotificationDate>
									{getTimeAgo(noti.createdDate)}
								</StyledNotificationDate>
							</StyledNotificationTextBox>
							<StyledFollowButton
								$following={noti.follow}
								onClick={() =>
									onClickFollowButton(noti.follow, noti.sender.githubId)
								}
							>
								{noti.follow ? '팔로우' : '팔로잉'}
							</StyledFollowButton>
						</StyledNotificationItem>
					);
				}
				if (noti.type === 'COMMENT') {
					return (
						<StyledNotificationItem>
							<StyledProfileImage src={noti.sender.avatarUrl} alt="profile" />
							<StyledNotificationTextBox>
								<StyledSenderName
									onClick={() =>
										navigation(`/profiles/${noti.sender.githubId}`)
									}
								>
									{noti.sender.githubId}
								</StyledSenderName>
								<StyledNoficationContent
									onClick={() => {
										const notiType = noti.relatedLink.split('/posts/');
										const boardType = notiType[0].slice(1);
										const postId = notiType[1].trim();
										console.log(postId);
										if (boardType === 'heulgit') {
											navigation(`/repo/${Number(postId)}`);
										}
										if (boardType === 'freeboard') {
											navigation(`/community/free/${Number(postId)}`);
										} else {
											navigation(`/community/${boardType}/${Number(postId)}`);
										}
									}}
								>{`님이 게시물에 댓글을 남겼습니다: ${noti.content}`}</StyledNoficationContent>
								<StyledNotificationDate>
									{getTimeAgo(noti.createdDate)}
								</StyledNotificationDate>
							</StyledNotificationTextBox>
						</StyledNotificationItem>
					);
				}
				if (noti.type === 'MENTION') {
					return (
						<StyledNotificationItem>
							<StyledProfileImage src={noti.sender.avatarUrl} alt="profile" />
							<StyledNotificationTextBox>
								<StyledSenderName
									onClick={() =>
										navigation(`/profiles/${noti.sender.githubId}`)
									}
								>
									{noti.sender.githubId}
								</StyledSenderName>
								<StyledNoficationContent
									onClick={() => {
										const notiType = noti.relatedLink.split('/posts/');
										const boardType = notiType[0].slice(1);
										const postId = notiType[1].trim();
										console.log(postId);

										if (boardType === 'heulgit') {
											navigation(`/repo/${Number(postId)}`);
										}
										if (boardType === 'freeboard') {
											navigation(`/community/free/${Number(postId)}`);
										} else {
											navigation(`/community/${boardType}/${Number(postId)}`);
										}
									}}
								>{`님이 당신을 언급했습니다: ${noti.content}`}</StyledNoficationContent>
								<StyledNotificationDate>
									{getTimeAgo(noti.createdDate)}
								</StyledNotificationDate>
							</StyledNotificationTextBox>
						</StyledNotificationItem>
					);
				}
			})}
		</StyledFollowContainer>
	);
};

export default NotiFollow;
