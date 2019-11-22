import React, {useState,useEffect} from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import ProgressBar from './ProgressBar'
import CoachForm01 from './CoachForm01'
import CoachForm02 from './CoachForm02'
import CoachForm03 from './CoachForm03'
import CoachForm04 from './CoachForm04'
import CoachForm05 from './CoachForm05'

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_USER = gql`
    query {
        me {
            linkedin_url
            github_url
            personal_url
            portfolio_url
            twitter_url
            city
            state
        }
    }
`

const INDUSTRIES = gql`
    query {
        industries {
            name
        }
    }
`;


const CoachForm00 = () => {

    // for sure take this out soon // like as soon as auth0 happens
    useEffect(() => {
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrMnMxZmIydTAwNnYwNzczdjI4MmIza20iLCJlbWFpbCI6ImRhbkBxdWFpbC5jb20iLCJpYXQiOjE1NzQzNjM5NzUsImV4cCI6MTU3NDQwNzE3NX0.Ay63IqaVSQZmLgEjOEMOvb_NBQ0vLNepzn_NbaDsaMQ')
    })

    const {data, error} = useQuery(GET_USER)
    const {data: industriesData} = useQuery(INDUSTRIES)

    console.log(data)
    
    const [formState, setFormState] = useState({
      company: "",
      position: "",
      industry: "",
      description: "",
      city: "",
      state: "",
      price: ""
    });

    const [accounts, setAccounts] = useState({
      linkedin_url: '',
      linkedin_switch: false,
      github_url: '',
      github_switch: false,
      website_url: '',
      website_switch: false,
      portfolio_url: '',
      portfolio_switch: false,
      twitter_url: '',
      twitter_switch: false,
  });

    const [progress, setProgress] = useState(1) 

    useEffect (() => {
        console.log(formState)
    },[formState])

    const handleProgress = (e) => {
      e.preventDefault();
      if (e.target.value) {
        setProgress(prog => prog + 1)
      } else {
        setProgress(prog => prog - 1)
      }
    }

    return (
        <div>
            <ProgressBar progress={progress} />
            <Route exact path="/addcoach"
                render={props => (
                    <CoachForm01 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} setProgress={setProgress} industriesData={industriesData}/>
                )} 
            />
            <Route path="/addcoach/02"
                render={props => (
                    <CoachForm02 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} setProgress={setProgress}/>
                )} 
            />
            <Route path="/addcoach/03"
                render={props => (
                    <CoachForm03 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} accounts={accounts} setAccounts={setAccounts} setProgress={setProgress}/>
                )} 
            />
            <Route path="/addcoach/04"
                render={props => (
                    <CoachForm04 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} accounts={accounts} setAccounts={setAccounts} setProgress={setProgress}/>
                )} 
            />
            <Route path="/addcoach/05"
                render={props => (
                    <CoachForm05 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} setProgress={setProgress}/>
                )} 
            />
        </div>
    )
};

export default CoachForm00;