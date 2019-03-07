const remoteVideo = document.getElementById('remoteVideo');
const localVideo = document.getElementById('localVideo');
var password
const userAgent = new SIP.UA({
    uri: '1004@192.168.0.151',
    transportOptions: {
        wsServers: ['wss://trihdrtc.tk:7443']
    },
    authorizationUser: '1004',
    password: '1234',
    dtmfType: SIP.C.dtmfType.RTP,
    hackWssInTransport: true,
    userAgentString: "iVoice WebPhone",
    displayName: 'TriHD3',
    autostop: false
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
    var sip_phone_number_ = document.getElementById("sip_phone_number").value.toString();
    var modal3 = document.getElementById('myModal_3');
    modal3.style.display = "block";
    const session = userAgent.invite(sip_phone_number_, options);
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
        modal3.style.display = "none";
    };
    session.on('bye', function() {
        modal3.style.display = "none";
    });
    /* DTMF */
    var tones_1 = '1';
    var tones_2 = '2';
    var tones_3 = '3';
    var tones_4 = '4';
    var tones_5 = '5';
    var tones_6 = '6';
    var tones_7 = '7';
    var tones_8 = '8';
    var tones_9 = '9';
    var tones_0 = '0';
    var tones_sao = '*';
    var tones_thang = '#';
    var extraHeaders = [ 'X-Foo: foo', 'X-Bar: bar' ];
    var options_dtmf = {
        'duration': 160,
        'interToneGap': 1200,
        'extraHeaders': extraHeaders
    };
    goira.dtmf_1 = function () {
        session.dtmf(tones_1, options_dtmf);
    }
    goira.dtmf_2 = function () {
        session.dtmf(tones_2, options_dtmf);
    }
    goira.dtmf_3 = function () {
        session.dtmf(tones_3, options_dtmf);
    }
    goira.dtmf_4 = function () {
        session.dtmf(tones_4, options_dtmf);
    }
    goira.dtmf_5 = function () {
        session.dtmf(tones_5, options_dtmf);
    }
    goira.dtmf_6 = function () {
        session.dtmf(tones_6, options_dtmf);
    }
    goira.dtmf_7 = function () {
        session.dtmf(tones_7, options_dtmf);
    }
    goira.dtmf_8 = function () {
        session.dtmf(tones_8, options_dtmf);
    }
    goira.dtmf_9 = function () {
        session.dtmf(tones_9, options_dtmf);
    }
    goira.dtmf_0 = function () {
        session.dtmf(tones_0, options_dtmf);
    }
    goira.dtmf_sao = function () {
        session.dtmf(tones_sao, options_dtmf);
    }
    goira.dtmf_thang = function () {
        session.dtmf(tones_thang, options_dtmf);
    }
}

userAgent.on('invite', function (session) {
    var x = document.getElementById("myAudio");
    x.play();
    var modal = document.getElementById('myModal');
    var modal2 = document.getElementById('myModal_2');
    var span = document.getElementsByClassName("close")[0];
    var ans = document.getElementById("ansBtn");
    var rej = document.getElementById("rejBtn");
    var ter = document.getElementById("terBtn");
    var calling_number = session.remoteIdentity.displayName;
    document.getElementById("calling_number_prompt").innerHTML = calling_number + ' đang gọi cho bạn';
    document.getElementById("calling_number").innerHTML = calling_number;
    console.info(calling_number, 'Is calling you');
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
        x.pause();
        var option_reject = {
            statusCode: 486
        };
        session.reject(option_reject);
        console.info('*********Reject call*********');
    };
    ans.onclick = function() {
        x.pause();
        modal.style.display = "none";
        modal2.style.display = "block";
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
    };
    rej.onclick = function() {
        x.pause();
        modal.style.display = "none";
        var option_reject = {
            statusCode: 486
        };
        session.reject(option_reject);
        console.info('*********Reject call*********');
        modal.style.display = "none";
    };
    ter.onclick = function () {
        session.terminate();
        modal2.style.display = "none";
    };
    session.on('cancel', function() {
        x.pause();
        modal.style.display = "none";
    });
    session.on('bye', function() {
        modal2.style.display = "none";
    });

/*   window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
/*    if (confirm("Co cuoc goi den")) {
        x.pause();
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
    } else {
        x.pause();
        var option_reject = {
            statusCode: 486
        };
        session.reject(option_reject);
        console.info('*********Reject call*********');
        }*/
});
