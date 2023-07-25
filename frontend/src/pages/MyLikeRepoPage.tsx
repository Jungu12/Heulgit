import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
	height: 55px;
`;
const BackButton = styled.button``;

const MyLikeRepoPage = () => {
	return (
		<div>
			<Header>
				<BackButton>◀</BackButton>
				흘깃판
			</Header>
			<hr />
		</div>
	);
};

export default MyLikeRepoPage;
