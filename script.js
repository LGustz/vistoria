const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCall');
const endCallButton = document.getElementById('endCall');
const connectPeerButton = document.getElementById('connectPeer');
const peerIdInput = document.getElementById('peerId');

const peer = new Peer(); // Cria uma nova instância do PeerJS
let localStream;
let currentCall;

// Obtém o stream de vídeo local
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = stream;
    })
    .catch(err => console.error('Erro ao acessar a mídia:', err));

// Quando um novo cliente se conecta, aceita a chamada automaticamente
peer.on('call', call => {
    call.answer(localStream); // Responde a chamada com o stream local
    call.on('stream', remoteStream => {
        remoteVideo.srcObject = remoteStream;
    });
    currentCall = call;
});

connectPeerButton.addEventListener('click', () => {
    const peerId = peerIdInput.value;
    if (peerId) {
        const call = peer.call(peerId, localStream); // Faz a chamada para o peer especificado
        call.on('stream', remoteStream => {
            remoteVideo.srcObject = remoteStream;
        });
        currentCall = call;
    }
});

startCallButton.addEventListener('click', () => {
    const peerId = peerIdInput.value;
    if (peerId) {
        const call = peer.call(peerId, localStream); // Faz a chamada para o peer especificado
        call.on('stream', remoteStream => {
            remoteVideo.srcObject = remoteStream;
        });
        currentCall = call;
        startCallButton.disabled = true;
        endCallButton.disabled = false;
    }
});

endCallButton.addEventListener('click', () => {
    if (currentCall) {
        currentCall.close(); // Encerra a chamada atual
        startCallButton.disabled = false;
        endCallButton.disabled = true;
        remoteVideo.srcObject = null;
    }
});
