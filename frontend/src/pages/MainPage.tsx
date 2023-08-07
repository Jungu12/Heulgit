import Calendar from '@components/Home/Calendar';
import FeedItemList from '@components/Home/FeedItemList';
import LanguageSearchModal from '@components/Home/LanguageSearchModal';
import Navigation from '@components/common/Navigation';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import useDetectClose from '@hooks/useDetectClose';
import { getYearAndMonth } from '@utils/date';
import { decodeUnicode } from '@utils/markdown';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
import 'react-spring-bottom-sheet/dist/style.css';
import CBottomSheet from '@components/common/CBottomSheet';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { http } from '@utils/http';
import CommentListBottomSheet from '@components/Home/CommentListBottomSheet';

// 더미 데이터
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
// 여기까지

// 모달 스타일
const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.3)', // 오버레이 배경색을 투명하게 설정
	},
	content: {
		width: '100%',
		height: '100vh',
		top: '0',
		left: '0',
		background: 'rgba(255, 255, 255, 0.6)',
		backdropFilter: 'blur(10px)',
		webkitBackdropFilter: 'blur(10px)', // -webkit-backdrop-filter 추가
		zIndex: '99',
		border: 'none',
		padding: '0',
	},
};

const StyledMainContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(var(--vh, 1vh) * 100);
`;

const StyledMainTitleSection = styled.section`
	position: fixed;
	top: 0;
	display: flex;
	height: 62px;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background-color: white;

	h2 {
		color: ${colors.primary.primary};
		text-align: center;
		font-family: 'RixYeoljeongdo_Regular';
		font-size: 22px;
		margin-left: 20px;
	}
`;

const StyledIconContainer = styled.div`
	display: flex;
	gap: 16px;
	margin-right: 20px;

	img {
		width: 28px;
		height: 28px;
	}
`;

const MainCatecorySection = styled.section`
	position: fixed;
	z-index: 10;
	top: 62px;
	display: flex;
	width: 100%;
	height: 61px;
	align-items: center;
	background-color: white;
	border-bottom: 1px solid ${colors.greyScale.grey3};

	button {
		display: flex;
		height: 36px;
		justify-content: center;
		align-items: center;
	}
`;

const StyledDropDownContainer = styled.div`
	position: relative;
	display: flex;
	flex-wrap: no-wrap;
	overflow-x: scroll;
	overflow-y: hidden;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledViewFillter = styled.button`
	border: 0;
	background-color: ${colors.primary.primary};
	color: white;
	font-size: 14px;
	font-weight: 500;
	padding: 8px 16px;
	border-radius: 24px;
	margin-left: 24px;
	flex: 0 0 auto;

	img {
		margin-left: 8px;
	}
`;

const StyledCalendarFillter = styled.button`
	display: flex;
	border: 0;
	background-color: ${colors.primary.primary};
	padding: 8px 20px;
	border-radius: 24px;
	margin-left: 10px;
	justify-content: center;
	flex: 0 0 auto;

	img {
		margin-left: 8px;
		width: 16px;
		height: 16px;
	}
`;

const StyledCalendarFont = styled.div`
	display: flex;
	align-items: center;
	color: white;
	font-size: 14px;
	font-weight: 500;

	img {
		width: 18px;
		height: 18px;
		margin-left: 4px;
	}
`;

const StyledLanguageFillter = styled.button`
	display: flex;
	border: 1px ${colors.greyScale.grey3} solid;
	background-color: white;
	color: ${colors.greyScale.grey5};
	font-size: 14px;
	font-weight: 500;
	padding: 8px 20px;
	border-radius: 24px;
	margin-left: 10px;
	margin-right: 20px;
	flex: 0 0 auto;

	${(props) =>
		props.name &&
		css`
			/* name 값이 있는 경우에만 적용될 스타일 */
			background-color: ${colors.primary.primary};
			color: white;
		`}

	img {
		width: 18px;
		height: 18px;
		margin-left: 4px;
	}
`;

const StyledDropDown = styled.ul`
	display: flex;
	flex-direction: column;
	background: ${colors.primary.primary};
	border-radius: 8px;
	position: absolute;
	top: 123px;
	left: 24px;
	width: 100px;
	box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	opacity: 0;
	visibility: hidden;
	transform: translateY(-20px);
	transition:
		opacity 0.4s ease,
		transform 0.4s ease,
		visibility 0.4s;
	padding: 10px;
	color: #fff;
	font-size: 14px;
	font-weight: 700;
	line-height: 26px;
	letter-spacing: -0.24px;
	gap: 4px;
	z-index: 10;

	&.active {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}
`;

const StyledCalendarContainer = styled.div`
	display: flex;
	position: fixed;
`;

const StyledClose = styled.img`
	position: fixed;
	bottom: 0;
	left: 50%;
	width: 50px;
	height: 50px;
	z-index: 100;
	transform: translate(-50%, -50%);
`;

const MainPage = () => {
	const accessToken = useSelector((state: RootState) => state.auth.token);
	const dropDownRef = useRef(null);
	const calendarRef = useRef<HTMLButtonElement>(null);
	// const sheetRef = useRef<BottomSheetRef>();
	const navigation = useNavigate();
	const [isViewOptionOpen, setIsViewOptionOpen] = useDetectClose(
		dropDownRef,
		false,
	);
	const [isLanguageOpen, setIsLanguageOpen] = useState(false);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [isCommentOpen, setIsCommentOpen] = useState(false);
	const [selelctedOption, setSelelctedOption] = useState('');
	const [selectedLanguage, setSelectedLanguage] = useState('');
	const [selelctedComment, setSelelctedComment] = useState<number>(-1);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const onClickHeulGit = useCallback(() => {
		setSelelctedOption('흘깃');
		setIsViewOptionOpen(false);
	}, []);

	const onClickStarSort = useCallback(() => {
		setSelelctedOption('스타 많은순');
		setIsViewOptionOpen(false);
	}, []);

	const onClickLikeSort = useCallback(() => {
		setSelelctedOption('좋아요 많은순');
		setIsViewOptionOpen(false);
	}, []);

	const handleClickCalendar = useCallback(() => {
		setIsCalendarOpen(!isCalendarOpen);
	}, [isCalendarOpen]);

	const handleChangeCalendar = ([newStartDate, newEndDate]: [
		Date | null,
		Date | null,
	]) => {
		setStartDate(newStartDate);
		setEndDate(newEndDate);
	};

	const onClickComment = useCallback((id: number) => {
		setSelelctedComment(id);
		setIsCommentOpen(true);
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
			// e.preventDefault();
			setIsCalendarOpen(false);
		},
		[],
	);

	const onClickClearCalendar = useCallback(() => {
		setStartDate(null);
		setEndDate(null);
		setIsCalendarOpen(false);
	}, []);

	const onClickClearLanguage = useCallback(() => {
		setSelectedLanguage('');
	}, []);

	const onClickLanguageChoiceButton = useCallback(() => {
		setIsLanguageOpen(!isLanguageOpen);
	}, [isLanguageOpen]);

	const onClickLanguageCloseButton = useCallback(() => {
		setIsLanguageOpen(false);
	}, []);

	const onClickLanguage = useCallback((language: string) => {
		setSelectedLanguage(language);
		setIsLanguageOpen(false);
	}, []);

	const onClickNotification = useCallback(() => {
		navigation('/notification');
	}, []);

	const onClickGitMessage = useCallback(() => {
		navigation('/gm');
	}, []);

	useEffect(() => {
		setSelelctedOption('흘깃');
		setSelectedLanguage('');
	}, []);

	useEffect(() => {
		// endDate가 변경된 경우 달력 닫기
		if (endDate !== null) {
			setIsCalendarOpen(false);
		}
	}, [endDate]);

	useEffect(() => {
		http.get('oauth/me').catch((err) => {
			alert(err);
		});
		console.log(isCalendarOpen);
		if (accessToken) {
			console.log(accessToken);
		} else {
			console.log('토큰 없음');
		}
	}, []);

	return (
		<StyledMainContainer>
			<StyledMainTitleSection>
				<h2>흘깃</h2>
				<StyledIconContainer>
					<img src={images.alarm} alt="alarm" onClick={onClickNotification} />
					<img src={images.gitMessage} alt="gm" onClick={onClickGitMessage} />
				</StyledIconContainer>
			</StyledMainTitleSection>
			<MainCatecorySection>
				<StyledDropDownContainer>
					<StyledViewFillter
						ref={dropDownRef}
						onClick={() => setIsViewOptionOpen(!isViewOptionOpen)}
					>
						{selelctedOption}
						<img
							src={isViewOptionOpen ? images.arrowUp : images.arrowDown}
							alt="option"
						/>
					</StyledViewFillter>
					<StyledCalendarFillter
						onClick={handleClickCalendar}
						ref={calendarRef}
					>
						<StyledCalendarFont>
							{`${startDate ? getYearAndMonth(startDate) : 'YYYY-MM'} ~ ${
								endDate ? getYearAndMonth(endDate) : 'YYYY-MM'
							} `}
							{endDate ? (
								<img
									src={images.close}
									alt="clear"
									onClick={(e) => {
										e.stopPropagation();
										onClickClearCalendar();
									}}
								/>
							) : (
								<img src={images.calendar} alt="calendar" />
							)}
						</StyledCalendarFont>
					</StyledCalendarFillter>
					<StyledLanguageFillter
						onClick={onClickLanguageChoiceButton}
						name={selectedLanguage}
					>
						{selectedLanguage ? selectedLanguage : '언어 선택'}
						{selectedLanguage && (
							<img
								src={images.close}
								alt="clear"
								onClick={(e) => {
									e.stopPropagation();
									onClickClearLanguage();
								}}
							/>
						)}
					</StyledLanguageFillter>
				</StyledDropDownContainer>
				{isCalendarOpen && (
					<StyledCalendarContainer>
						<Calendar
							startDate={startDate}
							endDate={endDate}
							onClickOutside={onClickOutsideCalendar}
							handleChangeCalendar={handleChangeCalendar}
						/>
					</StyledCalendarContainer>
				)}
			</MainCatecorySection>
			<ReactModal
				isOpen={isLanguageOpen}
				style={customStyles}
				overlayClassName="custom-overlay"
				// className="modal"
			>
				<LanguageSearchModal onClickLanguage={onClickLanguage} />
			</ReactModal>
			{isLanguageOpen && (
				<StyledClose
					src={images.closeBlack}
					alt="close"
					onClick={onClickLanguageCloseButton}
				/>
			)}
			<StyledDropDown className={isViewOptionOpen ? 'active' : ''}>
				<li onClick={onClickHeulGit}>흘깃</li>
				<li onClick={onClickStarSort}>스타 많은순</li>
				<li onClick={onClickLikeSort}>좋아요 많은순</li>
			</StyledDropDown>
			{/* 피드가 담길 곳 */}
			<FeedItemList feedList={dummyFeedList} onClickComment={onClickComment} />
			<CBottomSheet
				open={isCommentOpen}
				onDismiss={() => setIsCommentOpen(false)}
			>
				<CommentListBottomSheet postId={selelctedComment} />
			</CBottomSheet>
			<Navigation />
		</StyledMainContainer>
	);
};

export default MainPage;
