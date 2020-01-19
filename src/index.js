import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
require('dotenv').config();

<<<<<<< HEAD

=======
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665
const getToken = () => {
	let token = localStorage.getItem('token');
	return token ? `Bearer ${token}` : '';
};

<<<<<<< HEAD

const federationURI = process.env.REACT_APP_FEDERATION_URI || `https://qhub-federation.herokuapp.com/`

console.log(`FEDERATION_URI`, federationURI)


const cache = new InMemoryCache();

const client = new ApolloClient({
	uri: federationURI,
=======
const cache = new InMemoryCache();

const client = new ApolloClient({
	//https://quality-hub-gateway-staging.herokuapp.com/
	uri: 'https://quality-hub-gateway.herokuapp.com/',
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665
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
