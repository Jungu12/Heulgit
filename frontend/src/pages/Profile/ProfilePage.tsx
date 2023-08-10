import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import ProfilePageMobile from './ProfilePageMobile';
import ProfilePageTablet from './ProfilePageTablet';
import ProfilePageWeb from './ProfilePageWeb';
import { styled } from 'styled-components';

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

	const [selectedMenu, setSelectedMenu] = useState('');
	const handleMenuClick = (menu: '프로필' | '유레카' | '자유') => {
		setSelectedMenu(menu);
		sessionStorage.setItem('selectedMenu', menu);
	};

	// const onClickGM = useCallback(
	// 	() => {

	// 	},
	// 	[],
	// )

	useEffect(() => {
		// selectedMenu가 변경될 때마다 sessionStorage에 저장.
		const categoryItem = sessionStorage.getItem('selectedMenu') as
			| '프로필'
			| '유레카'
			| '자유';

		if (categoryItem) {
			setSelectedMenu(categoryItem);
		} else {
			setSelectedMenu('프로필');
		}
	}, []);

	// // 페이지 이동 시 세션 삭제 -> 다시 해당 페이지 이동 시 첫 화면 보이도록
	// useEffect(() => {
	// 	const keysToDelete = ['selectedMenu', 'selectedFollow'];

	// 	if (window.location.pathname === '/profiles/1') {
	// 		deleteKeysFromSession(keysToDelete);
	// 	}
	// }, []);

	return (
		<StyledProfile>
			<Mobile>
				<ProfilePageMobile
					handleMenuClick={handleMenuClick}
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
