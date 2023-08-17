import React from 'react';
import { styled } from 'styled-components';
import Lottie from 'lottie-react';

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
				animationData={'/assets/lottie/cat-loading-paw.json'}
				loop={true}
				style={{ width: '180px', height: '180px' }}
			/>
		</StyledLoadingContainer>
	);
};

export default Loading;
