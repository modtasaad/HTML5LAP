// Get a handle to the player
player       = document.getElementById('video-element');
btnPlayPause = document.getElementById('btnPlayPause');
btnMute      = document.getElementById('btnMute');
progressBar  = document.getElementById('progress-bar');
volumeBar    = document.getElementById('volume-bar');
btnspeed    = document.getElementById('btnspeed');
volumeBar.addEventListener("change", function(evt) {
    player.volume = evt.target.value;
});
document.getElementById('btnFullScreen').disabled = true;
player.addEventListener('timeupdate', updateProgressBar, false);

player.addEventListener('play', function() {
    changeButtonType(btnPlayPause, 'pause');
}, false);

player.addEventListener('pause', function() {
    changeButtonType(btnPlayPause, 'play');
}, false);

player.addEventListener('volumechange', function(e) { 
    if (player.muted) changeButtonType(btnMute, 'unmute');
    else changeButtonType(btnMute, 'mute');
}, false);	

player.addEventListener('ended', function() { this.pause(); }, false);	

progressBar.addEventListener("click", seek);

function seek(e) {
  var percent = e.offsetX / this.offsetWidth;
  player.currentTime = percent * player.duration;
  e.target.value = Math.floor(percent / 100);
  e.target.innerHTML = progressBar.value + '% played';
}

function playPauseVideo() {
  if (player.paused || player.ended) {
      changeButtonType(btnPlayPause, 'pause');
      player.play();
  }
  else {
      changeButtonType(btnPlayPause, 'play');
      player.pause();
  }
}

function stopVideo() {
  player.pause();
  if (player.currentTime) player.currentTime = 0;
}
function muteVolume() {
  if (player.muted) {
    
      changeButtonType(btnMute, 'mute');
      player.muted = false;
  }
  else {
      changeButtonType(btnMute, 'unmute');
      player.muted = true;
  }
}
function replayVideo() {
  resetPlayer();
  player.play();
}

// Update the progress bar
function updateProgressBar() {
  var percentage = Math.floor((100 / player.duration) * player.currentTime);
  progressBar.value = percentage;
  progressBar.innerHTML = percentage + '% played';
}
function changeButtonType(btn, value) {
  btn.title     = value;
  btn.innerHTML = value;
  btn.className = value;
}

function resetPlayer() {
  progressBar.value = 0;
  player.currentTime = 0;
  changeButtonType(btnPlayPause, 'play');
}  

function exitFullScreen() {
if (document.exitFullscreen) {
    document.exitFullscreen();
} else if (document.msExitFullscreen) {
    document.msExitFullscreen();
} else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
} else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
}
}

function toggleFullScreen() {

if (player.requestFullscreen)
    if (document.fullScreenElement) {
        document.cancelFullScreen();
    } else {
        player.requestFullscreen();
    }
    else if (player.msRequestFullscreen)
    if (document.msFullscreenElement) {
        document.msExitFullscreen();
    } else {
        player.msRequestFullscreen();
    }
    else if (player.mozRequestFullScreen)
    if (document.mozFullScreenElement) {
        document.mozCancelFullScreen();
    } else {
        player.mozRequestFullScreen();
    }
    else if (player.webkitRequestFullscreen)
    if (document.webkitFullscreenElement) {
        document.webkitCancelFullScreen();
    } else {
        player.webkitRequestFullscreen();
    }
else {
    alert("Fullscreen API is not supported");
    
}
}
function speedvid(){
    resetPlayer();
    player.defaultPlaybackRate = 20.0;
    player.play();
}