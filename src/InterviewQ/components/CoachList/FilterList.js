import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_INDUSTRIES = gql`
  query {
    industries {
      name
    }
  }
`;

const FilterList = ({ fields, setFields }) => {
  
  const { loading, error, data } = useQuery(GET_INDUSTRIES);

  const handleChange = e => {
    console.log(fields);
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  return (
    <form className="search-form" onChange={handleChange}>
      <input name="tag" placeholder="Search by keyword..." />
      <div>
        Price Range
        <select name="price">
          <option value="">Select a price</option>
          <option value="0, 20"> &lt; $20 </option>
          <option value="20, 50">$20 - $50</option>
          <option value="50, 80">$50 - $80 </option>
          <option value="80,"> > $80</option>
        </select>
        Industry
        <select name="industry">
          {data && data.industries.map(({name}) => <option value={name}>{name}</option>)}
          <option>Hi</option>
        </select>
        Order by
        <select name="orderBy">
          <option>Hi</option>
        </select>
      </div>
      <button className="search-button">Search</button>
    </form>
  );
};

export default FilterList;
