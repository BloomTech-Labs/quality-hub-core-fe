import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatList from './ChatList';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator } from './config';
import { startDM, connectToRoom, getRooms } from './methods.js';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_QH_USER, CREATE_CHATUSER } from './resolvers';
import './Messaging.scss';

const Inbox = () => {

  const {data: qhUser} = useQuery(GET_QH_USER);
  
  const [convList, setConvList] = useState();
  const [currentRoom, setCurrentRoom] = useState('none');

  const chatManager = new ChatManager({
    instanceLocator,
    userId: localStorage.getItem('id') ? localStorage.getItem('id') : 'none',
    tokenProvider: new TokenProvider({
      url: tokenUrl
    })
  })

  // const getRooms = () => {
  //   chatManager.connect({
  //     onAddedToRoom: room => {
  //       console.log(room)
  //     }
  //   }).then(currentUser => {
  //     console.log(currentUser.rooms)
  //     setConvList(currentUser.rooms.map(channel => {
  //       return { name: channel.name, id: channel.id }
  //     }))
  //   })
  // }
  console.log(convList)
  

    useEffect(() => {
      getRooms(setConvList);
      console.log(getRooms);
    }, [])

    const sendMessage = (text, roomId) => {
      chatManager.connect()
    .then(currentUser => {
      console.log(currentUser)
      currentUser.sendMessage({
        text: text,
        roomId: roomId
      })
    })
  }



  //   // console.log(chatLog)

      return(
    <div className='inbox-container'>
      <aside className="inbox-left-sidebar">
        {convList && <ChatList convList={convList} setCurrentRoom={setCurrentRoom} />}
      </aside>
            <section className="chat-screen">
              <header className="chat-header"></header>
              <ul className="chat-messages" id='message-list-div'>
              </ul>
              <div className="chat-footer">
              {currentRoom === 'none' ? <h3>Select a conversation to chat</h3> : <MessageInput sendMessage={sendMessage} currentRoom={currentRoom}/>}
              </div>
            </section>
            <aside className="sidebar right-sidebar"></aside>
  </div>
  )
}

export default Inbox;