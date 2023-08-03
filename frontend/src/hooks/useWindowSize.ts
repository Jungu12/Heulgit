import { useEffect, useState } from 'react';

export const useWindowSize = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	useEffect(() => {
		const setWindowSize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		};

		window.addEventListener('resize', setWindowSize);

		return () => {
			window.removeEventListener('resize', setWindowSize);
		};
	}, []);

	return {
		width,
		height,
	};
};
