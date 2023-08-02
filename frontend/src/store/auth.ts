// 액션 타입 선언
const SET_TOKEN = 'auth/SET_TOKEN' as const;

// 액션 생성 함수
export const setToken = (token: string) => ({
	type: SET_TOKEN,
	payload: token,
});

// 모든 객체에 대한 타입 준비
type AuthAction = ReturnType<typeof setToken>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type AuthState = {
	token: string | null;
};

// 초기상태 선언
const initialState: AuthState = {
	token: null,
};

// 리듀서를 작성합니다.
// eslint-disable-next-line @typescript-eslint/default-param-last
export const auth = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
		case SET_TOKEN:
			return {
				token: action.payload,
			};
		default:
			return state;
	}
};

export default auth;
