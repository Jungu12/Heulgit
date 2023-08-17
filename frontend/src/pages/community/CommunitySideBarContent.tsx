import { colors } from '@constants/colors';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

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

const Empty = styled.div`
	height: 32px;
`;

type Props = {
	onClickClose: () => void;
};

const CommunitySideBarContent = ({ onClickClose }: Props) => {
	const navigation = useNavigate();
	// 정렬 필터
	const [seletedSortType, setSeletedSortType] = useState('전체보기');
	// 카테고리 필터
	const [seletedCategoryType, setseletedCategoryType] = useState('유레카');

	// 정렬 미선택시 기본
	const onClickNoSortButton = useCallback(() => {
		setSeletedSortType('전체보기');
	}, []);

	// 좋아요 많은 순
	const onClickLikeSortButton = useCallback(() => {
		setSeletedSortType('좋아요');
	}, []);

	// 댓글 많은 순
	const onClickStarSortButton = useCallback(() => {
		setSeletedSortType('댓글');
	}, []);

	// 조최 순
	const onClickViewButton = useCallback(() => {
		setSeletedSortType('조회');
	}, []);

	// 카테고리 미선택시 기본 - 유레카
	const onClickNoCategoryButton = useCallback(() => {
		setseletedCategoryType('유레카');
		navigation('/community/eureka');
	}, []);

	// 자유 게시판
	const onClickFreeBoardButton = useCallback(() => {
		setseletedCategoryType('자유게시판');
		navigation('/community/free');
	}, []);

	return (
		<StyledSideBarContent>
			<StyledHeader>
				<div>Filter</div>
				<StyledCloseArea onClick={onClickClose}>close</StyledCloseArea>
			</StyledHeader>

			<StyledContentBody>
				<StyledSubTitle>커뮤니티</StyledSubTitle>
				<StyledCommonContent
					isSelected={seletedCategoryType === '유레카'}
					onClick={onClickNoCategoryButton}
				>
					유레카
				</StyledCommonContent>

				<StyledCommonContent
					isSelected={seletedCategoryType === '자유게시판'}
					onClick={onClickFreeBoardButton}
				>
					자유게시판
				</StyledCommonContent>

				<Empty />

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
					isSelected={seletedSortType === '댓글'}
					onClick={onClickStarSortButton}
				>
					댓글 많은 순
				</StyledCommonContent>
				<StyledCommonContent
					isSelected={seletedSortType === '조회'}
					onClick={onClickViewButton}
				>
					조회 순
				</StyledCommonContent>
			</StyledContentBody>
		</StyledSideBarContent>
	);
};

export default CommunitySideBarContent;
