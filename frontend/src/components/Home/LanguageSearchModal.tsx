import { proLanguage } from '@constants/language';
import { ProgrammingLanguageType } from '@typedef/home/heulgit.types';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import LanguageList from './LanguageList';
import { colors } from '@constants/colors';
import { images } from '@constants/images';

const StyledLaguageSearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const SearchBarContainer = styled.div`
	position: fixed;
	top: 0;
	display: flex;
	z-index: 99;
	width: 100%;
	height: 56px;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-bottom: 1px solid ${colors.greyScale.grey3};
`;

const StyledBackButton = styled.img`
	/* position: absolute; */
	height: 24px;
	width: 24px;
	margin-left: 18px;
	margin-right: 18px;
	top: 16px;
`;

const StyledSearchInput = styled.input`
	display: flex;
	width: 100%;
	align-items: center;
	position: relative;
	font-size: 20px;
	font-weight: 500;
	padding-right: 20px;
	outline: none;

	&::placeholder {
		color: ${colors.greyScale.grey4};
	}
`;

const LanguageSearchModal = () => {
	const [languages, setLanguages] =
		useState<ProgrammingLanguageType[]>(proLanguage);
	const [input, setInput] = useState('');

	const onHandleInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInput(e.target.value);
		},
		[],
	);

	useEffect(() => {
		setLanguages(proLanguage);
	}, []);

	return (
		<StyledLaguageSearchContainer>
			<SearchBarContainer>
				<StyledBackButton src={images.header.back} alt="back button" />
				<StyledSearchInput
					placeholder="찾고자 하는 언어 입력"
					value={input}
					onChange={onHandleInput}
				/>
			</SearchBarContainer>
			<LanguageList languages={languages} />
		</StyledLaguageSearchContainer>
	);
};

export default LanguageSearchModal;
