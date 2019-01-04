var views = {
  'selfView':   document.getElementById('my-video'),
  'remoteView': document.getElementById('peer-video')
};
var socket = new JsSIP.WebSocketInterface('wss://trihdrtc.tk:7443');
var configuration = {
  sockets  : [ socket ],
  uri      : 'sip:1004@192.168.0.151',
  password : '1234'
};

var ua = new JsSIP.UA(configuration);

ua.start();
var options = {
  'mediaConstraints' : { 'audio': true, 'video': true }
  'mediaStream' : views,
};
ua.call('sip:1001@192.168.0.151', options);

