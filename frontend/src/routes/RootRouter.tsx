import CommitEditPage from '@pages/CommitEditPage';
import CommunityPage from '@pages/CommunityPage';
import LoginPage from '@pages/LoginPage';
import MainPage from '@pages/MainPage';
import MyActivityPage from '@pages/MyActivityPage';
import MyLikePostPage from '@pages/MyLikePostPage';
import MyLikeRepoPage from '@pages/MyLikeRepoPage';
import NotFound from '@pages/NotFound';
import NotificationPage from '@pages/NotificationPage';
import ProfilePage from '@pages/ProfilePage';
import RepoViewPage from '@pages/RepoViewPage';
import SearchPage from '@pages/SearchPage';
import SearchResultPage from '@pages/SearchResultPage';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEurekaPostPage from '@pages/CreateEurekaPostPage';
import FreePostViewPage from '@pages/FreePostViewPage';
import CreateFreePostPage from '@pages/CreateFreePostPage';
import EurekaPostViewPage from '@pages/EurekaPostViewPage';
import LanguageSearchPage from '@pages/LanguageSearchPage';

const RootRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />}></Route>
				<Route path="/profiles">
					<Route index element={<NotFound />}></Route>
					<Route path=":userId">
						<Route index element={<ProfilePage />}></Route>
						<Route path="activity" element={<MyActivityPage />}></Route>
						<Route path="like" element={<MyLikePostPage />}></Route>
						<Route path="like-repo" element={<MyLikeRepoPage />}></Route>
						<Route path="like-post" element={<MyLikePostPage />}></Route>
						<Route path="commit-edit" element={<CommitEditPage />}></Route>
					</Route>
				</Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/community">
					<Route index element={<CommunityPage />}></Route>
					<Route path="eureka/post" element={<CreateEurekaPostPage />}></Route>
					<Route path="free/post" element={<CreateFreePostPage />}></Route>
					<Route path="eureka/:id" element={<EurekaPostViewPage />}></Route>
					<Route path="free/:id" element={<FreePostViewPage />}></Route>
				</Route>
				<Route path="/notification" element={<NotificationPage />}></Route>
				<Route path="/repo">
					<Route index element={<NotFound />}></Route>
					<Route path="language" element={<LanguageSearchPage />}></Route>
					<Route path=":repoId" element={<RepoViewPage />}></Route>
				</Route>
				<Route path="/search">
					<Route index element={<SearchPage />}></Route>
					<Route path=":q" element={<SearchResultPage />}></Route>
				</Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RootRouter;
