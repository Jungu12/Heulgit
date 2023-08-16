import React, { useState, useEffect } from 'react';

const useDetectClose = (
	elem: React.RefObject<HTMLElement>,
	initialState: boolean,
) => {
	const [isOpen, setIsOpen] = useState<boolean>(initialState);

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (elem.current !== null && !elem.current.contains(e.target as Node)) {
				setIsOpen(false);
				console.log('안녕~~');
			}
		};

		if (isOpen) {
			window.addEventListener('click', onClick);
		}

		return () => {
			window.removeEventListener('click', onClick);
		};
	}, [isOpen, elem]);

	useEffect(() => {
		console.log('open 값 변경', isOpen);
	}, [isOpen]);

	return [isOpen, setIsOpen] as const;
};

export default useDetectClose;
