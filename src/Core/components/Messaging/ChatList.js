import React, { useState, useEffect } from 'react';
import { connectToRoom } from './methods';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

const ChatList = ({ setCurrentRoom, currentRoom, convList}) => {



  const history= useHistory();
  //  console.log(history)
  useEffect(() => {
    if (history.location.state && history.location.state.createdChannel){
      setCurrentRoom(history.location.state.createdChannel)
    }
  }, [])

  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    if (currentRoom && currentRoom.id){
      connectToRoom(currentRoom.id, chatLog, setChatLog)
    }
  },[currentRoom])

  const onConvoClick = (channel) => {
     const  messageElements =  document.getElementById('message-list-div').childNodes;
   console.log(messageElements);
  //  if (messageElements !== undefined && chatLog !== undefined){

    //Krishan commented this out
  //  for(let x=0; x < messageElements.length; x++){
  //    for(let y=0; y< messageElements.length; y++){
  //      if(messageElements[x] &&  chatLog[y] && messageElements[x].id !== chatLog[y].id){
  //       messageElements[x].remove()
  //      }
  //    }
  //  }

console.log(messageElements.length);


  for(let x=0; x < messageElements.length; x++){
    for(let y=0; y< chatLog.length; y++){
      if(messageElements[x] &&  chatLog[y] && messageElements[x].id !== chatLog[y].id){
       messageElements[x].remove()
      }
    }
   
   
  }
   
  //  }
  // Krishan commented out
      // connectToRoom(channel.id, chatLog, setChatLog)
      setCurrentRoom(channel)
      
      
  }
// console.log(chatLog)
// const selectedStyle = { fontWeight: '900'}
  return(
    <div className='chat-list'>
      {/* <h3>Conversations</h3> */}
      {/* {props.convList && props.convList.map((channel, idx) => {
        return <li onClick={()=> onConvoClick(channel)} key={idx}>{channel.name}</li>
      })} */}
        {convList && convList.map((channel, idx) => {
          
        return <li onClick={()=> onConvoClick(channel)} key={idx} style ={channel.id === currentRoom.id ? { fontWeight: '900'} : { fontWeight: '100'}} >{channel.displayName}</li>
      })}
</div>
  )
}

export default ChatList;