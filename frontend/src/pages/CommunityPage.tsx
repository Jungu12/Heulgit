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

const HeaderButton = styled.button``;

// 커뮤니티 카테고리바
const CommunityCategory = styled.div`
	background-color: #999384;
	position: fixed;
	top: 55px;
	left: 0;
	right: 0;
	z-index: 1;

	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 55px;
`;

// 커뮤니티 버튼
const CommunityButton = styled.button`
	background-color: transparent;
	border: none;
	width: 100%;
	height: 100%;

	padding: 0;
`;

// 정렬 카테고리바
const SortCategory = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 53px;
	margin-top: 110px;
`;

// 정렬 버튼
const SortButton = styled.button`
	height: 28px;
	border: solid 1px;
	border-radius: 36px;
	background-color: white;
`;

// 피드
const Feed = styled.div`
	display: flex;
	justify-content: center;
	height: 700px;
	border: solid 1px #999999;
`;

// 글 작성 버튼
const CreatePostButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 100px;
	right: 40px;

	width: 70px;
	height: 70px;
	border: none;
	border-radius: 50%;

	padding: 0;
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

// 푸터 버튼
const FooterButton = styled.button`
	background-color: transparent;
	border: none;
	width: 100%;
	height: 100%;

	padding: 0;
`;

const CommunityPage = () => {
	return (
		<CommunityBlock>
			<Header>커뮤니티</Header>
			<CommunityCategory>
				<CommunityButton>흘깃판</CommunityButton>
				<CommunityButton>자유 게시판</CommunityButton>
			</CommunityCategory>
			<SortCategory>
				<SortButton>좋아요 많은 순</SortButton>
				<SortButton>댓글 많은 순</SortButton>
				<SortButton>전체 보기</SortButton>
				<SortButton>조회 순</SortButton>
			</SortCategory>
			<Feed>
				<p>피드입니다</p>
			</Feed>
			<CreatePostButton>작성</CreatePostButton>
			<Footer>
				<FooterButton>흘깃</FooterButton>
				<FooterButton>커뮤</FooterButton>
				<FooterButton>검색</FooterButton>
				<FooterButton>플필</FooterButton>
			</Footer>
		</CommunityBlock>
	);
};

export default CommunityPage;
