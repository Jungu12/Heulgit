import { combineReducers } from 'redux';
import counter from './counter';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
	counter,
	auth,
	user,
});

// 루트 리듀서를 내보내주세요.
export default rootReducer;

// 루트 리듀서의 반환값를 유추해줍니다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>;
