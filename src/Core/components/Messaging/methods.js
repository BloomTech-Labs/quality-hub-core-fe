import Chatkit from '@pusher/chatkit-client';
import { gql } from 'apollo-boost';
import { GET_QH_USER, GET_CHAT_IMG } from './resolvers';
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

export  const startDM = (recipient, recipientId, sender, history) => {
  const userId = localStorage.getItem('id')
  
  // const sender = await `${data.me.first_name} ${data.me.last_name}`
  chatManager.connect()
  .then(currentUser => {
    currentUser.createRoom({
    id: `${userId}-${recipientId}`,
    name: `${sender}-${recipient}`,
    private: true,
    addUserIds: [userId, recipientId],
  }).then(room => {
    // history.push('/interviewq/inbox')
    	history.push({
				pathname: '/interviewq/inbox',
				state: {
					createdChannel: {
						name: `${sender}-${recipient}`,
            id: `${userId}-${recipientId}`,
            createdByUserId: `${userId}`,
            displayName: `${recipient}`
					},
				},
      })
  })
  .catch(err => {
    console.log(`Error creating room ${err}`)
    // history.push('/interviewq/inbox')
  })
})
}

export const getRooms = (setConvList) => {
  chatManager.connect({
    onAddedToRoom: room => {
    }
}).then(currentUser => {
  setConvList(currentUser.rooms.map(channel => {
    const splitName= channel.name.split('-');
  if (channel.createdByUserId === localStorage.getItem('id')){
    return { name: channel.name, id: channel.id, createdByUserId: channel.createdByUserId, displayName: splitName[1], unreadCount: channel.unreadCount }
  }  
    return { name: channel.name, id: channel.id, createdByUserId: channel.createdByUserId, displayName: splitName[0], unreadCount: channel.unreadCount }
  }))
})
}
// export const getRooms =  (setConvList, data) => {

//   chatManager.connect({
//     onAddedToRoom: room => {
//     }
// }).then(currentUser => {
//   setConvList(currentUser.rooms.map(async (channel) => {
//     const splitName= channel.name.split('-');
//     await data
//   if (channel.createdByUserId === localStorage.getItem('id')){
//     return { name: channel.name, id: channel.id, createdByUserId: channel.createdByUserId, displayName: splitName[1] }
//   }  
//     return { name: channel.name, id: channel.id, createdByUserId: channel.createdByUserId, displayName: splitName[0] }
//   }))
// })
// }

export const connectToRoom = (roomId, chatLog, setChatLog) => {
  //window.location.reload();
  chatManager.connect()
  .then(currentUser => {
    // console.log(currentUser)
    let messageObj;
    let messageArray = [];
    currentUser.subscribeToRoom({
      roomId: roomId,
      //roomId: roomId,
      // messageLimit: 0,
     hooks: {
         onMessage: message => {
          const  messageElements =  document.getElementById('message-list-div').childNodes;
           messageObj = { text: message.text, senderId: message.senderId };
           messageArray.push(messageObj);
            setChatLog(messageArray);
           const messageDiv = document.createElement('li');
          //  messageDiv.textContent = `${message.sender.name}: ${message.text}`
          messageDiv.textContent = `${message.text}`
           messageDiv.id = message.id
        let check = false;
           for(let x=0; x < messageElements.length; x++){
              if(messageElements[x].id == message.id){
                check = true;
              }
            }
            if(!check){
              document.querySelector('.chat-messages').appendChild(messageDiv);
              if (message.senderId === localStorage.getItem('id')){
                messageDiv.classList.add('sentMessage')
              }
            }
           return
         },
       },
     });
   })
 } 