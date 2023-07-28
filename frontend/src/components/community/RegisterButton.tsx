import { colors } from '@constants/colors';
import React from 'react';
import { styled } from 'styled-components';

// 비활성화된 버튼 상태
const StyledRegisterButton = styled.button<{ disabled: boolean }>`
	border: none;
	background-color: transparent;
	color: ${colors.greyScale.grey4};

	margin-right: 30px;

	font-size: 14px;
	font-weight: 500;

	/* 활성화 상태에 대한 추가적인 스타일 */
	${({ disabled }) =>
		!disabled &&
		`
    color: ${colors.primary.primatyDark};
    background-color: transparent;
  `}
`;

type Props = {
	onClick: () => void;
	disabled: boolean;
};

const RegisterButton = ({ onClick, disabled }: Props) => {
	return (
		<StyledRegisterButton onClick={onClick} disabled={disabled}>
			등록
		</StyledRegisterButton>
	);
};

export default RegisterButton;
