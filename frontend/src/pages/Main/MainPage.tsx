import useDetectClose from '@hooks/useDetectClose';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-spring-bottom-sheet/dist/style.css';
import { authHttp } from '@utils/http';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import MainPageMobile from './MainPageMobile';
import MainPageTablet from './MainPageTablet';
import MainPageWeb from './MainPageWeb';
import { getSortType } from '@utils/heulgit';
import {
	HeulGitCommentType,
	HeulGitPostType,
	HeulgitCommentWriteType,
	HeulgitPostResponseType,
} from '@typedef/home/heulgit.types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { OnChangeHandlerFunc } from 'react-mentions';

const MainPage = () => {
	const dropDownRef = useRef(null);
	const calendarRef = useRef<HTMLButtonElement>(null);
	const navigation = useNavigate();
	const [isViewOptionOpen, setIsViewOptionOpen] = useDetectClose(
		dropDownRef,
		false,
	);
	// const [page, setPage] = useState(1);
	const [feedList, setFeedList] = useState<HeulGitPostType[]>([]);
	const [isLanguageOpen, setIsLanguageOpen] = useState(false);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [isCommentOpen, setIsCommentOpen] = useState(false);
	const [commentInput, setCommentInput] = useState('');
	const [selelctedOption, setSelelctedOption] = useState('흘깃');
	const [selectedLanguage, setSelectedLanguage] = useState('');
	const [selelctedComment, setSelelctedComment] = useState<number>(-1);
	const [commentList, setCommentList] = useState<HeulGitCommentType[]>([]);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [commentPage, setCommentPage] = useState(1);
	const [mentionList, setMentionList] = useState<string[]>([]);

	const loadFeedList = useCallback(
		async (cur: number) => {
			console.log(cur + '페이지 호출!');

			try {
				const response = await authHttp.get<HeulgitPostResponseType>(
					`heulgit/posts?${
						(selectedLanguage ? `language=${selectedLanguage}&` : '') +
						(selelctedOption !== '흘깃'
							? `sort=${getSortType(selelctedOption)}&`
							: '') +
						(endDate && startDate
							? `start-year=${startDate.getFullYear()}&start-month=
							${startDate.getMonth() + 1}
									&end-year=${endDate.getFullYear()}&end-month=
								${endDate.getMonth() + 1}&`
							: '')
					}
					pages=${cur}`,
				);
				return response.content;
			} catch (error) {
				console.error('Error loading feed list:', error);
				return [];
			}
		},
		[
			setFeedList,
			selectedLanguage,
			selelctedOption,
			startDate,
			endDate,
			authHttp,
		],
	);

	// const loadNextFeedList = useCallback(() => {
	// 	const next = page + 1;
	// 	setPage(next);
	// 	loadFeedList(next);
	// }, [page]);

	const onClickHeulGit = useCallback(() => {
		setSelelctedOption('흘깃');
		setIsViewOptionOpen(false);
	}, []);

	const onClickStarSort = useCallback(() => {
		setSelelctedOption('스타 많은 순');
		setIsViewOptionOpen(false);
	}, []);

	const onClickLikeSort = useCallback(() => {
		setSelelctedOption('좋아요 많은 순');
		setIsViewOptionOpen(false);
	}, []);

	const handleClickCalendar = useCallback(() => {
		setIsCalendarOpen(!isCalendarOpen);
	}, [isCalendarOpen]);

	const handleChangeCalendar = useCallback(
		([newStartDate, newEndDate]: [Date | null, Date | null]) => {
			setStartDate(newStartDate);
			setEndDate(newEndDate);
		},
		[],
	);

	const onClickComment = useCallback((id: number) => {
		console.log('흘깃 댓글 클릭!');

		setSelelctedComment(id);
		setIsCommentOpen(true);
	}, []);

	const onHandleComment: OnChangeHandlerFunc = useCallback(
		(event, newValue, newPlainTextValue, mentions) => {
			setCommentInput(newPlainTextValue);
			setMentionList(
				mentions.map((mention) => mention.display.replace(/@|\s/g, '')),
			);
		},
		[],
	);

	// const handleMentionsInputChange: OnChangeHandlerFunc = (
	//   event: ChangeEvent<HTMLInputElement>,
	//   newValue: string,
	//   newPlainTextValue: string,
	//   mentions: MentionData[],
	// ) => {
	//   setCommentInput(newPlainTextValue);
	//   // 여기서 필요한 추가적인 처리를 수행할 수 있습니다.
	// };

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

	const loadCommentList = useCallback(async () => {
		const newCommentList = await authHttp
			.get<HeulGitCommentType[]>(
				`h-comments/${selelctedComment}?pages=${commentPage}`,
			)
			.then((res) => {
				if (res.length === 20) setCommentPage((prev) => prev + 1);
				return res;
			});

		setCommentList((prev) => [...prev, ...newCommentList]);
		return newCommentList;
	}, [authHttp, commentPage, selelctedComment]);

	const onClickSubbmit = useCallback(async () => {
		if (commentInput.trim() === '') return;

		try {
			await authHttp.post<HeulgitCommentWriteType>('e-comments/comments', {
				content: commentInput,
				eurekaId: selelctedComment,
				mentioedFollowers: mentionList,
				parentId: null,
			});
			setCommentInput('');
			setCommentList([]);
			loadCommentList();
		} catch (err) {
			console.error(err);
		}
	}, [
		authHttp,
		commentInput,
		selelctedComment,
		setCommentInput,
		loadCommentList,
	]);

	const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(
		['infiniteHeulgitFeed'],
		({ pageParam = 1 }) => loadFeedList(pageParam),
		{
			getNextPageParam: (lastPage, allPages) => {
				console.log('[allPage]', allPages);

				if (lastPage.length < 20) return;
				return allPages.length + 1;
			},
			staleTime: 600000,
		},
	);

	useEffect(() => {
		// endDate가 변경된 경우 달력 닫기
		if (endDate !== null) {
			setIsCalendarOpen(false);
		}
	}, [endDate]);

	useEffect(() => {
		console.log(endDate, startDate);
		refetch();
	}, [selelctedOption, selectedLanguage, endDate]);

	useEffect(() => {
		console.log('댓글 바텀시트', isCommentOpen);
	}, [isCommentOpen]);

	useEffect(() => {
		if (selelctedComment > 0) {
			setCommentList([]);
			loadCommentList();
		}
	}, [selelctedComment]);

	return (
		<>
			<Mobile>
				<MainPageMobile
					onClickHeulGit={onClickHeulGit}
					onClickStarSort={onClickStarSort}
					onClickLikeSort={onClickLikeSort}
					handleChangeCalendar={handleChangeCalendar}
					onClickComment={onClickComment}
					onClickOutsideCalendar={onClickOutsideCalendar}
					onClickClearCalendar={onClickClearCalendar}
					onClickClearLanguage={onClickClearLanguage}
					onClickLanguageChoiceButton={onClickLanguageChoiceButton}
					onClickLanguageCloseButton={onClickLanguageCloseButton}
					onClickLanguage={onClickLanguage}
					onClickNotification={onClickNotification}
					onClickGitMessage={onClickGitMessage}
					onClickSubbmit={onClickSubbmit}
					onHandleComment={onHandleComment}
					loadNextFeedList={fetchNextPage}
					handleClickCalendar={handleClickCalendar}
					setIsCommentOpen={setIsCommentOpen}
					setIsViewOptionOpen={setIsViewOptionOpen}
					isViewOptionOpen={isViewOptionOpen}
					dropDownRef={dropDownRef}
					calendarRef={calendarRef}
					selelctedOption={selelctedOption}
					selectedLanguage={selectedLanguage}
					startDate={startDate}
					endDate={endDate}
					isCalendarOpen={isCalendarOpen}
					isLanguageOpen={isLanguageOpen}
					isCommentOpen={isCommentOpen}
					selelctedComment={selelctedComment}
					feedList={data?.pages}
					hasMore={hasNextPage ? true : false}
					commentInput={commentInput}
					commentList={commentList}
				></MainPageMobile>
			</Mobile>
			<Tablet>
				<MainPageTablet feedList={feedList}></MainPageTablet>
			</Tablet>
			<PC>
				<MainPageWeb></MainPageWeb>
			</PC>
		</>
	);
};

export default MainPage;
