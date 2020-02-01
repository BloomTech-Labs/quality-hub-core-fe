import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { StripeProvider } from 'react-stripe-elements';
require('dotenv').config();


const getToken = () => {
	let token = localStorage.getItem('token');
	return token ? `Bearer ${token}` : '';
};


const federationURI = process.env.REACT_APP_FEDERATION_URI || `https://qhub-federation.herokuapp.com/`
const stripeKey = process.env.REACT_APP_STRIPE_KEY || 'stripe';

console.log("Federation URI", federationURI)

const cache = new InMemoryCache();

const client = new ApolloClient({
	uri: federationURI,
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
		<StripeProvider apiKey={stripeKey}>
			<Router>
				<App />
			</Router>
		</StripeProvider>
	</ApolloProvider>,
	document.getElementById('root'),
);
