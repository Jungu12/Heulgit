import Calendar from '@components/Home/Calendar';
import CommentListBottomSheet from '@components/Home/CommentListBottomSheet';
import FeedItemList from '@components/Home/FeedItemList';
import LanguageSearchModal from '@components/Home/LanguageSearchModal';
import CBottomSheet from '@components/common/CBottomSheet';
import Navigation from '@components/common/Navigation';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import {
	HeulGitCommentType,
	HeulGitPostType,
} from '@typedef/home/heulgit.types';
import { getYearAndMonth } from '@utils/date';
import React from 'react';
import ReactModal from 'react-modal';
import { css, styled } from 'styled-components';

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
	/* height: 100vh; */
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
	width: 120px;
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

	li {
		cursor: pointer;
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

const LoadingConatiner = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
`;

type Props = {
	onClickHeulGit: () => void;
	onClickStarSort: () => void;
	onClickLikeSort: () => void;
	handleChangeCalendar: ([newStartDate, newEndDate]: [
		Date | null,
		Date | null,
	]) => void;
	onClickComment: (id: number) => void;
	onClickOutsideCalendar: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => void;
	onClickClearCalendar: () => void;
	onClickClearLanguage: () => void;
	onClickLanguageChoiceButton: () => void;
	onClickLanguageCloseButton: () => void;
	onClickLanguage: (language: string) => void;
	onClickNotification: () => void;
	onClickGitMessage: () => void;
	loadNextFeedList: () => void;
	handleClickCalendar: () => void;
	setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsViewOptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onHandleComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClickSubbmit: () => Promise<void>;
	isViewOptionOpen: boolean;
	dropDownRef: React.MutableRefObject<null>;
	calendarRef: React.RefObject<HTMLButtonElement>;
	selelctedOption: string;
	selectedLanguage: string;
	startDate: Date | null;
	endDate: Date | null;
	isCalendarOpen: boolean;
	isLanguageOpen: boolean;
	isCommentOpen: boolean;
	selelctedComment: number;
	feedList: HeulGitPostType[][] | undefined;
	hasMore: boolean;
	commentInput: string;
	commentList: HeulGitCommentType[];
};

const MainPageMobile = ({
	onClickHeulGit,
	onClickStarSort,
	onClickLikeSort,
	handleChangeCalendar,
	onClickComment,
	onClickOutsideCalendar,
	onClickClearCalendar,
	onClickClearLanguage,
	onClickLanguageCloseButton,
	onClickLanguageChoiceButton,
	onClickLanguage,
	onClickNotification,
	onClickGitMessage,
	onClickSubbmit,
	onHandleComment,
	loadNextFeedList,
	setIsViewOptionOpen,
	setIsCommentOpen,
	handleClickCalendar,
	dropDownRef,
	calendarRef,
	isViewOptionOpen,
	isCalendarOpen,
	isLanguageOpen,
	isCommentOpen,
	selelctedOption,
	selectedLanguage,
	startDate,
	endDate,
	selelctedComment,
	feedList,
	hasMore,
	commentInput,
	commentList,
}: Props) => {
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
				<li onClick={onClickStarSort}>스타 많은 순</li>
				<li onClick={onClickLikeSort}>좋아요 많은 순</li>
			</StyledDropDown>
			{/* 피드가 담길 곳 */}

			{feedList ? (
				<FeedItemList
					feedList={feedList}
					onClickComment={onClickComment}
					loadNextFeedList={loadNextFeedList}
					hasMore={hasMore}
				/>
			) : (
				<LoadingConatiner>loading...</LoadingConatiner>
			)}
			<CBottomSheet
				open={isCommentOpen}
				onDismiss={() => setIsCommentOpen(false)}
				onHandleComment={onHandleComment}
				input={commentInput}
				onClickSubbmit={onClickSubbmit}
			>
				<CommentListBottomSheet
					postId={selelctedComment}
					commentList={commentList}
				/>
			</CBottomSheet>
			<Navigation />
		</StyledMainContainer>
	);
};

export default MainPageMobile;
