import Header from '@components/common/Header';
import Navigation from '@components/common/Navigation';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledSearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(var(--vh, 1vh) * 100);
`;

const SearchBarInputContainer = styled.div`
	position: relative;
	width: 100%;
	padding: 16px;
	height: 52px;
	margin-top: 56px;
	margin-bottom: 70px;
`;

const StyledSearchInput = styled.input`
	padding: 15px 40px 15px 54px;
	display: flex;
	justify-content: center;
	width: 100%;
	border: 1px solid ${colors.greyScale.grey3};
	border-radius: 12px;
	font-size: 16px;
	font-weight: 500;

	&:focus {
		outline: 1px solid ${colors.primary.primary};
	}
`;

const StyledSearchIcon = styled.img`
	position: absolute;
	width: 32px;
	height: 32px;
	top: 28px;
	left: 28px;
`;

const StyledClearIcon = styled.img`
	position: absolute;
	width: 24px;
	height: 24px;
	top: 30px;
	right: 28px;
`;

const SearchPage = () => {
	const navigation = useNavigate();
	const [input, setInput] = useState('');
	const inputRef = useRef<HTMLInputElement | null>(null);

	const HandelSearchInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInput(e.target.value);
		},
		[],
	);

	const onClickClearButton = useCallback(() => {
		setInput('');
		if (inputRef.current) {
			inputRef.current?.focus();
		}
	}, []);

	const handleSubmit = () => {
		// 입력된 값 처리하는 로직
		navigation(`${input}`);
	};

	const handleEnterKeyPress = (
		event: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (event.key === 'Enter') {
			// 엔터 키가 눌렸을 때 실행할 함수 호출
			handleSubmit();
		}
	};

	return (
		<StyledSearchContainer>
			<Header title="통합검색" type="home" />
			<SearchBarInputContainer>
				<StyledSearchInput
					placeholder="검색어를 입력해주세요."
					value={input}
					onChange={HandelSearchInput}
					onKeyDown={handleEnterKeyPress}
					ref={inputRef}
				/>
				<StyledSearchIcon src={images.searchPrimary} alt="search" />
				{input && (
					<StyledClearIcon
						src={images.closePrimary}
						alt="clear"
						onClick={onClickClearButton}
					/>
				)}
			</SearchBarInputContainer>
			<Navigation />
		</StyledSearchContainer>
	);
};

export default SearchPage;
