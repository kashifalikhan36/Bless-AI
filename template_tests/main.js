document.addEventListener("DOMContentLoaded", function () {
    const startRecordButton = document.getElementById('startRecord');
    const stopRecordButton = document.getElementById('stopRecord');
    const audioPlayer = document.getElementById('audioPlayer');
    let mediaRecorder;
    let audioChunks = [];
    let mp3Data = [];

    startRecordButton.addEventListener('click', startRecording);
    stopRecordButton.addEventListener('click', stopRecording);

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
                convertAndSendMP3(audioBlob);
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

    async function convertAndSendMP3(blob) {
        const audioContext = new AudioContext();
        const audioData = await fetch(URL.createObjectURL(blob));
        const arrayBuffer = await audioData.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const mp3Data = encodeToMP3(audioBuffer);

        // Create a new Blob with MP3 data
        const mp3Blob = new Blob([mp3Data], { type: 'audio/mpeg' });

        // Send the MP3 data to the server using a FormData object
        const formData = new FormData();
        formData.append('audio', mp3Blob, 'recording.mp3');
        fetch('http://98.70.51.201:8000/audio/upload', {
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

    function getmp3data(){
        formData.append('audio', mp3Blob, 'recording.mp3');
        fetch('http://98.70.51.201:8000/audio/get', {
            method: 'GET',
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

    function encodeToMP3(audioBuffer) {
        const mp3Encoder = new lamejs.Mp3Encoder(1, audioBuffer.sampleRate, 128);
        const channelData = audioBuffer.getChannelData(0); // Get mono audio data
        return mp3Encoder.encodeBuffer(new Int16Array(channelData));
    }
});




document.querySelector("button").addEventListener("click", handleClick);
// const startRecordButton = document.getElementById('startRecord');
// const stopRecordButton = document.getElementById('stopRecord');
// const audioPlayer = document.getElementById('audioPlayer');
// let mediaRecorder;
// let audioChunks = [];

// startRecordButton.addEventListener('click', startRecording);
// stopRecordButton.addEventListener('click', stopRecording);

function handleClick() {
    alert("i got the clicks!!");
    var audio = new Audio("sounds/audio.mp3");
    audio.play();
}



// async function startRecording() {
//     startRecordButton.disabled = true;
//     stopRecordButton.disabled = false;
//     audioChunks = [];
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         mediaRecorder = new MediaRecorder(stream);
//         mediaRecorder.ondataavailable = (event) => {
//             audioChunks.push(event.data);
//         };
//         mediaRecorder.onstop = () => {
//             const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//             const audioUrl = URL.createObjectURL(audioBlob);
//             audioPlayer.src = audioUrl;
//             sendAudioToServer(audioBlob);
//         };
//         mediaRecorder.start();
//     } catch (error) {
//         console.error('Error accessing microphone:', error);
//     }
// }

// function stopRecording() {
//     startRecordButton.disabled = false;
//     stopRecordButton.disabled = true;
//     mediaRecorder.stop();
// }

// function sendAudioToServer(blob) {
//     const formData = new FormData();
//     formData.append('audio', blob, 'recording.wav');
//     fetch('http://127.0.0.1:8000/upload', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Server response:', data);
//     })
//     .catch(error => {
//         console.error('Error sending audio to server:', error);
//     });
// }
