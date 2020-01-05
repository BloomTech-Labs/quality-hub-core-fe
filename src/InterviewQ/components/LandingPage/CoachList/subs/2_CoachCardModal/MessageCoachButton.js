import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { startDM, getRooms } from '../../../../../../Core/components/Messaging/methods';
import { GET_USER } from '../../../Resolvers';
import { useHistory } from 'react-router-dom';

const MessageCoachButton = ({ post, coach }) => {

  const [fullname, setFullname] = useState();
  const [chatList, setChatList] = useState();
  const { data } = useQuery(GET_USER)
  const history = useHistory();
  const userId = localStorage.getItem('id');
  const chatArray = [];

  useEffect(() => {
    getRooms(setChatList);
  }, [])

  useEffect(()=> {
    if(chatList){
      chatList.forEach(chat => chatArray.push(chat.id))
    }
  }, [chatList])

  useEffect(() => {
    if (data){
      setFullname(`${data.me.first_name} ${data.me.last_name}`)
    }
  }, [data])

  const messageCoach = () => {
		if (
			chatArray.includes(
				`${coach.id}-${userId}` || chatArray.includes(`${userId}-${coach.id}`),
			)
		) {
			history.push('/interviewq/inbox');
		} else {
			startDM(
				`${post.coach.first_name} ${post.coach.last_name}`,
				coach.id,
        fullname,
        history
			);
		}
  };
  
return(
  <button onClick={()=> messageCoach()}>Questions? Send {`${post.coach.first_name}`} a message</button>
  )
}

export default MessageCoachButton;