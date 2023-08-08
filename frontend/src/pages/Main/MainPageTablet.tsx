import FeedItemListTablet from '@components/Home/FeedItemListTablet';
import LanguageSearchModal from '@components/Home/LanguageSearchModal';
import SideBarContent from '@components/Home/SideBarContent';
import Sidebar from '@components/common/Sidebar';
import TabletNavigation from '@components/common/TabletNavigation';
import { images } from '@constants/images';
import { decodeUnicode } from '@utils/markdown';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const dummyFeedList = [
	{
		id: 1,
		name: '레전드 프로젝트',
		user: {
			id: 'bbing.pong',
			avater_url: images.dummy.dummy1,
			is_registered: true,
		},
		updated_date: '2023-07-24',
		content: decodeUnicode(
			`IyBDYXJib24gVHJhY2tlcgoKPGEgaHJlZj0iaHR0cHM6Ly93d3cueW91dHVi\nZS5jb20vd2F0Y2g/dj12bXhsa2IxOGlHMCI+8J+TuiBZb3V0dWJlPC9hPgoK\nIyMg66qp7KCBCgrquLDtm4TsnITquLDsnZgg7KO865CcIOybkOyduOyduCDs\np4DqtazsmKjrgpztmZTrpbwg66eJ6riwIOychO2VnCwg7YOE7IaMIOygiOqw\nkOydgCDsnbTsoJwg7J2466WYIOyDneyhtOydhCDsnITtlZwg7ZWE7IiYIOya\nlOyGjOqwgCDrkJjsl4jri6QuCuydtOyXkCDrjIDsnZHtlZjsl6wg64yA6rWs\n7IucICoq7KO87YOdIOuLqOyngOuzhCDtg4Tshowg67Cw7Lac65+JIOuwjyDt\ng4Tshowg7Y+s7J247Yq466W8IOyYiOy4oSDrsI8g7Iuc6rCB7ZmUKirtlZjs\nl6wg6rCc7J247J2YIO2DhOyGjCDsoIjqsJDqs7wg6riw6rSA7J2YIOycoOyX\nsO2VnCDquLDtm4Qg64yA7J2R7J2EIOuPleqzoOyekCDtlZzri6QuCgojIyMg\n7YOE7IaMIOuwsOy2nOufiSDsuKHsoJUg67Cp67KVCgotIO2DhOyGjCDrsLDs\ntpzrn4koa2dDTzJlcS4pID0g7JeQ64SI7KeAIOyCrOyaqeufiSB4IOq1reqw\ngCDqs6DsnKAg7Jio7IukIOqwgOyKpCDrsLDstpwg6rOE7IiYCgogIC0g7KCE\n6riwIOyYqOyLpCDqsIDsiqQg67Cw7LacIOqzhOyImDogMC40NjYzKGt3aCkK\nICAtIOqwgOyKpCDsmKjsi6Qg6rCA7IqkIOuwsOy2nCDqs4TsiJg6IDIuMjIo\nbcKzKQogIC0g7IiY64+EIOyYqOyLpCDqsIDsiqQg67Cw7LacIOqzhOyImDog\nMC4zMzMyKG3CsykKCiMjIyDsmIjsg4Eg7YOE7IaMIO2PrOyduO2KuCDsuKHs\noJUg67Cp67KVCgotIOyghOuFhCDrj5nsnbwg7JuUIOuMgOu5hCDqsJDstpXr\npaDsl5Ag65Sw6528IO2PrOyduO2KuOulvCDrtoDsl6wKCiAgLSDqsJDstpXr\npaDsl5Ag65Sw66W4IO2PrOyduO2KuCDslpHsnYAgaHR0cHM6Ly9jcG9pbnQu\nb3Iua3IvIOywuOqzoAoKLSDrsJjquLDrs4Qg7JuU67OEIO2PrOyduO2KuCDt\nlansgrDtlZwg6rCS7J2EIOyYiOyDgSDtg4Tshowg7Y+s7J247Yq466GcIOy4\noeyglQoKIyMg66y47IScCgotIDxhIGhyZWY9J2h0dHBzOi8vZGVsaWNhdGUt\nc2x1Zy00MzIubm90aW9uLnNpdGUvMDY5MWUzZjhjYWY3NGYwNzgwYTliMzkz\nN2I5ODE0ZDQ/dj02MGJhNWJiOWIxMzA0YzdmOTdkM2Y1YjhkZWMzOGJiYic+\n7IKs7Jqp7J6QIOyalOq1rOyCrO2VrSDsoJXsnZjshJw8L2E+Ci0gPGEgaHJl\nZj0naHR0cHM6Ly9kZWxpY2F0ZS1zbHVnLTQzMi5ub3Rpb24uc2l0ZS83MDVl\nOGI4NTM5Yjg0YWE0OWFkYjNhMDcyY2U4MTUyNyc+7Jyg7Iqk7LyA7J207Iqk\nIOuqheyEuOyEnDwvYT4KLSA8YSBocmVmPSdodHRwczovL2RlbGljYXRlLXNs\ndWctNDMyLm5vdGlvbi5zaXRlL2YyNDRlZDRmNzE0ZDQ3Yzg4MmJmNmYwZmJl\nNGY2ZjkyJz7snbjthLDtjpjsnbTsiqQg7ISk6rOEPC9hPgoKIyMg7Iuc7Iqk\n7YWcIOyEpOqzhAoKIVtpbWFnZV0oaHR0cHM6Ly91c2VyLWltYWdlcy5naXRo\ndWJ1c2VyY29udGVudC5jb20vMzMyMDgyNDYvMTc1Nzc1MTYxLWExMjczODFi\nLTY4MTktNGQ5ZC1iYWM4LWZkYjdhNDFlMTI1ZS5wbmcpCgojIyDsp4Ttlokg\n7IOB7ZmpCgotIFtYXSDtlYTsmpTtlZwg6rO16rO1642w7J207YSwIOyImOyn\nkSDrsI8g6rCA6rO1Ci0gW1hdIOyjvO2DnSDri6jsp4Ag7JeQ64SI7KeAIOyg\nleuztCBBUEkg6rWs7ZiECi0gW1hdIOy5tOy5tOyYpCBtYXAg7Lu07Y+s64SM\n7Yq4IOq1rO2YhAotIFtYXSBEMyDsl5DrhIjsp4Ag7IKs7Jqp65+JIOyLnOqw\nge2ZlAotIFtYXSDrj4TroZzrqoUv67KV7KCV66qFIOyjvOyGjCDsooztkZwg\n67OA7ZmYIEFQSSDqtaztmIQKLSBbWF0gRWxhc3RpY3NlYXJjaCDsobDtmowg\n6riw64qlIOq1rO2YhCDrsI8g7Jew64+ZCi0gW1hdIOqysOy4oey5mCDrjbDs\nnbTthLAg64yA7LK0IOyVjOqzoOumrOymmCDqtaztmIQKLSBbWF0g6rKA7IOJ\nIOyVjOqzoOumrOymmCDqtaztmIQg67CPIOyngOuPhCDsl7Drj5kKLSBbWF0g\n7JeQ64SI7KeAIOyCrOyaqeufiSDthYzsnbTruJQg7Iuc6rCB7ZmUIAotIFtY\nXSDsmIjsg4Eg7YOE7IaMIO2PrOyduO2KuCDqs4TsgrAgU2VydmljZSDqtazt\nmIQKLSBbWF0g6riw7ZuEIOuNsOydtO2EsOulvCDthrXtlZwg7ZWY66OoIOyY\niOyDgSDtg4Tshowg67Cw7Lac65+JIOyYiOy4oSDrqqjrjbgg7IOd7ISxCi0g\nW1hdIOyYiOyDgSDtg4Tshowg7Y+s7J247Yq4L+2DhOyGjCDrsLDstpzrn4kg\n7Lu07Y+s64SM7Yq4IOq1rO2YhAotIFsgXSDthYzsiqTtjIUg67CPIOqwnOyE\noAoKPGltZyB3aWR0aD0iMTQ0MCIgYWx0PSJpbWFnZSIgc3JjPSJodHRwczov\nL3VzZXItaW1hZ2VzLmdpdGh1YnVzZXJjb250ZW50LmNvbS8zMzIyMDQwNC8x\nNzA4MTA1NTAtM2M4ZWM5Y2QtMDE1Ny00MzJiLWEyYTgtMjUxMzFmYTc3MjQ0\nLnBuZyI+Cgo8aW1nIHdpZHRoPSIxNDQwIiBhbHQ9ImltYWdlIiBzcmM9Imh0\ndHBzOi8vdXNlci1pbWFnZXMuZ2l0aHVidXNlcmNvbnRlbnQuY29tLzMzMjIw\nNDA0LzE3MDgxMDU4Mi0wNzA5NTY2OS0zNjA0LTQyNDctYjY0Zi0wNjlmNzA5\nMGYyM2EucG5nIj4KCjxpbWcgd2lkdGg9IjE0NDAiIGFsdD0iaW1hZ2UiIHNy\nYz0iaHR0cHM6Ly91c2VyLWltYWdlcy5naXRodWJ1c2VyY29udGVudC5jb20v\nMzMyMjA0MDQvMTcyMzk0NTI4LTkyYTQxZjkyLWFjZTYtNDUxYy04MDM0LTUz\nYTYwODYzYjM4ZS5wbmciPgoKPGltZyB3aWR0aD0iMTQ0MCIgYWx0PSJpbWFn\nZSIgc3JjPSJodHRwczovL3VzZXItaW1hZ2VzLmdpdGh1YnVzZXJjb250ZW50\nLmNvbS8zMzIyMDQwNC8xNzIzOTQ2NDItZmExZmU1MTQtYzZhNC00MGUwLTlj\nMTktNGE3ZjJiZTk4NmZiLnBuZyI+CgojIyBDb250cmlidXRvcgoKW0dvLUph\nZWNoZW9sXShodHRwczovL2dpdGh1Yi5jb20vR28tSmFlY2hlb2wpCgpbS2lu\nZ0RvbmdneXVdKGh0dHBzOi8vZ2l0aHViLmNvbS9LaW5nRG9uZ2d5dSkKCltT\nZW9uZ3VrQmFla10oaHR0cHM6Ly9naXRodWIuY29tL1Nlb25ndWtCYWVrKQoK\nW3dvb25nLWphZV0oaHR0cHM6Ly9naXRodWIuY29tL3dvb25nLWphZSkKCg==\n`,
		),
		likes: 1000,
		comments: 13,
	},
	{
		id: 2,
		name: 'Enjoy Trip',
		user: {
			id: 'bbing.pongggggg',
			avater_url: images.dummy.dummy2,
			is_registered: false,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 10002,
		comments: 133,
	},
	{
		id: 1,
		name: '레전드 프로젝트',
		user: {
			id: 'bbing.pong',
			avater_url: images.dummy.dummy1,
			is_registered: true,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 1000,
		comments: 13,
	},
	{
		id: 2,
		name: 'Enjoy Trip',
		user: {
			id: 'bbing.pongggggg',
			avater_url: images.dummy.dummy2,
			is_registered: false,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 10002,
		comments: 133,
	},
	{
		id: 1,
		name: '레전드 프로젝트',
		user: {
			id: 'bbing.pong',
			avater_url: images.dummy.dummy1,
			is_registered: true,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 1000,
		comments: 13,
	},
	{
		id: 2,
		name: 'Enjoy Trip',
		user: {
			id: 'bbing.pongggggg',
			avater_url: images.dummy.dummy2,
			is_registered: false,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 10002,
		comments: 133,
	},
	{
		id: 1,
		name: '레전드 프로젝트',
		user: {
			id: 'bbing.pong',
			avater_url: images.dummy.dummy1,
			is_registered: true,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 1000,
		comments: 13,
	},
	{
		id: 2,
		name: 'Enjoy Trip',
		user: {
			id: 'bbing.pongggggg',
			avater_url: images.dummy.dummy2,
			is_registered: false,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 10002,
		comments: 133,
	},
	{
		id: 1,
		name: '레전드 프로젝트',
		user: {
			id: 'bbing.pong',
			avater_url: images.dummy.dummy1,
			is_registered: true,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 1000,
		comments: 13,
	},
	{
		id: 2,
		name: 'Enjoy Trip',
		user: {
			id: 'bbing.pongggggg',
			avater_url: images.dummy.dummy2,
			is_registered: false,
		},
		updated_date: '2023-07-24',
		content: '특강 듣기 싫다아아아아아아아아ㅏ아아아아아......',
		likes: 10002,
		comments: 133,
	},
];

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

const MainPageTablet = () => {
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
			console.log(e.target);
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
					feedList={dummyFeedList}
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
