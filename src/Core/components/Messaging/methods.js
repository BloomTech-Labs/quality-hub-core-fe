import Chatkit from '@pusher/chatkit-client';
import { gql } from 'apollo-boost';
import { GET_QH_USER } from './resolvers';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator } from './config';
import { useQuery } from '@apollo/react-hooks';

// function createPrivateRoom(id) {
//   const { currentUser, rooms } = this.state;
//   const roomName = `${currentUser.id}_${id}`;

//   const isPrivateChatCreated = rooms.filter(room => {
//     if (room.customData && room.customData.isDirectMessage) {
//       const arr = [currentUser.id, id];
//       const { userIds } = room.customData;

//       if (arr.sort().join('') === userIds.sort().join('')) {
//         return {
//           room,
//         };
//       }
//     }

//     return false;
//   });

//   if (isPrivateChatCreated.length > 0) {
//     return Promise.resolve(isPrivateChatCreated[0]);
//   }

//   return currentUser.createRoom({
//     name: `${roomName}`,
//     private: true,
//     addUserIds: [`${id}`],
//     customData: {
//       isDirectMessage: true,
//       userIds: [currentUser.id, id],
//     },
//   });
// }

// export function sendDM(id) {
//   createPrivateRoom.call(this, id).then(room => {
//     connectToRoom.call(this, room.id);
//   });
// }

const chatManager = new ChatManager({
  instanceLocator,
  userId: localStorage.getItem('id') ? localStorage.getItem('id') : 'none',
  tokenProvider: new TokenProvider({
    url: tokenUrl
  })
})

export  const startDM = (recipient, recipientId, sender) => {
  const userId = localStorage.getItem('id')
  
  // const sender = await `${data.me.first_name} ${data.me.last_name}`
  console.log(userId, recipientId, recipient)
  chatManager.connect()
  .then(currentUser => {
    currentUser.createRoom({
    id: `${userId}-${recipientId}`,
    name: `${sender}-${recipient}`,
    private: true,
    addUserIds: [userId, recipientId],
  }).then(room => {
    console.log(`Created room called ${room.id}`)
  })
  .catch(err => {
    console.log(`Error creating room ${err}`)
  })
})
}

export const connectToRoom = (roomId, chatLog, setChatLog) => {
  //window.location.reload();
  chatManager.connect()
  .then(currentUser => {
    let messageObj;
    let messageArray = [];
    currentUser.subscribeToRoom({
      roomId: roomId,
      //roomId: roomId,
      // messageLimit: 0,
     hooks: {
         onMessage: message => {
           console.log(message.sender)
           messageObj = { text: message.text, senderId: message.senderId };
           messageArray.push(messageObj);
            setChatLog(messageArray);
           const messageDiv = document.createElement('li');
           messageDiv.textContent = `${message.sender.name}: ${message.text}`
           messageDiv.id = message.id
           document.querySelector('.chat-messages').appendChild(messageDiv);
           return
         },
       },
     });
   })
 } 