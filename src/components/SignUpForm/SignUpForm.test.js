import React,{useEffect} from 'react'
import { ApolloProvider } from '@apollo/react-hooks';
import * as rtl from '@testing-library/react'
import ApolloClient from 'apollo-boost';
import SignUpForm from './SignUpForm'
import GeneralSignUp from './GeneralSignUp'
import ExpSignUp from './ExpSignUp'


beforeEach(rtl.cleanup)
afterEach(rtl.cleanup)

async function wait(ms = 0) {
  await rtl.act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

test('is rendering', async () => {

    const getToken = () => {
        let token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : '';
    };

    const client = new ApolloClient({
        uri: 'https://quality-hub-gateway-staging.herokuapp.com/',
        request: operation => {
            operation.setContext({
                headers: {
                    Authorization: getToken(),
                },
            });
        },
    });
    
    rtl.render(
        <ApolloProvider client={client}>  
            <SignUpForm />
        </ApolloProvider> 
    );
    await wait();
})