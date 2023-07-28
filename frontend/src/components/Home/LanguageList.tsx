import { ProgrammingLanguageType } from '@typedef/home/heulgit.types';
import React from 'react';
import LanguageItem from './LanguageItem';
import { styled } from 'styled-components';

const LanguageListContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 70px;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

type Props = {
	languages: ProgrammingLanguageType[];
};

const LanguageList = ({ languages }: Props) => {
	return (
		<LanguageListContainer>
			{languages.map((language) => (
				<LanguageItem key={language.id} language={language} />
			))}
		</LanguageListContainer>
	);
};

export default LanguageList;
