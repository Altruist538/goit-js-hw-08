import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const PLAYER_CURRENT_TIME = 'videoplayer-current-time';
const playerEl = document.querySelector('#vimeo-player');
const player = new Player(playerEl);

const saveCurrentTime = throttle(() => {
  player.getCurrentTime().then(currentTime => {
    localStorage.setItem(PLAYER_CURRENT_TIME, JSON.stringify(currentTime));
  });
}, 1000);
player.on('timeupdate', saveCurrentTime);

function restorePlaybackTime() {
  const currentTime = localStorage.getItem(PLAYER_CURRENT_TIME);
  player.setCurrentTime(currentTime || 0);
}
restorePlaybackTime();
