import React from 'react';
import { MockedProvider, ApolloProvider } from '@apollo/react-testing';
import { render, fireEvent, getByText } from '@testing-library/react';
// import wait from 'waait';

// Import component and query for testing
import App from '../../../App'
import CoachCard from './CoachCard';
import { act } from 'react-dom/test-utils';
import { GET_USER } from './CoachForm';

// Test React components by mocking calls to the GraphQL endpoint; this allows tests to be run in isolation and removes dependence on remote data
it('coach cards should render without error', () => {
     render(
        <MockedProvider mocks={[
            {
                request: {
                    query: GET_USER,
                },
                result: {
                    data: {
                        me: {
                            id: '1',
                            image_url: 'test',
                        },
                    },
                },
            },
        ]}>
            <CoachCard />
        </MockedProvider>
    )
});

// it('should succesfully post a new coach listing', async () => {
// 	const add = {
// 		company: 'Lambda',
// 		position: "TL",
// 		industry: "tech",
// 		description: "qwerty",
//         keywords: [],
//         price: 99,
// 	};
// 	const mocks = [
// 		{
// 			request: {
// 				query: ADD_USER,
// 				variables: {
//                     company: 'Lambda',
//                     position: "TL",
//                     industry: "tech",
//                     description: "qwerty",
//                     keywords: [],
//                     price: 99,
// 				},
// 			},
// 			result: { data: { add } },
// 		},
// 	];

// 	const component = render(
// 		<MockedProvider mocks={mocks} addTypename={false}>
// 			<CoachForm userKey={'id'} postrValue={add.first_name} />
// 		</MockedProvider>,
// 	);

// 	const editbutton = component.getByTestId('edit-button');
// 	fireEvent.click(editbutton);

// 	const savebutton = component.getByText(/save/i);
// 	fireEvent.click(savebutton);

// 	await wait(0);

// 	component.getByText('Dan');
// });