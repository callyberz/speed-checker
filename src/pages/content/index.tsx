import { StorageUtils } from '@src/utils/StorageUtils';
import './style.css';

function renderSpeedDisplay(videoElement: HTMLVideoElement) {
  const speedDisplay = document.getElementById('speedDisplay');
  if (speedDisplay) {
    return;
  }

  const customDiv = document.createElement('div');
  customDiv.style.position = 'absolute';
  customDiv.style.top = '0';
  customDiv.style.left = '0';
  customDiv.style.zIndex = '50';
  customDiv.id = 'speedDisplay';
  customDiv.innerText = `Your current speed is: ${StorageUtils.getSpeed()}x`;

  videoElement.parentNode?.appendChild(customDiv);

  videoElement.addEventListener('ratechange', function () {
    const speedDisplay = document.getElementById('speedDisplay');
    if (speedDisplay) {
      speedDisplay.innerText = `Your current speed is: ${videoElement.playbackRate}x`;
    }
  });
}

function observeVideoChanges() {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        (mutation.attributeName === 'src' || mutation.attributeName === 'href')
      ) {
        const videoElement = document.querySelector('video');
        if (videoElement) {
          renderSpeedDisplay(videoElement);
        }
      }
    }
  });

  const targetNode = document.documentElement;
  observer.observe(targetNode, { subtree: true, attributes: true });
}

function initializeExtension() {
  observeVideoChanges();
  const videoElement = document.querySelector('video');
  if (videoElement) {
    renderSpeedDisplay(videoElement);
  }
}

try {
  initializeExtension();
  console.log('Extension initialized');
} catch (e) {
  console.error('Error initializing extension:', e);
}
