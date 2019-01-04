/*var options = {
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
*/    
// var simple = new SIP.Web.Simple(options);
function openStream() {
	const config ={ audio: false, video: true};
	return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
	const video = document.getElementById(idVideoTag);
	video.srcObject = stream;
	video.play();
}
