import React from 'react';
import { styled } from 'styled-components';
import Lottie from 'lottie-react';
import loadCatPaw from '../../cat-loading-paw.json';

const StyledLoadingContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Loading = () => {
	return (
		<StyledLoadingContainer>
			<Lottie
				animationData={loadCatPaw}
				loop={true}
				style={{ width: '180px', height: '180px' }}
			/>
		</StyledLoadingContainer>
	);
};

export default Loading;
