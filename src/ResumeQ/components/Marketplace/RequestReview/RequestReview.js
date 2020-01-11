import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {CREATE_RESUME_REVIEW, GET_USER} from '../../Marketplace/Resolvers'

const RequestReview = props => {
   
    const seeker = useQuery(GET_USER)
    const coach = props.coach

    // const request = useMutation(CREATE_RESUME_REVIEW, {
        
    // });

    console.log(props.coachName)
    return (
        <div>
        </div>
    )
}

export default RequestReview