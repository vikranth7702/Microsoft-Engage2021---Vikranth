// Creating a client

const socket = io('/')
const myPeer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '443'
})
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

// Asking the user his name through prompt
const userName = prompt('What is your name?')
socket.emit('new-user', userName)

const peers = {}
let localStream;

const videoGrid= document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true;

// Joining the video call meet and getting the user's audio, video
function joinMeet(){
  document.getElementById('meet').style.display = "flex";
  document.getElementById('start').style.display = "none";

  navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
  }).then(stream => {
      localStream = stream;
      addVideoStream(myVideo, stream)
      myPeer.on('call', call => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    }) 

    socket.on('user-connected', userId => {
      connectNewUser(userId, stream);
    })
  })
}
//showing that user has joined in chat box
socket.on('user-joined', userName =>{
  $("ul").append(`<li class="join-info">${userName} has joined</li>`)
})

 // Disconnecting the user
socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close();
})

//showing that user has left
socket.on('user-left', userName =>{
  $("ul").append(`<li class="join-info">${userName} has left</li>`)
})


//Connecting the user to videocall meet
function connectNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

// Adding the new user's stream to the video grid
function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

// Setting the functions of mute or unmute audio buttons
let isAudio=true;
function mute(){
  isAudio = !isAudio;
  localStream.getAudioTracks()[0].enabled = isAudio;
  if(isAudio){
    const button = ` <i class="fas fa-microphone"></i>
     <span>Mute</span> `
    document.querySelector('#audio').innerHTML = button;
  }
  else{
    const button = `<i class="unmute fas fa-microphone-slash"></i>
     <span>Unmute</span> `
    document.querySelector('#audio').innerHTML = button;
  }
}

// Setting the functions of play or stop video buttons
let isVideo = true;
function stop(){
  isVideo = !isVideo;
  localStream.getVideoTracks()[0].enabled = isVideo;
  if(isVideo){
    const button = ` <i class="fas fa-video"></i>
     <span>Stop Video</span> `
    document.querySelector('#video').innerHTML = button;
  }
  else{
    const button = ` <i class="stop fas fa-video-slash"></i>
     <span>Play Video</span> `
    document.querySelector('#video').innerHTML = button;
  }
}


// Taking the chat message input and displaying it to all clients
let text = $("input");
// Sending message when enter is pressed
$('html').keydown(function (e) {
  if (e.which == 13 && text.val().length !== 0) {
    socket.emit('message', text.val());
    text.val('')
  }
});
socket.on("createMessage", messages => {
  $("ul").append(`<li class="message"><b>${messages.userName}:</b><br/>${messages.message}<br/>
    <span id="time">${messages.time}</span></li>`);
  scrollToBottom($('.chat-tab'))
})
// Function to scroll within the chat tab
const scrollToBottom = (d) => { 
  d.scrollTop(d.prop("scrollHeight"));
}

// Leaving the videocall meet
function leave(){
  document.getElementById('meet').style.display = "none";
  document.getElementById('start').style.display = "flex";
  localStream.getAudioTracks()[0].enabled = false;
  localStream.getVideoTracks()[0].enabled = false;
}