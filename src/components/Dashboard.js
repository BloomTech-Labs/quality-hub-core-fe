import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

import UserPicture from './UserPicture';
import DashboardInput from './DashboardInput';

//GraphQuaiL Query
const GET_USER = gql`
  query {
    me {
      id
      first_name
      last_name
      email
      city
      state
      # image
      # gender
      # personal_url
      # blog_url
      # linkedin_url
      # github_url
      # bio
    }
  }
`;

//COMponent - <Ryan's accent>
const Dashboard = props => {
  const userID = {
    id: null,
  };

  const [getUser, { data: userData }] = useLazyQuery(GET_USER);
  const [editUser, setEditUser] = useState(userData);

  const [testEditingValue, setTestEditingValue] = useState({
    testname: 'Julie A',
  });
  const [testOriginalName, setTestOriginalName] = useState('Julie A');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      userID.id = localStorage.getItem('id');
      getUser();
    }
  }, []);

  useEffect(() => {
    setEditUser(userData);
  }, [userData]);

  let myArray = [];

  return (
    <div className='editform'>
      <UserPicture />
      {userData &&
        editUser &&
        Object.keys(userData.me).forEach(field => {
          myArray.push(field);
        })}
      {myArray.length > 0 &&
        myArray.map(item => {
          if (item !== 'id' && item !== '__typename') {
            return (
              <DashboardInput
                key={item}
                userKey={item}
                userValue={userData.me[item]}
              />
            );
          }
        })}
      <button className='danger'>Delete MEEEEE</button>
    </div>
  );
};

export default Dashboard;
