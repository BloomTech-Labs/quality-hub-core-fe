import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { startDM } from '../../../../../../Core/components/Messaging/methods';
import { GET_USER } from '../../../Resolvers';
import { useHistory } from 'react-router-dom';

const MessageCoachButton = ({ post, coach }) => {

  const { data } = useQuery(GET_USER)
  const fullname = data && `${data.me.first_name} ${data.me.last_name}`
  const history = useHistory()

  const messageCoach = () => {
    startDM(`${post.coach.first_name} ${post.coach.last_name}`, coach.id, fullname)
     history.push('/interviewq/inbox')
  }
return(
  <button onClick={()=> messageCoach()}>Questions? Send {`${post.coach.first_name}`} a message</button>
  )
}

export default MessageCoachButton;