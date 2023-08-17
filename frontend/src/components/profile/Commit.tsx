import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import { images } from '@constants/images';

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

const StyledTagType = styled.div`
	display: flex;
	align-items: center;
	border-radius: 15px;
	background-color: ${colors.primary.primary};
	color: white;
	padding: 8px 15px;
	font-size: 12px;
	margin-right: auto;
`;

const StyledDescription = styled.div`
	display: flex;
	align-items: center;
	color: ${colors.primary.primary};
	font-weight: bold;
	margin: 5px 0px;
`;

const StyledDeleteButton = styled.button`
	cursor: pointer;
	color: ${colors.primary.primatyDark};
	background-color: transparent;
	width: 30px;
	border: 0px;
	font-weight: bold;

	img {
		height: 16px;
		width: 16px;
	}
`;

type Props = {
	type: string;
	description: string;
	onClickDeleteButton?: () => void;
};

const CommitTag = ({ type, description, onClickDeleteButton }: Props) => {
	const navigation = useNavigate();

	return (
		<StyledCommitTag>
			<CommitDescription>
				<StyledTagType>{type}</StyledTagType>
				<StyledDescription>{description}</StyledDescription>
			</CommitDescription>
			<StyledDeleteButton
				onClick={
					onClickDeleteButton ??
					(() => {
						navigation('');
					})
				}
			>
				<img src={images.profile.deleteIcon} alt="삭제" />
			</StyledDeleteButton>
		</StyledCommitTag>
	);
};

export default CommitTag;
