import { colors } from '@constants/colors';
import React, { useCallback, useState } from 'react';
import { css, styled } from 'styled-components';
import { images } from '@constants/images';
import { getYearAndMonth } from '@utils/date';
import CalendarTablet from './CalendarTablet';

type StyledCommonContentProps = {
	isSelected: boolean;
};

const StyledSideBarContent = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const StyledHeader = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	background-color: ${colors.primary.primary};
	color: white;
	font-weight: 700;
	padding-left: 20px;
	height: 44px;
	align-items: center;
`;

const StyledCloseArea = styled.div`
	background-color: ${colors.primary.primatyDark};
	color: white;
	font-weight: 400;
	font-size: 14px;
	margin-left: auto;
	height: 100%;
	display: flex;
	align-items: center;
	padding: 0 12px;
`;

const StyledContentBody = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const StyledSubTitle = styled.p`
	font-weight: 600;
	font-size: 14px;
	margin-top: 24px;
	margin-left: 12px;
	color: ${colors.greyScale.grey4};
`;

const StyledCommonContent = styled.p<StyledCommonContentProps>`
	font-weight: 700;
	font-size: 16px;
	margin-top: 20px;
	margin-left: 12px;
	color: ${colors.greyScale.grey3};
	cursor: pointer;
	${(props) =>
		props.isSelected &&
		css`
			color: ${colors.greyScale.black};
		`}

	&:hover {
		color: ${colors.greyScale.black};
		transform: scale(1.025);
	}
`;

const StyledCalendarContainer = styled.div`
	display: flex;
	position: fixed;
`;

const StyledCalendarFillter = styled.button`
	display: flex;
	border: 0;
	padding: 8px 0px;
	border-radius: 4px;
	margin-left: 10px;
	justify-content: center;
	flex: 0 0 auto;
	background-color: white;
	border: 1px solid ${colors.greyScale.grey3};
	margin-top: 16px;
	text-align: center;
	margin-right: 60px;

	img {
		margin-left: 8px;
		width: 16px;
		height: 16px;
	}
`;

const StyledCalendarFont = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	color: black;
	font-size: 14px;
	font-weight: 700;
	justify-content: center;
	padding-left: 8px;
	margin-right: 12px;

	img {
		position: absolute;
		width: 18px;
		height: 18px;
		right: -44px;
		cursor: pointer;
	}
`;

const StyledLanguageInputContinaer = styled.div`
	display: flex;
	position: relative;
	margin-top: 16px;

	input {
		border: 1px solid ${colors.greyScale.grey3};
		height: 32px;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 700;
		margin-left: 8px;
		padding: 8px;
		width: 230px;
		cursor: pointer;
		outline: none;
	}

	img {
		width: 18px;
		height: 18px;
		position: absolute;
		left: 214px;
		top: 7px;
	}
`;

const Empty = styled.div`
	height: 32px;
`;

type Props = {
	onClickClose: () => void;
	isCalendarOpen: boolean;
	isLanguageOpen: boolean;
	startDate: Date | null;
	endDate: Date | null;
	seletedLanguage: string;
	calendarRef: React.RefObject<HTMLButtonElement>;
	onClickOutside: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	handleChangeCalendar: ([newStartDate, newEndDate]: [
		Date | null,
		Date | null,
	]) => void;
	handleClickCalendar: () => void;
	onClickClearCalendar: () => void;
	onClickLanguage: () => void;
	onClickLanguageClear: () => void;
};

const SideBarContent = ({
	onClickClose,
	isCalendarOpen,
	startDate,
	endDate,
	calendarRef,
	seletedLanguage,
	onClickOutside,
	handleChangeCalendar,
	handleClickCalendar,
	onClickClearCalendar,
	onClickLanguage,
	onClickLanguageClear,
}: Props) => {
	const [seletedSortType, setSeletedSortType] = useState('전체보기');

	const onClickNoSortButton = useCallback(() => {
		setSeletedSortType('전체보기');
	}, []);

	const onClickLikeSortButton = useCallback(() => {
		setSeletedSortType('좋아요');
	}, []);

	const onClickStarSortButton = useCallback(() => {
		setSeletedSortType('스타');
	}, []);

	return (
		<StyledSideBarContent>
			<StyledHeader>
				<div>Filter</div>
				<StyledCloseArea onClick={onClickClose}>close</StyledCloseArea>
			</StyledHeader>
			<StyledContentBody>
				<StyledSubTitle>정렬</StyledSubTitle>
				<StyledCommonContent
					isSelected={seletedSortType === '전체보기'}
					onClick={onClickNoSortButton}
				>
					전체보기
				</StyledCommonContent>
				<StyledCommonContent
					isSelected={seletedSortType === '좋아요'}
					onClick={onClickLikeSortButton}
				>
					좋아요 많은 순
				</StyledCommonContent>
				<StyledCommonContent
					isSelected={seletedSortType === '스타'}
					onClick={onClickStarSortButton}
				>
					스타 많은 순
				</StyledCommonContent>
				<Empty />
				<StyledSubTitle>날짜 선택</StyledSubTitle>
				<StyledCalendarFillter onClick={handleClickCalendar} ref={calendarRef}>
					<StyledCalendarFont>
						{`${startDate ? getYearAndMonth(startDate) : 'YYYY-MM'} ~ ${
							endDate ? getYearAndMonth(endDate) : 'YYYY-MM'
						} `}
						{endDate && (
							<img
								src={images.closePrimary}
								alt="clear"
								onClick={(e) => {
									e.stopPropagation();
									onClickClearCalendar();
								}}
							/>
						)}
					</StyledCalendarFont>
				</StyledCalendarFillter>
				{isCalendarOpen && (
					<StyledCalendarContainer>
						<CalendarTablet
							startDate={startDate}
							endDate={endDate}
							onClickOutside={onClickOutside}
							handleChangeCalendar={handleChangeCalendar}
						/>
					</StyledCalendarContainer>
				)}

				<Empty />
				<StyledSubTitle>언어 선택</StyledSubTitle>
				<StyledLanguageInputContinaer>
					<input
						type="text"
						value={seletedLanguage}
						readOnly
						placeholder="언어를 선택해주세요."
						onClick={onClickLanguage}
					/>
					{seletedLanguage && (
						<img
							src={images.closePrimary}
							alt="clear"
							onClick={onClickLanguageClear}
						/>
					)}
				</StyledLanguageInputContinaer>
			</StyledContentBody>
		</StyledSideBarContent>
	);
};

export default SideBarContent;
