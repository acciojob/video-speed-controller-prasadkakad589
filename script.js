// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const toggle = player.querySelector('.toggle');
const volumeSlider = player.querySelector('input[name="volume"]');
const speedSlider = player.querySelector('input[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

// Functions

// Toggle Play/Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Toggle Button Icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Handle Volume and Playback Speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip Video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Scrub Video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

volumeSlider.addEventListener('input', handleRangeUpdate);
speedSlider.addEventListener('input', handleRangeUpdate);

skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);