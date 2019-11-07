import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://example.com',
});

ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root'));
