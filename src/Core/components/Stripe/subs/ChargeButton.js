import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const createCharge= gql`
    mutation createCharge($source: String!, $email: String!) {
        createCharge(source: $source, email: $email) {
            id
            email
        }
    }
`;

export default function ChargeButton() {

    const [charge, error] = useMutation(createCharge)
    // const token = localStorage.getItem('token')
    // const { email } = jwt.verify(token, JWT_SECRET)
    return (
            //This is the button/modal where the user enters their card info and email.
            <StripeCheckout 
                token = {async token => {
                    // token is an object containing the Stripe Token (token.id)
                    // token.id is like saving a credit card to a user in the back-end
                    console.log(token)

                    charge({ variables: { 
                        source: token.id,
                        email: token.email
                    } })
                        .then(response => {
                            console.log(response)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }}
                stripeKey="pk_test_yP59PDrJaptb867ZCzVqoedq00f1OoVqtj"
            />

    )
}