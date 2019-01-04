/*'use strict';

// On this codelab, you will be streaming only video (video: true).
const mediaStreamConstraints = {
  video: false,
  audio: true,
};

// Video element where stream will be placed.
const localVideo = document.querySelector('video');

// Local stream that will be reproduced on the video.
let localStream;

// Handles success by adding the MediaStream to the video element.
function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

// Handles error by logging a message to the console with the error message.
function handleLocalMediaStreamError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// Initializes media stream.
navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
  .then(gotLocalMediaStream).catch(handleLocalMediaStreamError); */
///********************
var options = {
      media: {
        local: {
          video: document.getElementById('localVideo')
        },
        remote: {
          video: document.getElementById('remoteVideo'),
          // This is necessary to do an audio/video call as opposed to just a video call
          audio: document.getElementById('remoteVideo')
        }
      },
      ua: {}
    };
// var simple = new SIP.Web.Simple(options);
var userAgent = new SIP.UA({
  uri: '1004@192.168.0.151',
  transportOptions: {
    wsServers: ['wss://trihdrtc.tk:7443']
  },
  authorizationUser: '1004',
  password: '1234'
});
