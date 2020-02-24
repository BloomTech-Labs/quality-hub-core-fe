import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import { tokenUrl, instanceLocator } from "./config";

const chatManager = new ChatManager({
  instanceLocator,
  userId: localStorage.getItem("authId")
    ? localStorage.getItem("authId")
    : "none",
  tokenProvider: new TokenProvider({
    url: tokenUrl
  })
});

export const startDM = (recipient, recipientId, sender, history) => {
  const userId = localStorage.getItem("authId");

  chatManager.connect().then(currentUser => {
    currentUser
      .createRoom({
        id: `${userId}-${recipientId}`,
        name: `${sender}-${recipient}`,
        private: true,
        addUserIds: [userId, recipientId]
      })
      .then(room => {
        history.push({
          pathname: "/interviewq/inbox",
          state: {
            createdChannel: {
              name: `${sender}-${recipient}`,
              id: `${userId}-${recipientId}`,
              createdByUserId: `${userId}`,
              displayName: `${recipient}`
            }
          }
        });
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
        // history.push('/interviewq/inbox')
      });
  });
};

export const checkRooms = setRooms => {
  chatManager.connect().then(currentUser => {
    // console.log(currentUser)
    setRooms(currentUser.rooms);
  });
};

export const getRooms = (
  setConvList,
  setTheCurrentUser,
  setToggle,
  toggle,
  roomList,
  setRoomList
) => {
  // console.log("GET ROOMSSS!!!@ AHHGHGH!!!!")
  let list;
  // console.log(setRoomList)
  // console.log(roomList)
  chatManager
    .connect({
      // onAddedToRoom: room => {
      onRoomUpdated: room => {
        console.log(room);
        // console.log(roomList)
        // if(setToggle){
        if (list) {
          let changed = true;
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === room.id) {
              console.log(room.id);
              list[i] = room;
              changed = false;
              break;
            }
          }
          if (changed == true) {
            list.push(room);
          }

          // console.log(room)
          setConvList(
            list.map(channel => {
              const splitName = channel.name.split("-");
              if (channel.createdByUserId === localStorage.getItem("authId")) {
                return {
                  name: channel.name,
                  id: channel.id,
                  createdByUserId: channel.createdByUserId,
                  displayName: splitName[1],
                  unreadCount: channel.unreadCount,
                  lastMessageAt: channel.lastMessageAt
                };
              }
              return {
                name: channel.name,
                id: channel.id,
                createdByUserId: channel.createdByUserId,
                displayName: splitName[0],
                unreadCount: channel.unreadCount,
                lastMessageAt: channel.lastMessageAt
              };
            })
          );
        }
        // console.log("UPDATED ROOM")
        // setToggle(toggle+1);
        // }
      }
      // },
    })
    .then(currentUser => {
      // setTheCurrentUser(currentUser);
      // setRoomList(currentUser.rooms);
      list = currentUser.rooms;
      setConvList(
        currentUser.rooms.map(channel => {
          const splitName = channel.name.split("-");
          if (channel.createdByUserId === localStorage.getItem("authId")) {
            return {
              name: channel.name,
              id: channel.id,
              createdByUserId: channel.createdByUserId,
              displayName: splitName[1],
              unreadCount: channel.unreadCount,
              lastMessageAt: channel.lastMessageAt
            };
          }
          return {
            name: channel.name,
            id: channel.id,
            createdByUserId: channel.createdByUserId,
            displayName: splitName[0],
            unreadCount: channel.unreadCount,
            lastMessageAt: channel.lastMessageAt
          };
        })
      );
    });
};

export const connectToRoom = (
  roomId,
  chatLog,
  setChatLog,
  setTheCurrentUser
) => {
  chatManager.connect().then(currentUser => {
    let messageObj;
    let messageArray = [];

    currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          const messageElements = document.getElementById("message-list-div")
            .childNodes;
          messageObj = {
            text: message.text,
            senderId: message.senderId,
            dateAdded: message.dateAdded
          };
          messageArray.push(messageObj);
          setChatLog(messageArray);
          setTheCurrentUser(currentUser);

          const wrapper = document.createElement("div");
          wrapper.classList.add("message-wrapper");
          document.querySelector(".chat-messages").appendChild(wrapper);

          const messageDiv = document.createElement("li");
          messageDiv.textContent = `${message.text}`;
          wrapper.appendChild(messageDiv);

          const dateDiv = document.createElement("li");
          dateDiv.classList.add("timestamp");
          dateDiv.textContent = `${message.createdAt}`;
          wrapper.appendChild(dateDiv);

          messageDiv.id = message.id;
          dateDiv.id = message.id;

          let check = false;
          for (let x = 0; x < messageElements.length; x++) {
            if (messageElements[x].id == message.id) {
              check = true;
            }
          }

          if (!check) {
            // document.querySelector(".chat-messages").appendChild(wrapper);
            if (message.senderId === localStorage.getItem("authId")) {
              messageDiv.classList.add("sentMessage");
              dateDiv.classList.add("sentMessage");
            }
          }
          // return;
          currentUser.setReadCursor({
            roomId: roomId,

            position: message.id
          });
          document.querySelector("#messageContainer").scrollTop = 10000000;
          //return;
        }
      }
    });
  });
};
