// import { useNavigate } from 'react-router-dom';
import Header from '@components/common/Header';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
	width: 100%;
	height: 56px;
	background-color: white;
	margin-bottom: 10px;
`;

const MyLikeRepoPage = () => {
	return (
		<div>
			<StyledHeader>
				<Header title={'좋아요 한 흘깃'}></Header>
			</StyledHeader>
		</div>
	);
};

export default MyLikeRepoPage;
