import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from 'global-style';
import App from './App';
import { Provider } from 'react-redux';
import rootReducer from './store';
import { createStore } from 'redux';

const store = createStore(rootReducer);

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
