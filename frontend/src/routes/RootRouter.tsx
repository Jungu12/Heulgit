import CommitEditPage from '@pages/CommitEditPage';
import CommunityPage from '@pages/community/CommunityPage';
import LoginPage from '@pages/Login/LoginPage';
import MyActivityPage from '@pages/MyActivity/MyActivityPage';
import MyLikePostPage from '@pages/MyActivity/MyLikePostPage';
import MyLikeRepoPage from '@pages/MyActivity/MyLikeRepoPage';
import MyCommentPage from '@pages/MyActivity/MyCommentPage';
import NotFound from '@pages/NotFound';
import NotificationPage from '@pages/NotificationPage';
import ProfilePage from '@pages/Profile/ProfilePage';
import RepoViewPage from '@pages/RepoViewPage';
import SearchPage from '@pages/SearchPage';
import SearchResultPage from '@pages/SearchResultPage';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateEurekaPostPage from '@pages/CreateEurekaPostPage';
import FreePostViewPage from '@pages/freeboard/FreePostViewPage';
import CreateFreePostPage from '@pages/freeboard/CreateFreePostPage';
import EurekaPostViewPage from '@pages/Eureka/EurekaPostViewPage';
import LoginCallBackPage from '@pages/LoginCallBackPage';
import EurekaPage from '@pages/Eureka/EurekaPage';
import FreeBoardPage from '@pages/freeboard/FreeBoardPage';
import LikeViewPage from '@pages/LikeViewPage';
import ChatDirectPage from '@pages/ChatDirectPage';
import ChatPage from '@pages/ChatPage';
import MainPage from '@pages/Main/MainPage';
import PrivateRoutes from './PrivateRoutes';
import EditEurekaPostPage from '@pages/Eureka/EditEurekaPostPage';
import FollowingPage from '@pages/FollowingPage';
import FollowerPage from '@pages/FollowerPage';
import EditFreeBoardPostPage from '@pages/freeboard/EditFreeBoardPostPage';

const RootRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/oauth/github" element={<LoginCallBackPage />}></Route>
				<Route element={<PrivateRoutes redirectTo="/login" />}>
					<Route path="/" element={<MainPage />}></Route>
					<Route path="/profiles">
						<Route index element={<NotFound />}></Route>
						<Route path=":userId">
							<Route index element={<ProfilePage />}></Route>
							<Route path="activity" element={<MyActivityPage />}></Route>
							{/* <Route path="like" element={<MyLikePostPage />}></Route> */}
							<Route path="like-repo" element={<MyLikeRepoPage />}></Route>
							<Route path="like-post" element={<MyLikePostPage />}></Route>
							<Route path="comment" element={<MyCommentPage />}></Route>
							<Route path="commit-edit" element={<CommitEditPage />}></Route>
							<Route path="following" element={<FollowingPage />}></Route>
							<Route path="follower" element={<FollowerPage />}></Route>
						</Route>
					</Route>
					<Route path="/community" element={<CommunityPage />}>
						<Route index element={<Navigate replace to="eureka" />} />
						<Route path="eureka" element={<EurekaPage />}></Route>
						<Route path="free" element={<FreeBoardPage />}></Route>
					</Route>
					<Route
						path="/community/eureka/post"
						element={<CreateEurekaPostPage />}
					></Route>
					<Route
						path="/community/free/post"
						element={<CreateFreePostPage />}
					></Route>
					<Route
						path="/community/eureka/:id"
						element={<EurekaPostViewPage />}
					></Route>
					<Route
						path="/community/eureka/:id/edit"
						element={<EditEurekaPostPage />}
					></Route>
					<Route
						path="/community/eureka/:id/like"
						element={<LikeViewPage />}
					></Route>
					<Route
						path="/community/free/:id"
						element={<FreePostViewPage />}
					></Route>
					<Route
						path="/community/free/:id/edit"
						element={<EditFreeBoardPostPage />}
					></Route>
					<Route
						path="/community/free/:id/like"
						element={<LikeViewPage />}
					></Route>
					<Route path="/notification" element={<NotificationPage />}></Route>
					<Route path="/gm">
						<Route index element={<ChatPage />}></Route>
						<Route path=":id" element={<ChatDirectPage />}></Route>
					</Route>
					<Route path="/repo">
						<Route index element={<NotFound />}></Route>
						<Route path=":repoId" element={<RepoViewPage />}></Route>
						<Route path=":id/like" element={<LikeViewPage />}></Route>
					</Route>
					<Route path="/search">
						<Route index element={<SearchPage />}></Route>
						<Route path=":q" element={<SearchResultPage />}></Route>
					</Route>
					<Route path="*" element={<NotFound />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RootRouter;
