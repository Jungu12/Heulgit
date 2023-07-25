import Navigation from '@components/common/Navigation';
import React from 'react';
import styled from 'styled-components';

const ProfileHigh = styled.div`
	display: flex;
	justify-content: space-around;
`;

const UserProfile = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 150px;
`;

const UserImage = styled.img`
	display: flex;
	justify-content: flex-start;
	background-color: black;
	height: 100px;
	width: 100px;
	border-radius: 50px;
`;

const UserInformation = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const ProfileCategory = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	height: 50px;
`;

const ProfileLow = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const CommitBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid;
	border-radius: 10px;
	width: 410px;
	height: 260px;
	margin: 10px;
`;

const CommitRank = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid;
	border-radius: 10px;
	width: 410px;
	height: 350px;
	margin: 10px;
`;

const Footer = styled.div`
	height: 50px;
`;

const ProfilePage = () => {
	return (
		<div>
			<ProfileHigh>
				<UserProfile>
					<UserImage src="" alt="User" />
					<UserInformation>
						<div>유저 이름</div>
						<div>팔로잉 팔로워</div>
						<div>추가 정보</div>
					</UserInformation>
				</UserProfile>
				<div>내활동</div>
			</ProfileHigh>
			<ProfileCategory>
				{/* 프로필 카테고리 */}
				<div>프로필</div>
				<div>유레카</div>
				<div>자유</div>
			</ProfileCategory>
			<hr />
			<ProfileLow>
				<CommitBox>커밋 분석 그래프</CommitBox>
				<CommitRank>커밋 랭킹</CommitRank>
			</ProfileLow>
			<Footer>
				<Navigation />
			</Footer>
		</div>
	);
};

export default ProfilePage;
