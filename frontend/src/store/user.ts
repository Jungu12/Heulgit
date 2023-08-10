import { UserType } from '@typedef/common.types';

// const GET_USER = 'user/GET_USER' as const;
const SET_USER = 'user/SET_USER' as const;

export const setUser = (user: UserType) => ({
	type: SET_USER,
	payload: user,
});

type UserAction = ReturnType<typeof setUser>;

type UserState = {
	user: UserType | null;
};

const initialState: UserState = {
	user: null,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const user = (state = initialState, action: UserAction): UserState => {
	switch (action.type) {
		case SET_USER:
			return {
				user: action.payload,
			};
		default:
			return state;
	}
};

export default user;
