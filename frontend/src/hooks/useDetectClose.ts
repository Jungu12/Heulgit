import React, { useState, useEffect } from 'react';

const useDetectClose = (
	elem: React.RefObject<HTMLElement>,
	initialState: boolean,
) => {
	const [isOpen, setIsOpen] = useState<boolean>(initialState);

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			console.log(elem.current);
			console.log(e.target);

			if (elem.current !== null && !elem.current.contains(e.target as Node)) {
				setIsOpen(!isOpen);
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

	return [isOpen, setIsOpen] as const;
};

export default useDetectClose;
