import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_COACH_POST, UPDATE_POST } from '../Resolvers';

const CoachPostStatus = () => {
  const { loading, data: coachPost } = useQuery(GET_COACH_POST, {
		variables: { coach_id: localStorage.getItem('id') },
  });
  
  const [updatePost] = useMutation(UPDATE_POST)
  const [published, setPublished] = useState();

  useEffect(() => {
		if (coachPost) {
			setPublished(coachPost.postByCoach.isPublished)
		}
  }, [coachPost]);
  
  const handleSubmit = e => {
    e.preventDefault();
		updatePost({ variables: { id: coachPost.postByCoach.id, isPublished: !published } })
			.then(res => {
				setPublished(!published);
			})
			.catch(err => {
				console.log(err);
			});
	};
  
  return (
		<div className='coach-post-status'>
      <h2>Coach Post Status</h2>
      {!loading && 
        <div className='coach-post-status-row'>
          <p>Your coach post is currently {published ? 'published' : 'unpublished'}.</p>
          <button
            className='update-post-btn'
            onClick={handleSubmit}>
            {published ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      }
      {loading && null}
    </div>
  )
}

export default CoachPostStatus;