import { colors } from '@constants/colors';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

type SideBarProps = {
	pos: number;
};

const SideBarContainer = styled.div<SideBarProps>`
	z-index: 3;
	display: flex;
	flex-direction: column;
	position: fixed;
	right: 0;
	height: 100vh;
	background-color: ${colors.greyScale.grey1};
	width: 300px;
	transform: translateX(${({ pos }) => `${pos}px`});
	transition: transform 0.25s ease-in-out;
	border-left: 1px solid ${colors.greyScale.grey2};
`;

type Props = {
	children: React.ReactNode;
	open: boolean;
};

const Sidebar = ({ children, open }: Props) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [xPosition, setXPosition] = useState(0);

	// useEffect(() => {
	// 	setXPosition(sidebarRef.current?.clientWidth ?? 0);
	// }, [sidebarRef]);

	useEffect(() => {
		if (open) {
			setXPosition(0);
		} else {
			setXPosition(sidebarRef.current?.clientWidth ?? 0);
		}
		console.log(xPosition, open);
	}, [open]);

	return (
		<SideBarContainer pos={xPosition} ref={sidebarRef}>
			{children}
		</SideBarContainer>
	);
};

export default Sidebar;
