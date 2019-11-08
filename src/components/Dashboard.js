import React, {useState, useEffect} from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import {useQuery, useLazyQuery} from '@apollo/react-hooks';


const EDIT_USER = gql`
mutation update(
    $first_name: String!,
    $last_name: String!, 
    $email: String!, 
    $password: String!, 
    $city: String!, 
    $state: String!,
    # $image: String,
    # $gender: String,
    # $personal_url: String,
    # $blog_url: String,
    # $linkedin_url: String,
    # $github_url: String,
    # $bio: String,
    ){
        update(
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            password: $password,
            city: $city,
            state: $state,
            # image: $image,
            # gender: $gender,
            # personal_url: $personal_url,
            # blog_url: $blog_url,
            # linkedin_url: $linkedin_url,
            # github_url: $github_url,
            # bio: $bio
        ) {
            token,
            user{
                id
            }
        }
    }`


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
` 
const Dashboard = () => {
    const userID = {
        id: null
    };
    const [getUser, {data: userData}] = useLazyQuery(GET_USER);
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            userID.id = localStorage.getItem('id');
            getUser();
        }
    }, [])

    const [userInfo, editUserInfo] = useState({
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        city: "",
        state: "",
        // image: "",
        // gender: "",
        // personal_url: "",
        // blog_url: "",
        // linkedin_url: "",
        // github_url: "",
        // bio: ""
    })

    const [user, userMutation] = useMutation(EDIT_USER);

    return (
        <div>
            DASHBOARD
        </div>
    );
}

export default Dashboard;