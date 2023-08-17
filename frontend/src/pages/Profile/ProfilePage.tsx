import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfilePageMobile from './ProfilePageMobile';
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

const ProfilePage = () => {
	const navigation = useNavigate();
	const { userId } = useParams();

	const [selectedMenu, setSelectedMenu] = useState('프로필');
	const handleMenuClick = (menu: '프로필' | '유레카' | '자유') => {
		setSelectedMenu(menu);
	};

	const onClickGM = useCallback(() => {
		authHttp.get<ChatRoomType>(`gm/room/access/${userId}`).then((res) => {
			navigation(`/gm/${res.roomId}`, { state: { room: res } });
		});
	}, []);

	return (
		<StyledProfile>
			<ProfilePageMobile
				handleMenuClick={handleMenuClick}
				onClickGM={onClickGM}
				navigation={navigation}
				selectedMenu={selectedMenu}
			/>
		</StyledProfile>
	);
};

export default ProfilePage;
