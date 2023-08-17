import { colors } from '@constants/colors';
import { UnionNotificationType } from '@typedef/notification/notification.types';
import { getTimeAgo } from '@utils/date';
import { authHttp } from '@utils/http';
import React, { useCallback, useEffect } from 'react';
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
`;

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
	font-weight: 500;
	font-size: 14px;
	border-radius: 8px;
	cursor: pointer;
	background-color: ${(props) =>
		props.$following ? colors.primary.primary : colors.greyScale.grey3};
	color: ${(props) => (props.$following ? 'white' : 'black')};
	margin-left: auto;
	margin-right: 12px;
`;

type Props = {
	notificationList: UnionNotificationType[];
	loadNotification: () => void;
};

const NotiFollow = ({ notificationList, loadNotification }: Props) => {
	const navigation = useNavigate();

	const onClickFollowButton = useCallback(
		(isFollow: boolean, sender: string) => {
			if (isFollow) {
				authHttp
					.delete(`relations/unfollow?to=${sender}`)
					.then(() => loadNotification());
			}
			if (!isFollow) {
				authHttp
					.post(`relations/follow?to=${sender}`)
					.then(() => loadNotification());
			}
		},
		[],
	);

	const onClickNotification = useCallback((link: string) => {
		const notiType = link.split('/posts/');
		const boardType = notiType[0].slice(1);
		const postId = notiType[1].trim();
		if (boardType === 'heulgit') {
			navigation(`/repo/${Number(postId)}`);
		}
		if (boardType === 'freeboard') {
			navigation(`/community/free/${Number(postId)}`);
		} else {
			navigation(`/community/${boardType}/${Number(postId)}`);
		}
	}, []);

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
									onClick={() => onClickNotification(noti.relatedLink)}
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
									onClick={() => onClickNotification(noti.relatedLink)}
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
									onClick={() => onClickNotification(noti.relatedLink)}
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
