import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from 'global-style';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		{/* <Provider store={store}> */}
		<App />
		{/* </Provider> */}
	</React.StrictMode>,
	document.getElementById('root'),
);
