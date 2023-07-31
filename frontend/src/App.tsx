import { useWindowSize } from '@hooks/useWindowSize';
import RootRouter from '@routes/RootRouter';
import React from 'react';
import ReactModal from 'react-modal';
import { styled } from 'styled-components';

interface WrapperProps {
	height?: number;
}

const Wrapper = styled.div<WrapperProps>`
	width: 100%;
	${(props) => (props.height ? `height: ${props.height}px;` : '')}
`;

const App = () => {
	// function setScreenSize() {
	// 	const vh = window.innerHeight * 0.01;
	// 	document.documentElement.style.setProperty('--vh', `${vh}px`); //"--vh"라는 속성으로 정의해준다.
	// }

	// window.addEventListener('resize', () => setScreenSize());
	const { height } = useWindowSize();

	return (
		<Wrapper height={height}>
			<div className="App">
				<RootRouter />
			</div>
		</Wrapper>
	);
};

ReactModal.setAppElement('#root');
export default App;
