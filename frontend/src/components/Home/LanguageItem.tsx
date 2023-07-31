import { colors } from '@constants/colors';
import { ProgrammingLanguageType } from '@typedef/home/heulgit.types';
import React from 'react';
import { styled } from 'styled-components';

const StyledItemContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 20px;
	&:hover {
		background-color: ${colors.primary.primaryLighten};
	}
`;

const StyledLanguageImage = styled.img`
	width: 34px;
	height: 34px;
	margin-right: 16px;
`;

const StyledLanguageName = styled.p`
	text-align: center;
	font-size: 24px;
	font-weight: 500;
`;

type Props = {
	language: ProgrammingLanguageType;
	onClickLanguage: (language: string) => void;
};

const LanguageItem = ({ language, onClickLanguage }: Props) => {
	return (
		<StyledItemContainer onClick={() => onClickLanguage(language.name)}>
			<StyledLanguageImage src={language.img} alt="" />
			<StyledLanguageName>{language.name}</StyledLanguageName>
		</StyledItemContainer>
	);
};

export default LanguageItem;
