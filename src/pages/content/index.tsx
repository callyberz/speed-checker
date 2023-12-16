import { StorageUtils } from '@src/utils/StorageUtils';
import './style.css';

function renderSpeedDisplay(videoElement: HTMLVideoElement) {
  const speedDisplay = document.getElementById('speedDisplay');
  if (speedDisplay) {
    speedDisplay.remove();
  }

  const customDiv = document.createElement('div');
  customDiv.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
  `;
  customDiv.id = 'speedDisplay';
  customDiv.textContent = `Your current speed is: ${StorageUtils.getSpeed()}x`;

  const updateSpeed = () => {
    const display = document.getElementById('speedDisplay');
    if (display) {
      display.textContent = `Your current speed is: ${videoElement.playbackRate}x`;
    }
  };

  videoElement.parentNode?.appendChild(customDiv);
  videoElement.addEventListener('ratechange', updateSpeed);
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

  observer.observe(document.documentElement, {
    subtree: true,
    attributes: true
  });
}

function initializeExtension() {
  try {
    observeVideoChanges();
    const videoElement = document.querySelector('video');
    if (videoElement) {
      renderSpeedDisplay(videoElement);
    }
    console.log('Extension initialized');
  } catch (error) {
    console.error('Error initializing extension:', error);
  }
}

initializeExtension();
