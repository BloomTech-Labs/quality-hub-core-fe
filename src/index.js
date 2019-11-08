import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'https://quality-hub-core-staging.herokuapp.com/',
});



ReactDOM.render(
    <ApolloProvider client={client}>
    <Router>
        <App />
    </Router>
    </ApolloProvider>
    , document.getElementById('root'));
