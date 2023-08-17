import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from 'global-style';
import App from './App';
import { Provider } from 'react-redux';
import store from '@store/store';
// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<GlobalStyle />
			<Provider store={store}>
				<App />
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
