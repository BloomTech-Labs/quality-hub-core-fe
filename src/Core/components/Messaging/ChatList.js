import React, { useState } from 'react';
import { connectToRoom } from './methods';

const ChatList = ({ convList, setCurrentRoom }) => {

  // const [list, setList] = useEffect();
  const [chatLog, setChatLog] = useState([]);
  // useEffect(() => {
  //   setList(chatLog)
  // }, [chatLog])
  console.log(convList)
  console.log(chatLog)

  // const seperateConvNames = () =>{
  //   const names = convList.map(conv => {
  //     let arr = []
  //     arr.push(conv)
  //     arr.split('-')
  //     arr.sp
  //   })
  // }
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
console.log(chatLog)
  return(
    <div className='chat-list'>
      <h3>Conversations</h3>
      {convList && convList.map(channel => {
        return <li onClick={()=> onConvoClick(channel)}>{channel.name}</li>
      })}
</div>
  )
}

export default ChatList;