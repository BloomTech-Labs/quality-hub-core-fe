import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { startDM, getRooms } from '../../../../../../Core/components/Messaging/methods';
import { GET_USER } from '../../../Resolvers';
import { useHistory } from 'react-router-dom';
import { message } from '../../../../../../global/icons/message';

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
    console.log(chatArray)
		// if (
		// 	chatArray.includes(
		// 		`${coach.id}-${userId}`) || chatArray.includes(`${userId}-${coach.id}`)
		// 	)
		//  {
		// 	history.push({
		// 		pathname: '/interviewq/inbox',
		// 		state: {
		// 			createdChannel: {
		// 				name: `${fullname}-${post.coach.first_name} ${post.coach.last_name}`,
    //         id: `${userId}-${coach.id}`,
    //         createdByUserId: `${userId}`,
    //         displayName: `${post.coach.first_name} ${post.coach.last_name}`
		// 			},
		// 		},
    //   });

    //   return
		// } else {
      if (
        chatArray.includes(
          `${coach.id}-${userId}`)
        )
       {
        history.push({
          pathname: '/interviewq/inbox',
          state: {
            createdChannel: {
              name: `${fullname}-${post.coach.first_name} ${post.coach.last_name}`,
              id: `${coach.id}-${userId}`,
              createdByUserId: `${userId}`,
              displayName: `${post.coach.first_name} ${post.coach.last_name}`
            },
          },
        });
  
        return
      } else if (chatArray.includes(`${userId-coach.id}`)) {
        history.push({
          pathname: '/interviewq/inbox',
          state: {
            createdChannel: {
              name: `${fullname}-${post.coach.first_name} ${post.coach.last_name}`,
              id: `${userId}-${coach.id}`,
              createdByUserId: `${userId}`,
              displayName: `${post.coach.first_name} ${post.coach.last_name}`
            },
          },
        });

      } else {
			startDM(
				`${post.coach.first_name} ${post.coach.last_name}`,
				coach.id,
        fullname,
        history,
			);
		}
  };
  
return(
  // <button onClick={()=> messageCoach()}>Questions? Send {`${post.coach.first_name}`} a message</button>
  <div className='message-icon'  onClick={()=> messageCoach()}>{message()}</div>
  )
}

export default MessageCoachButton;