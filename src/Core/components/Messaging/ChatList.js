import React, { useState, useEffect } from 'react';
import { connectToRoom } from './methods';

const ChatList = ({ convList, setCurrentRoom }) => {
  const [chatLog, setChatLog] = useState([]);

  const onConvoClick = (channel) => {
   const messageElements = document.getElementById('message-list-div').childNodes;
   for(let x=0; x < messageElements.length; x++){
     for(let y=0; y< messageElements.length; y++){
       if(messageElements[x].id !== chatLog[y].id){
        messageElements[x].remove()
       }
     }
   }
      connectToRoom(channel.id, chatLog, setChatLog)
      setCurrentRoom(channel)     
  }
  
  return(
    <div className='chat-list'>
      <h3>Conversations</h3>
        {convList && convList.map((channel, idx) => {
        return <li onClick={()=> onConvoClick(channel)} key={idx}>{channel.displayName}</li>
      })}
</div>
  )
}

export default ChatList;