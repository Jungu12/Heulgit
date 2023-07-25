import React from 'react';
import styled from 'styled-components';

// 커뮤니티
const CommunityBlock = styled.div``;

// 헤더
const Header = styled.div`
	background-color: #999999;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;

	display: flex;
	justify-content: center;
	align-items: center;
	height: 55px;
`;

// 피드
const Feed = styled.div`
	display: flex;
	justify-content: center;
	height: 700px;
	border: solid 1px #999999;
`;

// 푸터
const Footer = styled.div`
	background-color: #999999;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1;

	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 70px;
`;

const ProfileImg = styled.img``;

const CommentInput = styled.input``;

const FreePostViewPage = () => {
	return (
		<CommunityBlock>
			<Header>상세 페이지</Header>
			<Feed>피드입니다</Feed>
			<Footer>
				<ProfileImg />
				<CommentInput />
			</Footer>
		</CommunityBlock>
	);
};

export default FreePostViewPage;
