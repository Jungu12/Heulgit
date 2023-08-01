import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';

const StyledCommitTag = styled.div`
	display: flex;
	justify-content: space-between;
	border: 1px solid ${colors.primary.primary};
	border-radius: 15px;
	width: 100%;
	padding: 10px;
	margin: 5px;
	/* background-color: ${colors.primary.primary}; */
	background-color: white;
`;

const CommitDescription = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

// interface StyledTagTitleProps {
// 	titleWidth: number;
// }

// const StyledTagTitle = styled.div<StyledTagTitleProps>`
const StyledTagTitle = styled.div`
	display: flex;
	align-items: center;
	border-radius: 15px;
	background-color: ${colors.primary.primary};
	color: white;
	padding: 8px 15px;
	font-size: 12px;
	margin-right: auto;
`;
// width: ${(props) => props.titleWidth}px;

const StyledDetail = styled.div`
	display: flex;
	align-items: center;
	color: ${colors.primary.primary};
	font-weight: bold;
	margin: 5px 0px;
`;

const StyledDeleteButton = styled.button`
	color: ${colors.primary.primatyDark};
	background-color: transparent;
	width: 30px;
	border: 0px;
	font-weight: bold;
`;

type Props = {
	title: string;
	detail: string;
	onClickDeleteButton?: () => void;
};

const CommitTag = ({ title, detail, onClickDeleteButton }: Props) => {
	const navigation = useNavigate();

	// const titleWidth = 24 + title.length * 5;

	return (
		<StyledCommitTag>
			<CommitDescription>
				{/* <StyledTagTitle titleWidth={titleWidth}>{title}</StyledTagTitle> */}
				<StyledTagTitle>{title}</StyledTagTitle>
				<StyledDetail>{detail}</StyledDetail>
			</CommitDescription>
			<StyledDeleteButton
				onClick={
					onClickDeleteButton ??
					(() => {
						navigation('');
					})
				}
			>
				X
			</StyledDeleteButton>
		</StyledCommitTag>
	);
};

export default CommitTag;
