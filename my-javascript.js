var views = {
  'selfView':   document.getElementById('my-video'),
  'remoteView': document.getElementById('peer-video')
};
const mediaStreamConstraints = {
  video: true,
};
var socket = new JsSIP.WebSocketInterface('wss://trihdrtc.tk:7443');
var configuration = {
  sockets  : [ socket ],
  uri      : 'sip:1004@192.168.0.151',
  password : '1234'
};

var ua = new JsSIP.UA(configuration);

ua.start();

// Register callbacks to desired call events
var eventHandlers = {
  'progress': function(e) {
    console.log('call is in progress');
  },
  'failed': function(e) {
    console.log('call failed with cause: '+ e.data.cause);
  },
  'ended': function(e) {
    console.log('call ended with cause: '+ e.data.cause);
  },
  'confirmed': function(e) {
    console.log('call confirmed');
  }
};

var options = {
  'eventHandlers'    : eventHandlers,
  'mediaConstraints' : { 'audio': true, 'video': true }
};

var session = ua.call('sip:1001@192.168.0.151', options);
