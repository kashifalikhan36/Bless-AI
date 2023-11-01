document.querySelector("button").addEventListener("click", handleClick);
const startRecordButton = document.getElementById('startRecord');
const stopRecordButton = document.getElementById('stopRecord');
const audioPlayer = document.getElementById('audioPlayer');
let mediaRecorder;
let audioChunks = [];

startRecordButton.addEventListener('click', startRecording);
stopRecordButton.addEventListener('click', stopRecording);

function handleClick() {
    alert("i got the clicks!!");
    var audio = new Audio("sounds/audio.mp3");
    audio.play();
}



async function startRecording() {
    startRecordButton.disabled = true;
    stopRecordButton.disabled = false;
    audioChunks = [];
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayer.src = audioUrl;
            sendAudioToServer(audioBlob);
        };
        mediaRecorder.start();
    } catch (error) {
        console.error('Error accessing microphone:', error);
    }
}

function stopRecording() {
    startRecordButton.disabled = false;
    stopRecordButton.disabled = true;
    mediaRecorder.stop();
}

function sendAudioToServer(blob) {
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');
    fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error sending audio to server:', error);
    });
}
