import RootRouter from '@routes/RootRouter';
import React from 'react';
import ReactModal from 'react-modal';

const App = () => {
	function setScreenSize() {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`); //"--vh"라는 속성으로 정의해준다.
	}

	window.addEventListener('resize', () => setScreenSize());

	return (
		<div className="App">
			<RootRouter />
		</div>
	);
};

ReactModal.setAppElement('#root');
export default App;
