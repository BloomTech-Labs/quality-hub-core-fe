import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { DENIED_REVIEWS_BY_SEEKER} from '../../Resolvers'

// Styling
import '../../subs/SeekerCard.scss'

// Global Imports
import Loading from '../../../../../global/components/Loading'
import { ICONS } from '../../../../../global/icons/iconConstants'
import Icon from '../../../../../global/icons/Icon'

//SVG
import ResumeQ2 from '../../../../../../src/global/icons/resumeQ2.svg'


const DeniedReviews = () => {

    const { refetch, loading, data } = useQuery(DENIED_REVIEWS_BY_SEEKER,{
        fetchPolicy: 'network-only'
    })

    console.log('DENIED data', data)

    return(
            <div>
                {!loading && (!data.deniedReviewsBySeeker.length && (

                <div>
                    <div>
                        <p>You currently have no accepted or denied reviews...</p>
                    </div>
                    <div className='resumeQ1'>
                        <img src={ResumeQ2} />
                    </div>
                </div>
                
                    ))}
                {loading && <Loading />}
                {!loading && data.deniedReviewsBySeeker && (
                    <div className="seeker-list">
                        {data.deniedReviewsBySeeker.map(denied => (

                            <div className="seeker-card">
                                <div className="seeker-header-container">
                                    <div className="seeker-card-header">
                                        <h2>{denied.seeker.first_name} {denied.seeker.last_name}</h2>
                                        <p>{denied.seeker.email}</p>
                                    </div>

                                    <div className='coach-photo'>
                                    {denied.seeker.image_url ? (
                                        <img src={denied.seeker.image_url} alt='Coach Profile Pic' />
                                    ) : (
                                            <div className='blank-image'>
                                                <Icon
                                                    icon={ICONS.BLANK_AVATAR}
                                                    color='white'
                                                    width={80}
                                                    height={90}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    </div>   
                                    <div>
                                        <p>Created: {denied.createdAt}</p>
                                        <p>Last Update:{denied.updatedAt}</p>
                                    </div>
                                    
                                    <div>
                                        <h3>Coach Info:</h3>
                                        <p>Name: {denied.coach.first_name} {denied.coach.last_name}</p>
                                        <p>Email: {denied.coach.email}</p>
                                    </div>
                                   
                            </div>
                        ))}
                    </div>
                )}
            </div>
    )
}


export default DeniedReviews