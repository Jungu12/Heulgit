import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { styled } from 'styled-components';

const StyledBottomSheetContainer = styled.div`
	display: flex;
	z-index: 100;
	flex-direction: column;
`;

// const StyledContentContainer = styled.div`
// 	background-color: white;
// 	/* z-index: 100; */
// 	position: absolute;
// 	bottom: 0;
// `;

type Props = {
	open: boolean;
	onDismiss: () => void;
};

const CBottomSheet = ({ open, onDismiss }: Props) => {
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
				header={
					<h1 className="flex items-center text-xl justify-center font-bold text-gray-800">
						댓글시치~
					</h1>
				}
				footer={<input type="text" placeholder="입력창 시치~" />}
			>
				바텀시치
			</BottomSheet>
		</StyledBottomSheetContainer>
	);
};

export default CBottomSheet;
