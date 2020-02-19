import { gql } from "apollo-boost";

export const SIGN_UP = gql`
  mutation signup(
    $authId: String!
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $city: String!
    $state: String!
    $bio: String
    $personal_url: String
    $portfolio_url: String
    $twitter_url: String
    $linkedin_url: String
    $github_url: String
  ) {
    signup(
      authId: $authId
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      city: $city
      state: $state
      bio: $bio
      personal_url: $personal_url
      portfolio_url: $portfolio_url
      twitter_url: $twitter_url
      linkedin_url: $linkedin_url
      github_url: $github_url
    ) {
      user {
        first_name
        id
        authId
      }
    }
  }
`;

export const CREATE_CHATUSER = gql`
  mutation createChatUser($userName: String!, $userId: String!) {
    createChatUser(userName: $userName, userId: $userId)
  }
`;
