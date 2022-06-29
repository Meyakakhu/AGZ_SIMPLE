let recorder, stream;
const chatpan = document.getElementById("chatPanel");
const video_rec = document.createElement("video");
video_rec.id="video_rec";
video_rec.controls = true;
chatpan.appendChild(video_rec);
const startbtn = document.createElement("button");
startbtn.id="start_rec";
startbtn.innerText = "Записывать";
startbtn.onclick = function(){
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
}

const video = video_rec;


chatpan.appendChild(startbtn);
const stopbtn = document.createElement("button");
stopbtn.id="stop_rec";
stopbtn.innerText = "Не записывать";
stopbtn.disabled = true;
stopbtn.onclick = function(){
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
}
chatpan.appendChild(stopbtn);



const start = document.getElementById("start_rec");
const stop = document.getElementById("stop_rec");

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
