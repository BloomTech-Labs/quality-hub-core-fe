import React, { useState } from 'react';
import { handleSubmit } from '../../../InterviewQ/components/CoachForm/subs/Functions';
import { formatRelative, subDays } from 'date-fns'
const MessageInput = ({ sendMessage, currentRoom }) => {

  
  const [message, setMessage] = useState('')
  // const [message, setMessage] = useState({
  //   message: '',
  //   date: date
  // })

  

  const handleChange = (e) => {
    setMessage(e.target.value)
  }


  // const handleChange = (e) => {
  //   setMessage({ ...message, [e.target.name]: e.target.value })
  // }
  
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(date, 'date')
  //   sendMessage(message, currentRoom.id)
  //   setMessage('')
  // }
  async function handleSubmit(e) {
    e.preventDefault()
    await sendMessage(message, currentRoom.id)
    // await sendMessage(date,currentRoom.id, date )
      setMessage('')
  }

  return(
      <form
        className="send-message-form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={message}
          placeholder="Type a message..."
          type="text" />
      </form>
  )
}

export default MessageInput;