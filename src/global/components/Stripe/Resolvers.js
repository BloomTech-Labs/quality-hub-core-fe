import { gql } from 'apollo-boost';

export const PAYMENT = gql`
	mutation PAYMENT($amount: Int!, $currency: String, $source: String!, $coach: String!) {
		stripeDirectCharge(amount: $amount, currency: $currency, source: $source, coachId: $coach) {
			success
			error
		}
	}
`;
