import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';

import { GET_INDUSTRIES } from './Search';

const mocks = [
	{
		request: {
			query: GET_INDUSTRIES,
		},
		result: {
			data: {
				industries: {
					industry: {
						id: '1',
						name: 'test industry',
					},
				},
			},
		},
	},
];

it('should render Industry label', () => {
	render(<label>Industry</label>);
});

it('should render Price label', () => {
	render(<label>Price</label>);
});

it('should render Sorts label', () => {
	render(<label>Sort results By</label>);
});

it('should render Keywords label', () => {
	render(<label>Keywordzz</label>);
});
