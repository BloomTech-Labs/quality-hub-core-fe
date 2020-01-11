import React from 'react'
import { useQuery } from '@apollo/react-hooks'


import EditListing from './EditListing'
import { GET_USER_LISTING } from './Resolvers'

const DashResumeQ = () => {
  const { data, loading } = useQuery(GET_USER_LISTING)
  // console.log(`loading`, loading)
  // console.log(`coachListing from query`, data)


  return (
    <div>
      <h4>RQ Dashboard</h4>

      {loading ? null : data && data.listingByReviewer ?
        (
          <EditListing />) :
        <h1>Not A Coach</h1>
      }
    </div>
  )
}


export default DashResumeQ
