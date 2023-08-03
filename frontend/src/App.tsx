// import { useWindowSize } from '@hooks/useWindowSize';
import RootRouter from '@routes/RootRouter';
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';

const App = () => {
	function setScreenSize() {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`); //"--vh"라는 속성으로 정의해준다.
	}

	useEffect(() => {
		setScreenSize();

		// resize 이벤트가 발생하면 다시 계산하도록 아래 코드 추가
		window.addEventListener('resize', setScreenSize);
		return () => window.removeEventListener('resize', setScreenSize);
	}, []);

	return (
		<div className="App">
			<RootRouter />
		</div>
	);
};

ReactModal.setAppElement('#root');
export default App;
