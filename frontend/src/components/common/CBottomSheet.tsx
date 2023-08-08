import CommentInput from '@components/Home/CommentInput';
import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { styled } from 'styled-components';

const StyledBottomSheetContainer = styled.div`
	display: flex;
	z-index: 100;
	flex-direction: column;
`;

const StyledTitle = styled.h1`
	font-weight: 700;
	font-size: 16px;
	margin-bottom: 4px;
`;

// const StyledContentContainer = styled.div`
// 	background-color: white;
// 	/* z-index: 100; */
// 	position: absolute;
// 	bottom: 0;
// `;

type Props = {
	open: boolean;
	children: React.ReactNode;
	onDismiss?: () => void;
};

const CBottomSheet = ({ open, onDismiss, children }: Props) => {
	return (
		<StyledBottomSheetContainer>
			<BottomSheet
				className="comment-bottom-sheet"
				open={open}
				onDismiss={onDismiss}
				skipInitialTransition
				expandOnContentDrag={open}
				defaultSnap={({ snapPoints, lastSnap }) =>
					lastSnap ?? Math.min(...snapPoints)
				}
				snapPoints={({ maxHeight }) => [
					maxHeight - maxHeight / 30,
					maxHeight / 4,
					maxHeight * 0.6,
				]}
				header={<StyledTitle>댓글</StyledTitle>}
				footer={<CommentInput />}
			>
				{children}
			</BottomSheet>
		</StyledBottomSheetContainer>
	);
};

export default CBottomSheet;
