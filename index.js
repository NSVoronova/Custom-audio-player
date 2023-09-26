console.log(`Вёрстка +10
вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
Кнопка Play/Pause +10
есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5
При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
При смене аудиотрека меняется изображение - обложка аудиотрека +10
Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
Отображается продолжительность аудиотрека и его текущее время проигрывания +10

Score: 60 points`)



const trackList = [
  {
    artist: "Doja Cat",
    song: "Paint the town red",
    audio: "audio/paint-the-town-red.mp3",
    image: "images/doja.jpg",
  },
  {
    artist: "Fall Out Boy",
    song: "Centures",
    audio: "audio/fall-out-boy-centuries.mp3",
    image: "images/fallOutBoy.jpg",
  },
  {
    artist: "Beyonce",
    song: "Don't Hurt Yourself",
    audio: "audio/beyonce.mp3",
    image: "images/lemonade.png",
  },
  {
    artist: "Dua Lipa",
    song: "Don't Start Now",
    audio: "audio/assets_audio_dontstartnow.mp3",
    image: "images/dontstartnow.png",
  },
];

let currentTrackIndex = 0;

const wrapper = document.querySelector(".wrapper");

const audioPlayer = document.getElementById("audio-player");
const currentTrackElement = document.getElementById("current-track");
const currentSongElement = document.getElementById("current-song");
const trackImageElement = document.getElementById("track-image");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const playButton = document.getElementById("play-song");
const pauseButton = document.getElementById("pause-song");
const progressBar = document.getElementById("progress-bar");
const currentTimeElement = document.getElementById("current-time");
const totalTimeElement = document.getElementById("total-time");

function loadTrack(trackIndex) {
  const track = trackList[trackIndex];
  currentTrackElement.textContent = track.artist;
  currentSongElement.textContent = track.song;
  trackImageElement.src = track.image;
  audioPlayer.src = track.audio;
  wrapper.style.backgroundImage = `url(${track.image})`;

  currentTimeElement.textContent = '0:00';
  totalTimeElement.textContent = '0:00';

  audioPlayer.addEventListener("loadedmetadata", function () {
    totalTimeElement.textContent = formatTime(audioPlayer.duration);
    if (!audioPlayer.paused) {
      playButton.style.display = 'none';
      pauseButton.style.display = 'inline-block';
    } else {
      playButton.style.display = 'inline-block';
      pauseButton.style.display = 'none';
    }
  });
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    trackImageElement.style.transform = "scale(1.2)"
  } else {
    audioPlayer.pause();
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    trackImageElement.style.transform = "scale(1)"
  }
}

function playAudio() {
  audioPlayer.play();
  playButton.style.display = 'none';
  pauseButton.style.display = 'inline-block';
  trackImageElement.style.transform = "scale(1.2)"
}

function pauseAudio() {
  audioPlayer.pause();
  playButton.style.display = 'inline-block';
  pauseButton.style.display = 'none';
  trackImageElement.style.transform = "scale(1)"
}

function updateProgressBar() {
  const currentTime = audioPlayer.currentTime;
  let duration;
  if(audioPlayer.duration) {
    duration = audioPlayer.duration;
  } else {
    duration = 0;
  }

 let progressPercentage;
 if (duration > 0) {
  progressPercentage = (currentTime / duration) * 100;
 } else {
  progressPercentage = 0;
 }
  progressBar.value = progressPercentage;

  currentTimeElement.textContent = formatTime(currentTime);
}

audioPlayer.addEventListener("timeupdate", updateProgressBar);

playButton.addEventListener("click", togglePlayPause);
pauseButton.addEventListener("click", togglePlayPause);

prevButton.addEventListener("click", function () {
  currentTrackIndex =
    (currentTrackIndex - 1 + trackList.length) % trackList.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  trackImageElement.style.transform = "scale(1.2)"
});

nextButton.addEventListener("click", function () {
  currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  trackImageElement.style.transform = "scale(1.2)"
});

progressBar.addEventListener("input", function () {
  const progressValue = progressBar.value;
  const duration = audioPlayer.duration;
  const newTime = (progressValue / 100) * duration;
  audioPlayer.currentTime = newTime;
});

audioPlayer.addEventListener("ended", function () {
  currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
  loadTrack(currentTrackIndex);
  if (!audioPlayer.paused) {
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
  } else {
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
  }
});
loadTrack(currentTrackIndex);