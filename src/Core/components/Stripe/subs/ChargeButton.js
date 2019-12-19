import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default function ChargeButton() {
    return (
        //This is the button/modal where the user enters their card info and email.
        <StripeCheckout 
        token = {(token) => {
            // token is an object containing the Stripe Token (token.id)
            // token.id is like saving a credit card to a user in the back-end
            console.log(token)
        }}
        stripeKey="pk_test_33Vr8d8lQvI5B1z4TYuOQ2kF00ufosuuTA"
        />
    )
}

