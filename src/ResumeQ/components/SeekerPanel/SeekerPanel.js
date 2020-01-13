import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import Loading from '../../../global/components/Loading';
import AcceptedReviews from './subs/AcceptedReviews'
import { RESUME_REVIEWS_BY_SEEKER } from './Resolvers'

const SeekerPanel = ({ history }) => {

    const [accepted, setAccepted] = useState({
        isAccepted: false
    })

    const { refetch, loading, data } = useQuery(RESUME_REVIEWS_BY_SEEKER, {
        fetchPolicy: 'network-only'
    });

    console.log('Seeker history', history)
    console.log('Seeker data', data)
    console.log('Seeker loading', loading)

    return (
        // <div>
        //     {!loading && console.log(data) ?
        //     (
        //         <AcceptedReviews 
        //            accepted={accepted}
        //            setAccepted={setAccepted}
        //     />) :
        //     <h1>Currently there are no accepted reviews</h1>
        //     }
        // </div>

        <div>

        {loading && <Loading />}
        {!loading && data && (
          <div>
            {data.resumeReviewsBySeeker.map(reviews => (
              <AcceptedReviews 
                key={reviews.id} 
                reviews={reviews}
                accepted={accepted}
                setAccepted={setAccepted}
              />
            )
            )}
          </div>
        )}
      </div>
    )
}

export default SeekerPanel