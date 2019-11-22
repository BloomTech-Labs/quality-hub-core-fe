import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import './Search.scss';

const GET_INDUSTRIES = gql`
  query {
    industries {
      name
    }
  }
`;


export default function Search({fields, setFields}) {
	const { loading, error, data } = useQuery(GET_INDUSTRIES);
	const [company, setCompany] = useState();
	
	const handleChange = (e) => {
		console.log(fields);
		e.preventDefault();
		setFields({ ...fields, [e.target.name]: e.target.value });
	};

	return (
		<div className='search-dropdowns'>
			<div className='search-field'>
				{/* <label htmlFor='sign-up-state'>Company*</label> */}
				<label>Industry</label>
				<select
					onBlur={() => setCompany(true)}
					name='industry'
					placeholder='Industry'
					onChange={handleChange}
					required>
					<option value="">All</option>
					{data && data.industries.map(({name}) => <option value={name}>{name}</option>)}
				</select>
			</div>
			<div className='search-field'>
				<label>Price</label>
				<select
					onBlur={() => setCompany(true)}
					name='price'
					placeholder='Price'
					onChange={handleChange}
					required>
					<option value=''>All</option>
					<option value='0, 20'>$0-$20</option>
					<option value='21, 50'>$21-$50</option>
					<option value='51, 80'>$51-$80</option>
					<option value='81, 100'>$81-$100</option>
					<option value='101,'> > $100~</option>
				</select>
			</div>
      <div className='search-field'>
				<label>Sort results by</label>
				<select
					onBlur={() => setCompany(true)}
					name='orderBy'
					placeholder='Order By'
					onChange={handleChange}
					required>
          <option value="">None</option>
					<option value="">Most reviews</option>
          <option value="">Least reviews</option>
          <option value="price_ASC">Price, low to high</option>
          <option value="price_DESC">Price, high to low</option>
          <option value="">Newest</option>
          <option value="">Oldest</option>
				</select>
			</div>
			<div className='search-field-keyword'>
				<label>Keywords</label>
				<input type='text' name="tag" onChange={handleChange} placeholder='Search by Keyword' />
			</div>
			<button className='search-reset'>Reset Filters</button>
			<button className='search-apply'>Apply</button>
		</div>
	);
}
