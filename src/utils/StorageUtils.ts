export const YT_PLAYBACK_RATE_KEY = 'yt-player-playback-rate';

export const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// get from local or session storage
function getStorage(key: string) {
  const value = localStorage.getItem(key) || sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

function getSpeed() {
  return getStorage(YT_PLAYBACK_RATE_KEY)?.data || 1;
}

export const StorageUtils = {
  getSpeed,
  getStorage
};
