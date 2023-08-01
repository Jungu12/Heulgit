import { colors } from '@constants/colors';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
const StyledContentContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	flex-direction: row;

	/* width: 100%; */
`;

// 프로필 이미지 디브
const StyledProfileImgDiv = styled.div`
	margin: 8px 15px;
`;

// 프로필 이미지
const StyledProfileImg = styled.img`
	display: flex;
	align-items: center;

	width: 44px;
	height: 44px;

	background-color: #000000;

	border-radius: 50%;
	border: none;
`;

// 팔로우 알림
const StyledFollowMessage = styled.div`
	font-size: 14px;
	line-height: 130%;
	height: 44px;

	/* a {
		display: flex;
	} */
`;

// link 속성
const StyledLink = styled(Link)`
	font-weight: 700;
	color: black;
	text-decoration-line: none;

	/* &:focus {

	} */
`;

// 팔로우 여부 버튼 Div
const StyledFollowButtonContainer = styled.div`
	display: flex;
	height: 44px;

	margin-right: 15px;
`;

// 팔로우 팔로잉 여부 판별
type StyledFollowButtonProps = {
	$following?: boolean;
};

// 팔로우 여부 버튼
const StyledFollowButton = styled.button<StyledFollowButtonProps>`
	width: 83px;
	height: 28px;
	margin-left: 10px;

	font-weight: 500;
	font-size: 14px;

	border-radius: 8px;

	background-color: ${(props) =>
		props.$following ? colors.greyScale.grey3 : colors.primary.primary};
	color: ${(props) => (props.$following ? 'black' : 'white')};
`;

// 더미데이터
const notifications = [
	{
		id: 'jungu1234',
		avater_url: 'wefalfdbkjwerqj',
		type: 'comment',
		link: 'dfdfsfds',
		message: '회원님의 게시물에 댓글을 남겼어요',
		created_date: '2023-07-24',
		is_read: false,
	},
	{
		id: 'jungu1234',
		avater_url: 'wefalfdbkjwerqj',
		type: 'mention',
		link: 'dfdfsfds',
		message: '너를 멘션했어요',
		created_date: '2023-07-24',
		is_read: false,
	},
	{
		id: 'jungu1234',
		avater_url: 'wefalfdbkjwerqj',
		type: 'follow',
		link: 'dfdfsfds',
		message: '널 팔로우 했어요',
		created_date: '2023-07-24',
		is_read: false,
	},
	{
		id: 'jungu1234',
		avater_url: 'wefalfdbkjwerqj',
		type: 'like',
		link: 'dfdfsfds',
		message: '게시물에 좋아요를 했어요',
		created_date: '2023-07-24',
		is_read: false,
	},
	{
		id: 'jungu1234',
		avater_url: 'wefalfdbkjwerqj',
		type: 'mention',
		link: 'dfdfsfds',
		message: '너를 멘션했어요',
		created_date: '2023-07-24',
		is_read: false,
	},
	{
		id: 'jungu1234',
		avater_url: 'wefalfdbkjwerqj',
		type: 'comment',
		link: 'dfdfsfds',
		message: '너의 게시물에 댓글을 남겼어요',
		created_date: '2023-07-24',
		is_read: false,
	},
	{
		id: 'jungu1234',
		avater_url: 'wefalfdbkjwerqj',
		type: 'mention',
		link: 'dfdfsfds',
		message: '너를 멘션했어요',
		created_date: '2023-07-24',
		is_read: false,
	},
];

notifications
	.filter((notification) => notification.type === 'follow')
	.map((noti) => {
		return noti.message;
	});

notifications
	.filter((notification) => notification.type === 'like')
	.map((noti) => {
		noti.message += ': @ksgeun ㅋㅋㅋ 집가고 싶다';
	});

notifications
	.filter((notification) => notification.type === 'mention')
	.map((noti) => {
		noti.message += ': @ksgeun ㅋㅋㅋ 집가고 싶다';
	});

notifications
	.filter((notification) => notification.type === 'comment')
	.map((noti) => {
		noti.message += ': ㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁ';
	});

const NotiFollow: React.FC = () => {
	const [isFollowing, setIsFollowing] = useState(false);

	const handleFollowButtonClick = () => {
		setIsFollowing((prevState) => !prevState);
	};

	const final = [];
	for (const notification of notifications) {
		final.push(
			<StyledContentContainer key={notification.id}>
				<StyledProfileImgDiv>
					<StyledProfileImg src="/" alt="이미지입니다" />
				</StyledProfileImgDiv>
				<StyledFollowMessage>
					<StyledLink to="/">{notification.id}</StyledLink>님이{' '}
					{notification.message} 5일
				</StyledFollowMessage>
				<StyledFollowButtonContainer>
					{notification.type === 'follow' && (
						<StyledFollowButton
							$following={isFollowing}
							onClick={handleFollowButtonClick}
						>
							{isFollowing ? '팔로잉' : '팔로우'}
						</StyledFollowButton>
					)}
				</StyledFollowButtonContainer>
			</StyledContentContainer>,
		);
	}
	return <StyledFollowContainer>{final}</StyledFollowContainer>;
};

export default NotiFollow;
