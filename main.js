const remoteVideo = document.getElementById('remoteVideo');
const localVideo = document.getElementById('localVideo');

const userAgent = new SIP.UA({
    uri: '1004@192.168.0.151',
    transportOptions: {
        wsServers: ['wss://trihdrtc.tk:7443'],
        traceSip: true
    },
    authorizationUser: '1004',
    password: '1234',
    dtmfType: SIP.C.dtmfType.RTP,
    hackWssInTransport: true,
    register: false
});

var options = {
    sessionDescriptionHandlerOptions: {
        constraints: {
            audio: true,
            video: false
        }
    }
};
function dangky () {
    userAgent.register();
    console.info('Co dang ky hay khong');
    console.info(userAgent.isRegistered());
}
function huy_dangky () {
    console.info('Da huy dang ky');
    userAgent.unregister();
}
function goira () {
    const session = userAgent.invite('1001@192.168.0.151', options);
    session.on('trackAdded', function () {
        // We need to check the peer connection to determine which track was added

        const pc = session.sessionDescriptionHandler.peerConnection;

        // Gets remote tracks
        const remoteStream = new MediaStream();
        pc.getReceivers().forEach(function (receiver) {
            remoteStream.addTrack(receiver.track);
        });
        remoteVideo.srcObject = remoteStream;
        remoteVideo.play();

        // Gets local tracks
        const localStream = new MediaStream();
        pc.getSenders().forEach(function (sender) {
            localStream.addTrack(sender.track);
        });
        localVideo.srcObject = localStream;
        localVideo.play();
    });
    goira.ketthuc = function () {
        session.terminate();
    };
    var tones = '3';
    var extraHeaders = [ 'X-Foo: foo', 'X-Bar: bar' ];
    var options_dtmf = {
        'duration': 160,
        'interToneGap': 1200,
        'extraHeaders': extraHeaders
    };
    goira.dtmf = function () {
        session.dtmf(tones, options_dtmf);
    }
}
userAgent.start();
userAgent.on('invite', function (session) {
    session.accept(options);
    session.on('trackAdded', function() {
        // We need to check the peer connection to determine which track was added

        var pc = session.sessionDescriptionHandler.peerConnection;

        // Gets remote tracks
        var remoteStream = new MediaStream();
        pc.getReceivers().forEach(function(receiver) {
            remoteStream.addTrack(receiver.track);
        });
        remoteVideo.srcObject = remoteStream;
        remoteVideo.play();
    });
});
