import { colors } from '@constants/colors';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import { styled } from 'styled-components';

const StyledCalendarContainer = styled.div`
	display: flex;
	position: fixed;
	top: 320px;
	left: 12px;
	z-index: 10;

	.react-datepicker__header {
		background-color: white;
		border-bottom: none;
		color: ${colors.primary.primatyDark};
	}
	.react-datepicker__navigation-icon::before {
		border-color: ${colors.primary.primaryLighten};
	}
	.react-datepicker__month {
		padding: 12px 8px;
		margin: 0;
		background-color: white;
	}
	.react-datepicker__month-text {
		padding: 8px 12px;
		font-weight: 500;
	}
	.react-datepicker__month-text--in-range {
		background-color: #8396be;
	}
	.react-datepicker__month-text--range-end {
		background-color: ${colors.primary.primary};
	}
	.react-datepicker__month-text--keyboard-selected {
		color: white;
		background-color: ${colors.primary.primary};
		font-weight: 700;
	}
`;

type Props = {
	startDate: Date | null;
	endDate: Date | null;
	onClickOutside: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	handleChangeCalendar: ([newStartDate, newEndDate]: [
		Date | null,
		Date | null,
	]) => void;
};

const CalendarTablet = ({
	startDate,
	endDate,
	onClickOutside,
	handleChangeCalendar,
}: Props) => {
	return (
		<StyledCalendarContainer>
			<ReactDatePicker
				selected={startDate}
				onChange={handleChangeCalendar}
				selectsRange
				startDate={startDate}
				endDate={endDate}
				dateFormat="MM/yyyy"
				showMonthYearPicker
				inline
				onClickOutside={onClickOutside}
			/>
		</StyledCalendarContainer>
	);
};

export default CalendarTablet;
