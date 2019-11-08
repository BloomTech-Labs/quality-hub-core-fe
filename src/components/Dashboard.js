import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

const EDIT_USER = gql`
  mutation update(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $city: String!
    $state: String! # $image: String, # $gender: String,
  ) # $personal_url: String,
  # $blog_url: String,
  # $linkedin_url: String,
  # $github_url: String,
  # $bio: String,
  {
    update(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      city: $city
      state: $state # image: $image, # gender: $gender,
    ) # personal_url: $personal_url,
    # blog_url: $blog_url,
    # linkedin_url: $linkedin_url,
    # github_url: $github_url,
    # bio: $bio
    {
      token
      user {
        id
      }
    }
  }
`;

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
const Dashboard = props => {
  const userID = {
    id: null,
  };

  const [user, userMutation] = useMutation(EDIT_USER);
  const [getUser, { data: userData }] = useLazyQuery(GET_USER);
  const [editUser, setEditUser] = useState(userData);
  const [editing, setEditing] = useState(false);
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

  const [userInfo, editUserInfo] = useState({
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    city: '',
    state: '',
    // image: "",
    // gender: "",
    // personal_url: "",
    // blog_url: "",
    // linkedin_url: "",
    // github_url: "",
    // bio: ""
  });

  const handleChange = e => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleTestChange = e => {
    setTestEditingValue({
      ...testEditingValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleTestCancelEdit = e => {
    setEditing(false);
    setTestEditingValue({
      ...testEditingValue,
      testname: testOriginalName,
    });
  };

  const acceptTestEdit = e => {
    console.log('accept');
    console.log(testOriginalName);
    setTestOriginalName(testEditingValue.testname);
    console.log(testOriginalName);
    setEditing(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    user({ variables: user })
      .then(results => {
        console.log(results);
        let token = localStorage.token;
        //   loginStatus.error = null;
        props.history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
    console.log(user);
  };
  console.log(userData);
  return (
    <div className='editform'>
      {editing ? (
        <input
          name='testname'
          value={testEditingValue.testname}
          onChange={handleTestChange}
        />
      ) : (
        testOriginalName
      )}
      {editing && (
        <button
          onClick={() => handleTestCancelEdit()}
          className='cancel-button'>
          X
        </button>
      )}
      {editing && (
        <button onClick={() => acceptTestEdit()} className='accept-button'>
          &#x2713;
        </button>
      )}
      {!editing && <button onClick={() => setEditing(true)}>EDIT</button>}

      {/* <form onSubmit={handleSubmit}>
            <input
            name="first_name"
            placeholder= {userData.first_name}
            onChange={handleChange}
            value = {editUser.first_name}
            />
             <input
            name="last_name"
            placeholder= {userData.last_name}
            onChange={handleChange}
            value= {editUser.last_name}
            />
            <input
            name="email"
            placeholder= {userData.email}
            onChange={handleChange}
            value= {editUser.email}
            />
            <input
            name="city"
            placeholder= {userData.city}
            onChange={handleChange}
            value= {editUser.city}
            />
            <input
            name="state"
            placeholder= {userData.state}
            onChange={handleChange}
            value={editUser.state}
            />
            <button type='submit'>Submit </button>
            </form> */}
    </div>
  );
};

export default Dashboard;
