document.querySelector("button").addEventListener("click", handleClick);

function handleClick() {
    alert("i got the clicks!!");
    var audio = new Audio("audio.mp3");
    audio.play();
}