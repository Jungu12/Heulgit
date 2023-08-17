import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import ProfilePageMobile from './ProfilePageMobile';
import ProfilePageTablet from './ProfilePageTablet';
import ProfilePageWeb from './ProfilePageWeb';
import { styled } from 'styled-components';
import { authHttp } from '@utils/http';
import { ChatRoomType } from '@typedef/gm/gm.types';

const StyledProfile = styled.div`
	height: 100vh;

	overflow-y: auto;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

// const deleteKeysFromSession = (keys: string[]) => {
// 	keys.forEach((key) => sessionStorage.removeItem(key));
// };

const ProfilePage = () => {
	const navigation = useNavigate();
	const { userId } = useParams();

	const [selectedMenu, setSelectedMenu] = useState('프로필');
	const handleMenuClick = (menu: '프로필' | '유레카' | '자유') => {
		setSelectedMenu(menu);
		sessionStorage.setItem('selectedMenu', menu);
	};

	const onClickGM = useCallback(() => {
		authHttp.get<ChatRoomType>(`gm/room/access/${userId}`).then((res) => {
			navigation(`/gm/${res.roomId}`, { state: { room: res } });
		});
	}, []);

	// useEffect(() => {
	// 	// selectedMenu가 변경될 때마다 sessionStorage에 저장.
	// 	const categoryItem = sessionStorage.getItem('selectedMenu') as
	// 		| '프로필'
	// 		| '유레카'
	// 		| '자유';

	// 	if (categoryItem) {
	// 		setSelectedMenu(categoryItem);
	// 	} else {
	// 		setSelectedMenu('프로필');
	// 	}
	// }, []);

	return (
		<StyledProfile>
			<Mobile>
				<ProfilePageMobile
					handleMenuClick={handleMenuClick}
					onClickGM={onClickGM}
					navigation={navigation}
					selectedMenu={selectedMenu}
				/>
			</Mobile>
			<Tablet>
				<ProfilePageTablet
					handleMenuClick={handleMenuClick}
					navigation={navigation}
					selectedMenu={selectedMenu}
				/>
			</Tablet>
			<PC>
				<ProfilePageWeb
					handleMenuClick={handleMenuClick}
					navigation={navigation}
					selectedMenu={selectedMenu}
				/>
			</PC>
		</StyledProfile>
	);
};

export default ProfilePage;
