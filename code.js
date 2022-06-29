const chatpan = document.getElementById("chatPanel");
const startbtn = document.createElement("button");
startbtn.id="start_rec";
startbtn.value = "Записывать";
chatpan.appendChild(startbtn);
const stopbtn = document.createElement("button");
stopbtn.id="stop_rec";
stopbtn.value = "Не записывать";
stopbtn.disabled = true;
chatpan.appendChild(stopbtn);
const video_rec = document.createElement("video");
video_rec.id="video_rec";
video_rec.controls = true;
chatpan.appendChild(video_rec);


const start = document.getElementById("start_rec");
const stop = document.getElementById("stop_rec");
const video = document.getElemetnById("video_rec");
let recorder, stream;

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    audio:true,
    video: { mediaSource: "screen" }
  });
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
  };

  recorder.start();
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});
