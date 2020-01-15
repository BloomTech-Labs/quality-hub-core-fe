import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
require('dotenv').config();

const getToken = () => {
	let token = localStorage.getItem('token');
	return token ? `Bearer ${token}` : '';
};

const cache = new InMemoryCache();

const client = new ApolloClient({
	uri: process.env.REACT_APP_FEDERATION_URI,
	request: operation => {
		operation.setContext({
			headers: {
				Authorization: getToken(),
			},
		});
	},
	cache,
	resolvers: {},
});

cache.writeData({
	data: {
		isLoggedIn: !!localStorage.getItem('token'), // Logic needs update
		isCoach: false, // Needs update
	},
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>,
	document.getElementById('root'),
);
