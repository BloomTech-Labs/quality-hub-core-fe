import React, { useState } from 'react';
import socketIOClient from "socket.io-client";

const Room = () => {
    // io = io.connect();
    var myVideoArea = document.querySelector("#myVideoTag");
    var theirVideoArea = document.querySelector("#theirVideoTag");
    var myName = document.querySelector('#myName')
    var myMessage = document.querySelector('#myMessage')
    var sendMessage = document.querySelector('#sendMessage')
    // var chatArea = document.querySelector('#chatArea')
    var signalingArea = document.querySelector("#signalingArea")

    let io = socketIOClient.connect('http://localhost:4000'); 
    var ROOM = "chat";
    var SIGNALING_ROOM = 'room_name'
    var configuration = {
        'iceServers': [{
            'url': 'stun:stun.l.google.com:19302'
        }]
    };
    var rtcPeerConn;
    var constraints = {
        audio: false,
        video:
        {
            mandatory: {
                minWidth: 640,
                maxWidth: 640,
                minHeight: 360,
                maxHeight: 480
            }
        }
    };

    var [announcements, setAnnouncements] = useState([]);
    function onError(error) {
        console.log("Error!", error)
    }

    function startStream() {
        // Sets navigator.mediaDevices.getUserMedia based on browser type [chrome, firefox, mozilla].
        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            myVideoArea.srcObject = stream
            rtcPeerConn.addStream(stream)
            myVideoArea.play();
            console.log("Success! We have a stream!");
        })
        .catch(onError);
    }

    // function startSignaling() {
    //     displaySignalingMessage('staring signaling...')

    //     rtcPeerConn = new webkitRTCPeerConnection(configuration)

    //     rtcPeerConn.onicecandidate = function(event) {
    //         if (event.candidate) {
    //             io.emit('signal', {"type": "ice candidate", "message": JSON.stringify({
    //                 'candidate': event.candidate,
    //                 'room': SIGNALING_ROOM
    //             })})
    //         }
    //         displaySignalingMessage("completed that ice candidate...")
    //     }

    //     rtcPeerConn.onnegotiationneeded = function() {
    //         displaySignalingMessage("on negotiation called")
    //         rtcPeerConn.createOffer(sendLocalDesc, logError);
    //     }

    //     rtcPeerConn.onaddstream = function(event) {
    //         displaySignalingMessage("going to add their stream...")
    //         theirVideoArea.srcObject = event.stream
    //     }

    //     navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;
    //     navigator.mediaDevices.getUserMedia(constraints)
    //     .then(stream => {
    //         myVideoArea.srcObject = stream
    //         rtcPeerConn.addStream(stream)
    //         myVideoArea.play();
    //         console.log("Success! We have a stream!");
    //     })
    //     .catch(onError);
    // }

    function startSignaling() {
        displaySignalingMessage('staring signaling...')

        rtcPeerConn = new RTCPeerConnection(configuration);
        // rtcPeerConn = new webkitRTCPeerConnection(configuration)

        rtcPeerConn.onicecandidate = function(event) {
            if (event.candidate) {
                io.emit('signal', {"type": "ice candidate", "message": JSON.stringify({
                    'candidate': event.candidate,
                    'room': SIGNALING_ROOM
                })})
            }
            displaySignalingMessage("completed that ice candidate...")
        }

        rtcPeerConn.onnegotiationneeded = function() {
            displaySignalingMessage("on negotiation called")
            rtcPeerConn.createOffer(sendLocalDesc, logError);
        }

        rtcPeerConn.onaddstream = function(event) {
            displaySignalingMessage("going to add their stream...")
            theirVideoArea.srcObject = event.stream
        }

        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;
        navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            myVideoArea.srcObject = stream
            rtcPeerConn.addStream(stream)
            myVideoArea.play();
            console.log("Success! We have a stream!");
        })
        .catch(onError);
    }

    function sendLocalDesc(desc) {
        rtcPeerConn.setLocalDescription(desc, function () {
            displaySignalingMessage("sending local description");
            io.emit('signal', {
                "type":"SDP",
                "message": JSON.stringify({
                    'sdp': rtcPeerConn.localDescription
                }),
                "room": SIGNALING_ROOM
            })
        }, logError)
    }

    function logError(error) {
        displaySignalingMessage(error.name + ': ' + error.message);
    }

    function displayMessage(message) {
        // alert(message);
        document.querySelector('#chatArea').textContent += "\r\n"  + message;
        document.querySelector('#chatArea').setAttribute('style', 'white-space: pre;');
        // chatArea.textContent = chatArea.textContent + "<br/>" + message;
    }

    function displaySignalingMessage(message) {
        signalingArea.setAttribute('style', 'white-space: pre;');
        signalingArea.textContent += '\r\n' + message;
    }

    io.emit('ready', {"chat_room": ROOM, "signaling_room": SIGNALING_ROOM, "my_name":"Ryan"});

    io.emit('signal', {"type": "user_here", "message": "Are you ready for a call?", "room": SIGNALING_ROOM});

    io.on('signaling_message', data => {
        displaySignalingMessage("Signal received: " + data.message)
        if (!rtcPeerConn) {
            startSignaling()
        }

        if (data.type !== "user_here") {
            var message = JSON.parse(data.message);
            if (message.sdp) {
                rtcPeerConn.setRemoteDescription(new RTCSessionDescription(message.sdp), function() {
                    if (rtcPeerConn.remoteDescription.type === 'offer') {
                        rtcPeerConn.createAnswer(sendLocalDesc, logError)
                    }
                }, logError)
            }
            else {
                rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate))
            }
        }
    })

    // io.on('connection', data=>{
    //     console.log('connected on the frontend')
    // })
    io.on('announce', data => {
        // setAnnouncements([...announcements, data.message]);
        console.log('announce recieved')
        displayMessage(data.message)
    })

 

    // sendMessage.addEventListener('click', event => {
    //     io.emit('send', {"author":document.querySelector('#myName').value, "message": document.querySelector('#myMessage').value, "room":ROOM});
    //     event.preventDefault();
    // }, false);

    const sendMessageFunction = (e) =>{
        
        e.preventDefault();
        console.log('send message function');
        io.emit('send', {"author":document.querySelector('#myName').value, "message": document.querySelector('#myMessage').value, "room":SIGNALING_ROOM});
    }

    io.on('message', data => {
        
       displayMessage(data.author + ": " + data.message)
    })


	return (
        <div>
            <h1>Quail Chat</h1>
            <p>My Video</p>
            <video id="myVideoTag" autoPlay></video>
		<p>Their Video</p>
		<video id="theirVideoTag" autoPlay></video>
        <div className="cum">
			<label>Your Name</label><input id="myName" type="text" />
			<label>Your Message</label><input id="myMessage" type="text" />
			<input id="sendMessage" type="submit" onClick={sendMessageFunction}/>
    <div id="chatArea">Message Output: 
    {/* {announcements && announcements.map(an=>{
        return <p>{an}</p>
    })} */}
    </div>
			<div id="signalingArea">Signaling Messages:</div>
		</div>
        </div>
	);
};

export default Room;

