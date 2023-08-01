import { proLanguage } from '@constants/language';
import { ProgrammingLanguageType } from '@typedef/home/heulgit.types';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import LanguageList from './LanguageList';

const StyledLaguageSearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

type Props = {
	onClickLanguage: (language: string) => void;
};

const LanguageSearchModal = ({ onClickLanguage }: Props) => {
	const [languages, setLanguages] =
		useState<ProgrammingLanguageType[]>(proLanguage);

	useEffect(() => {
		setLanguages(proLanguage);
	}, []);

	return (
		<StyledLaguageSearchContainer>
			<LanguageList languages={languages} onClickLanguage={onClickLanguage} />
		</StyledLaguageSearchContainer>
	);
};

export default LanguageSearchModal;
