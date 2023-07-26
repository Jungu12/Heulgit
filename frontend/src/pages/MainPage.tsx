import FeedItemList from '@components/Home/FeedItemList';
import Navigation from '@components/common/Navigation';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import useDetectClose from '@hooks/useDetectClose';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

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

const StyledMainContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledMainTitleSection = styled.section`
	position: fixed;
	top: 0;
	display: flex;
	height: 62px;
	align-items: center;
	justify-content: space-between;
	width: 100%;

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
	top: 62px;
	display: flex;
	width: 100%;
	height: 61px;
	align-items: center;
	border-bottom: 1px solid ${colors.greyScale.grey3};
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
	font-weight: 700;
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
	color: white;
	font-size: 14px;
	font-weight: 700;
	padding: 8px 20px;
	border-radius: 24px;
	margin-left: 10px;
	justify-content: center;
	flex: 0 0 auto;

	img {
		margin-left: 8px;
	}
`;

const StyledLanguageFillter = styled.button`
	display: flex;
	border: 1px ${colors.greyScale.grey3} solid;
	background-color: white;
	color: ${colors.greyScale.grey5};
	font-size: 14px;
	font-weight: 700;
	padding: 8px 20px;
	border-radius: 24px;
	margin-left: 10px;
	margin-right: 20px;
	flex: 0 0 auto;
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

	&.active {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}
`;

const MainPage = () => {
	const dropDownRef = useRef(null);
	const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
	const [selelctedOption, setSelelctedOption] = useState('');
	const [selectedLanguage, setSelectedLanguage] = useState('');

	const onClickHeulGit = useCallback(() => {
		setSelelctedOption('흘깃');
		setIsOpen(false);
	}, []);

	const onClickStarSort = useCallback(() => {
		setSelelctedOption('스타 많은순');
		setIsOpen(false);
	}, []);

	const onClickLikeSort = useCallback(() => {
		setSelelctedOption('좋아요 많은순');
		setIsOpen(false);
	}, []);

	useEffect(() => {
		setSelelctedOption('흘깃');
		setSelectedLanguage('');
	}, []);

	return (
		<StyledMainContainer>
			<StyledMainTitleSection>
				<h2>흘깃</h2>
				<StyledIconContainer>
					<img src={images.alarm} alt="alarm" />
					<img src={images.gitMessage} alt="gm" />
				</StyledIconContainer>
			</StyledMainTitleSection>
			<MainCatecorySection>
				<StyledDropDownContainer ref={dropDownRef}>
					<StyledViewFillter onClick={() => setIsOpen(!isOpen)}>
						{selelctedOption}
						<img
							src={isOpen ? images.arrowUp : images.arrowDown}
							alt="option"
						/>
					</StyledViewFillter>
					<StyledCalendarFillter>
						2023.05 ~ 2023.08
						<img src={images.calendar} alt="calendar" />
					</StyledCalendarFillter>
					<StyledLanguageFillter>
						{selectedLanguage ? selectedLanguage : '언어 선택'}
					</StyledLanguageFillter>
				</StyledDropDownContainer>
			</MainCatecorySection>
			<StyledDropDown className={isOpen ? 'active' : ''}>
				<li onClick={onClickHeulGit}>흘깃</li>
				<li onClick={onClickStarSort}>스타 많은순</li>
				<li onClick={onClickLikeSort}>좋아요 많은순</li>
			</StyledDropDown>
			{/* 피드가 담길 곳 */}
			<FeedItemList feedList={dummyFeedList} />
			<Navigation />
		</StyledMainContainer>
	);
};

export default MainPage;
