import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMediaQuery } from 'react-responsive';

type Props = {
	children: React.ReactNode;
};

const Mobile = ({ children }: Props) => {
	const isMobile = useMediaQuery({
		query: '(min-width:360px) and (max-width:767px)',
	});
	return <>{isMobile && children}</>;
};

const Tablet = ({ children }: Props) => {
	const isTablet = useMediaQuery({
		query: '(min-width:767px) and (max-width:1200px)',
	});
	return <>{isTablet && children}</>;
};

const PC = ({ children }: Props) => {
	const isPc = useMediaQuery({
		query: '(min-width:1200px)',
	});
	return <>{isPc && children}</>;
};

export { Mobile, Tablet, PC };
