import Header from '@components/common/Header';
import Navigation from '@components/common/Navigation';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import useDetectClose from '@hooks/useDetectClose';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

const StyledSearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(var(--vh, 1vh) * 100);

	div {
		margin-right: calc(50% - 62px);
		cursor: pointer;
	}
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

const StyledDropDown = styled.ul`
	display: flex;
	flex-direction: column;
	background: white;
	border-radius: 8px;
	position: absolute;
	top: 61px;
	left: calc(50% - 54px);
	width: 120px;
	box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	opacity: 0;
	visibility: hidden;
	transform: translateY(-20px);
	transition:
		opacity 0.4s ease,
		transform 0.4s ease,
		visibility 0.4s;
	color: black;
	font-size: 16px;
	font-weight: 700;
	line-height: 26px;
	letter-spacing: -0.24px;

	&.active {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	li {
		padding: 10px;
	}
`;

const StyledDropdownseparator = styled.div`
	width: 100%;
	height: 1px;
	background-color: ${colors.greyScale.grey3};
`;

const SearchPage = () => {
	const dropDownRef = useRef(null);
	const [seletedSearchCategory, setSeletedSearchCategory] = useState('');
	const [input, setInput] = useState('');
	const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
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

	const onClickRepo = useCallback(() => {
		setSeletedSearchCategory('레포지토리');
		setIsOpen(false);
	}, []);

	const onClickBoard = useCallback(() => {
		setSeletedSearchCategory('게시판');
		setIsOpen(false);
	}, []);

	const onClickUser = useCallback(() => {
		setSeletedSearchCategory('사용자');
		setIsOpen(false);
	}, []);

	useEffect(() => {
		setSeletedSearchCategory('레포지토리');
		setInput('');
	}, []);

	return (
		<StyledSearchContainer>
			<Header title={seletedSearchCategory} type="home">
				<img
					src={isOpen ? images.arrowUpBlack : images.arrowDownBlack}
					onClick={() => setIsOpen(!isOpen)}
				/>
			</Header>
			<SearchBarInputContainer>
				<StyledSearchInput
					placeholder="검색어를 입력해주세요."
					value={input}
					onChange={HandelSearchInput}
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
			<StyledDropDown className={isOpen ? 'active' : ''}>
				<li onClick={onClickRepo}>레포지토리</li>
				<StyledDropdownseparator />
				<li onClick={onClickBoard}>게시물</li>
				<StyledDropdownseparator />
				<li onClick={onClickUser}>사용자</li>
			</StyledDropDown>
			<Navigation />
		</StyledSearchContainer>
	);
};

export default SearchPage;
