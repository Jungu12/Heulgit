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

const MyCommentPage = () => {
	return (
		<div>
			<StyledHeader>
				<Header title={'내가 작성한 댓글'}></Header>
			</StyledHeader>
		</div>
	);
};

export default MyCommentPage;
