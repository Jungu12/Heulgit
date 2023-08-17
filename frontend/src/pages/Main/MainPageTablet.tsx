import FeedItemListTablet from '@components/Home/FeedItemListTablet';
import LanguageSearchModal from '@components/Home/LanguageSearchModal';
import SideBarContent from '@components/Home/SideBarContent';
import Sidebar from '@components/common/Sidebar';
import TabletNavigation from '@components/common/TabletNavigation';
import { images } from '@constants/images';
import { HeulGitPostType } from '@typedef/home/heulgit.types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const customStyles = {
	overlay: {
		zIndex: '99',
		backgroundColor: 'rgba(0, 0, 0, 0.3)', // 오버레이 배경색을 투명하게 설정
	},
	content: {
		width: '600px',
		height: '75vh',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		background: 'rgba(255, 255, 255, 0.6)',
		backdropFilter: 'blur(10px)',
		webkitBackdropFilter: 'blur(10px)', // -webkit-backdrop-filter 추가
		zIndex: '99',
		border: 'none',
		padding: '0',
	},
};

const StyledMainContainer = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: calc(var(--vh, 1vh) * 100);
`;

const StyledFilterButton = styled.button`
	position: fixed;
	top: 32px;
	right: 30px;
	cursor: pointer;
	background: none;

	img {
		width: 44px;
		height: 44px;
	}
`;

const StyledCloseImageContainer = styled.div`
	position: fixed;
	top: 17%;
	left: 28%;
	transform: translate(-50%, -50%);
	display: flex;
	width: 100%;
	justify-content: flex-end;
	margin-bottom: 24px;
	z-index: 100;
`;

const StyledFeedContainer = styled.section`
	width: 100%;
	display: flex;
	margin-left: 125px;
	margin-right: 40px;
	justify-content: center;
`;

const StyledCloseImage = styled.img`
	width: 44px;
	height: 44px;
	margin-top: 24px;
	margin-right: 24px;
`;

type Props = {
	feedList: HeulGitPostType[];
};

const MainPageTablet = ({ feedList }: Props) => {
	const navigation = useNavigate();
	const calendarRef = useRef<HTMLButtonElement>(null);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [isLanguageOpen, setIsLanguageOpen] = useState(false);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [seletedLanguage, setSeletedLanguage] = useState('');

	const onClickFilter = useCallback(() => {
		setIsFilterOpen(true);
	}, []);

	const onClickClose = useCallback(() => {
		setIsFilterOpen(false);
	}, []);

	const onClickOutsideCalendar = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (
				calendarRef.current &&
				calendarRef.current.contains(e.target as Node)
			) {
				// 특정 요소를 클릭한 경우, 함수를 바로 종료시킴
				return;
			}
			setIsCalendarOpen(false);
		},
		[],
	);

	const handleChangeCalendar = useCallback(
		([newStartDate, newEndDate]: [Date | null, Date | null]) => {
			setStartDate(newStartDate);
			setEndDate(newEndDate);
		},
		[],
	);

	const handleClickCalendar = useCallback(() => {
		setIsCalendarOpen(!isCalendarOpen);
	}, [isCalendarOpen]);

	const onClickClearCalendar = useCallback(() => {
		setStartDate(null);
		setEndDate(null);
		setIsCalendarOpen(false);
	}, []);

	const onClickComment = useCallback((id: number) => {
		navigation(`/repo/${id}`);
	}, []);

	const onClickLanguageInput = useCallback(() => {
		setIsLanguageOpen(!isLanguageOpen);
	}, []);

	const onClickLanguage = useCallback((language: string) => {
		setSeletedLanguage(language);
		setIsLanguageOpen(false);
	}, []);

	const onClickLanguageClose = useCallback(() => {
		setIsLanguageOpen(false);
	}, []);

	const onClickLanguageClear = useCallback(() => {
		setSeletedLanguage('');
	}, []);

	useEffect(() => {
		// endDate가 변경된 경우 달력 닫기
		if (endDate !== null) {
			setIsCalendarOpen(false);
		}
	}, [endDate]);

	return (
		<StyledMainContainer>
			<TabletNavigation />
			{/* 메인피드 */}
			<StyledFeedContainer>
				<FeedItemListTablet
					feedList={feedList}
					onClickComment={onClickComment}
				/>
			</StyledFeedContainer>
			{/* 우측 필터 버튼 */}
			<StyledFilterButton onClick={onClickFilter}>
				<img src={images.filter} alt="filter" />
			</StyledFilterButton>
			<Sidebar open={isFilterOpen}>
				<SideBarContent
					isCalendarOpen={isCalendarOpen}
					isLanguageOpen={isLanguageOpen}
					onClickClose={onClickClose}
					startDate={startDate}
					endDate={endDate}
					calendarRef={calendarRef}
					onClickOutside={onClickOutsideCalendar}
					handleChangeCalendar={handleChangeCalendar}
					handleClickCalendar={handleClickCalendar}
					onClickClearCalendar={onClickClearCalendar}
					onClickLanguage={onClickLanguageInput}
					onClickLanguageClear={onClickLanguageClear}
					seletedLanguage={seletedLanguage}
				/>
			</Sidebar>
			<ReactModal isOpen={isLanguageOpen} style={customStyles}>
				<LanguageSearchModal onClickLanguage={onClickLanguage} />
			</ReactModal>
			{isLanguageOpen && (
				<StyledCloseImageContainer>
					<StyledCloseImage
						src={images.closeBlack}
						alt="close"
						onClick={onClickLanguageClose}
					/>
				</StyledCloseImageContainer>
			)}
		</StyledMainContainer>
	);
};

export default MainPageTablet;
