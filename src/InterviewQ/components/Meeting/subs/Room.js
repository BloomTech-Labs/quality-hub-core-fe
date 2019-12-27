import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import '../Meeting.scss';

const Room = () => {
	const [textchat, setTextchat] = useState('');
	let io = socketIOClient.connect('https://qh-test-web-rtc.herokuapp.com');
	var ROOM = 'chat';
	let mute = false;
	var SIGNALING_ROOM = 'room_name';
	var configuration = {
		iceServers: [
			{
				url: 'stun:stun.l.google.com:19302',
			},
		],
	};
	var rtcPeerConn;
	var constraints = {
        audio: true,
		video: {
			mandatory: {
			minWidth: 750,
			maxWidth: 750,
			minHeight: 500,
			maxHeight: 500,
		    },
		},
	};

	var videoProps = {
		mandatory: {
			minWidth: 750,
			maxWidth: 750,
			minHeight: 500,
			maxHeight: 500,
		},
	};
	var [announcements, setAnnouncements] = useState([]);
	function onError(error) {
		console.log('Error!', error);
	}

	function startSignaling() {
		displaySignalingMessage('staring signaling...');

		rtcPeerConn = new RTCPeerConnection(configuration);

		rtcPeerConn.onicecandidate = function(event) {
			if (event.candidate) {
				io.emit('signal', {
					type: 'ice candidate',
					message: JSON.stringify({
						candidate: event.candidate,
						room: SIGNALING_ROOM,
					}),
				});
			}
			displaySignalingMessage('completed that ice candidate...');
		};

		rtcPeerConn.onnegotiationneeded = function() {
			displaySignalingMessage('on negotiation called');
			rtcPeerConn.createOffer(sendLocalDesc, logError);
		};

		rtcPeerConn.onaddstream = function(event) {
			displaySignalingMessage('going to add their stream...');
			document.querySelector('#theirVideoTag').srcObject = event.stream;
		};

		navigator.mediaDevices.getUserMedia =
			navigator.mediaDevices.getUserMedia ||
			navigator.mediaDevices.webkitGetUserMedia ||
			navigator.mediaDevices.mozGetUserMedia;
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(stream => {
				document.querySelector('#myVideoTag').srcObject = stream;
				document.querySelector('#myVideoTag').play();
				rtcPeerConn.addStream(stream);
				console.log('Success! We have a stream!');
			})
			.catch(onError);
	}

	function sendLocalDesc(desc) {
		rtcPeerConn.setLocalDescription(
			desc,
			function() {
				displaySignalingMessage('sending local description');
				io.emit('signal', {
					type: 'SDP',
					message: JSON.stringify({
						sdp: rtcPeerConn.localDescription,
					}),
					room: SIGNALING_ROOM,
				});
			},
			logError,
		);
	}

	function logError(error) {
		displaySignalingMessage(error.name + ': ' + error.message);
	}

	function displayMessage(message) {
		document.querySelector('#chatArea').textContent += '\r\n' + message;
		document
			.querySelector('#chatArea')
			.setAttribute('style', 'white-space: pre;');
		document.querySelector('#chatArea').scrollTop = 10000000;
	}

	function displaySignalingMessage(message) {
		// console.log(message)
		// signalingArea.setAttribute('style', 'white-space: pre;');
		// signalingArea.textContent += '\r\n' + message;
	}

	function restartStream() {
		navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;
		navigator.mediaDevices.getUserMedia(constraints)
			.then(stream => {
				document.querySelector('#myVideoTag').srcObject = stream;
				rtcPeerConn.addStream(stream);
				document.querySelector('#myVideoTag').play();
			})
			.catch(onError);
	}

	function toggleAudio() {
		constraints.audio = !constraints.audio;
		restartStream();
		if(document.querySelector("#meeting-audio-button").textContent == "Mute"){
			document.querySelector("#meeting-audio-button").textContent = "UnMute";
		} else {
			document.querySelector("#meeting-audio-button").textContent = "Mute";
		}
		
	}

	const toggleVideo = () => {
		constraints.video === false
			? (constraints.video = videoProps)
			: (constraints.video = false);
		restartStream();
		if(document.querySelector("#meeting-video-button").textContent == "Video ON/off"){
			document.querySelector("#meeting-video-button").textContent = "Video on/OFF";
		} else {
			document.querySelector("#meeting-video-button").textContent = "Video ON/off";
		}
	};

	io.emit('ready', {
		chat_room: ROOM,
		signaling_room: SIGNALING_ROOM,
		my_name: 'Ryan',
	});

	io.emit('signal', {
		type: 'user_here',
		message: 'Are you ready for a call?',
		room: SIGNALING_ROOM,
	});

	io.on('signaling_message', data => {
		displaySignalingMessage('Signal received: ' + data.message);
		if (!rtcPeerConn) {
			startSignaling();
		}

		if (data.type !== 'user_here') {
			var message = JSON.parse(data.message);
			if (message.sdp) {
				rtcPeerConn.setRemoteDescription(
					new RTCSessionDescription(message.sdp),
					function() {
						if (rtcPeerConn.remoteDescription.type === 'offer') {
							rtcPeerConn.createAnswer(sendLocalDesc, logError);
						}
					},
					logError,
				);
			} else {
				rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate));
			}
		}
	});

	io.on('announce', data => {
		displayMessage(data.message);
	});

	const sendMessageFunction = e => {
		e.preventDefault();
		if (document.querySelector('#myMessage').value != '') {
			displayMessage(`User : ${document.querySelector('#myMessage').value}`);
			io.emit('send', {
				author: 'User',
				message: document.querySelector('#myMessage').value,
				room: SIGNALING_ROOM,
			});
			document.querySelector('#myMessage').value = '';
		}
	};

	io.on('message', data => {
		displayMessage(data.author + ': ' + data.message);
	});

	return (
		<div className="meetingContainer">
			{/* <div className='interviewq-two-video-screens'>
				<video id='myVideoTag' autoPlay='false' muted='muted'></video>
				<video id='theirVideoTag' autoPlay='false'></video>
				
			</div>
			 */}
             <div className="videoContainer">
                <video id='theirVideoTag' autoPlay='false'></video>
                <video id='myVideoTag' autoPlay='false' muted='muted'></video>
             </div>
            <div className='interviewq-video-controls'>
					<button id="meeting-video-button" onClick={toggleVideo}>Video ON/off</button>
					<button id="meeting-audio-button" onClick={toggleAudio}>Mute</button>
					<button onClick={''}>End</button>
			</div>
            <div className='interviewq-meeting-chatbox'>
				<div id='chatArea' >
					This is your awesome conversation:
				</div>
				{/* <div id='signalingArea'></div> */}
                <form>
                    <label>Your Message</label>
                    <input id='myMessage' type='text' />
                    <input id='sendMessage' type='submit' onClick={sendMessageFunction} />
				</form>
            </div>
		</div>
	);
};

export default Room;