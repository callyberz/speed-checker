import { StorageUtils } from '@src/utils/StorageUtils';
import './style.css';

function render() {
  const div = document.createElement('div');
  div.id = '__root';
  document.body.appendChild(div);

  const videoElement = document.querySelector('video');
  if (!videoElement) {
    console.error('video element not found');
    return;
  }

  // Create a custom div element for displaying the speed
  const customDiv = document.createElement('div');
  customDiv.style.position = 'absolute';
  customDiv.style.top = '0';
  customDiv.style.left = '0';
  customDiv.style.zIndex = '50';
  customDiv.id = 'speedDisplay'; // Set an ID for easy reference
  customDiv.innerText = `Your current speed is: ${StorageUtils.getSpeed()}x`;

  // Append the custom div to the videoElement's parent
  videoElement.parentNode?.appendChild(customDiv);

  // Listen for the 'ratechange' event on the video element
  videoElement.addEventListener('ratechange', function () {
    // Update the displayed speed when the playback speed changes
    const speedDisplay = document.getElementById('speedDisplay');
    if (speedDisplay) {
      speedDisplay.innerText = `Your current speed is: ${videoElement.playbackRate}x`;
    }
  });
}

function playbackRateInit() {
  // Create a MutationObserver instance
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      // Check if the mutation involves attributes or properties of the video element
      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        // Video source changed, reattach the playback rate listener
        attachPlaybackRateListener();
      }
    }
  });

  // Function to monitor changes in playbackRate
  function attachPlaybackRateListener() {
    const video = document.querySelector('video');

    if (video) {
      const rateChangeHandler = function () {
        console.log('Playback rate changed:', video.playbackRate);
        localStorage.setItem('speed', video.playbackRate.toString());
      };

      video.addEventListener('ratechange', rateChangeHandler);
    }
  }

  // Start observing changes in the video element
  const targetVideo = document.querySelector('video');
  if (targetVideo) {
    attachPlaybackRateListener();
    observer.observe(targetVideo, { attributes: true });
  }
}

// Monitor URL changes and send a message to the background script
function checkURLChange() {
  const newURL = window.location.href;
  if (newURL !== currentURL) {
    currentURL = newURL;
    render();
  }
}

// Set up interval to check for URL changes
let currentURL = window.location.href;
setInterval(checkURLChange, 500);

try {
  playbackRateInit();
  render();
  console.log('rendered');
} catch (e) {
  console.error(e);
}
