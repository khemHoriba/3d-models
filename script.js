const audioPlayer = document.getElementById("hotspot-audio");
const infoBox = document.getElementById("info-box");
const infoText = document.getElementById("info-text");

window.isAudioMuted = false;
const muteAudioBtn = document.getElementById("muteAudioBtn");

document.querySelectorAll(".Hotspot").forEach((hotspot) => {
  hotspot.addEventListener("click", () => {
    const audioSrc = hotspot.getAttribute("data-audio");
    const pointerName = hotspot.getAttribute("slot");

    const hotspotData = listItem[pointerName];

    if (hotspotData) {
      const mainDiv = document.querySelector(".mainsdivstyle");
      mainDiv.style.display = "block";

      const headingElement = mainDiv.querySelector("h2.cardTitle");
      if (headingElement && hotspotData.heading) {
        headingElement.textContent = hotspotData.heading;
      }

      // Update list items
      const listElement = mainDiv.querySelector("ul");
      if (listElement && hotspotData.items) {
        listElement.innerHTML = hotspotData.items
          .map((item) => `<li>${item}</li>`)
          .join("");
      }

      // Play audio
      if (audioSrc) {
        audioPlayer.src = audioSrc;
        audioPlayer.play().catch((e) => console.error("Audio error:", e));
      }

      if (window.isAudioMuted) {
        audioPlayer.muted = window.isAudioMuted;
      }

      // window.isAudioMuted = false;
      // muteAudioBtn.textContent = window.isAudioMuted ? " 🔇 " : " 🔈 ";
      // audioPlayer.muted = window.isAudioMuted;

      // Handle annotation text if needed
      const annotation =
        hotspot.querySelector(".HotspotAnnotation")?.textContent;
      if (annotation) {
        infoText.textContent = annotation;
        setTimeout(() => {
          infoBox.style.display = "none";
        }, 5000);
      }
    } else {
      console.warn("No data found for hotspot:", pointerName);
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const modelViewer = document.getElementById("modelViewer");
  const loaderContainer = document.getElementById("loader-container");
  const loaderText = document.getElementById("loader-text");
  const progressFill = document.getElementById("progress-fill");

  // Listen to model loading progress
  modelViewer.addEventListener("progress", (event) => {
    const progress = Math.round(event.detail.totalProgress * 100);
    loaderText.textContent = `Loading... ${progress}%`;
    progressFill.style.width = `${progress}%`;
  });

  modelViewer.addEventListener("load", () => {
    loaderText.textContent = `Loading... 100%`;
    loaderContainer.style.display = "none"; // Hide loader

    initialOrbit = modelViewer.cameraOrbit;
    initialTarget = modelViewer.cameraTarget;

    modelViewer.dismissPoster(); // Show model
  });

  // modelViewer.dismissPoster();
});

// audio muted btn
muteAudioBtn.addEventListener("click", () => {
  window.isAudioMuted = !window.isAudioMuted;
  muteAudioBtn.textContent = window.isAudioMuted ? " 🔇 " : " 🔈 ";
  audioPlayer.muted = window.isAudioMuted; // mute/unmute current audio
});

// close popup
document.querySelector(".close-btn").addEventListener("click", function () {
  const mainDiv = document.querySelector(".mainsdivstyle");
  mainDiv.style.display = "none";

  audioPlayer.pause();
  audioPlayer.currentTime = 0;

  // window.isAudioMuted = true;
  // muteAudioBtn.textContent = window.isAudioMuted ? " 🔇 " : " 🔈 ";
  // audioPlayer.muted = true;
});

// resetModel
// function resetModel() {
//   const modelViewer = document.getElementById("modelViewer");

//   // Reset rotation and camera
//   modelViewer.resetTurntableRotation();
//   modelViewer.cameraOrbit = "0deg 55deg 90deg";
//   modelViewer.cameraTarget = "0m 0m 0m";

//   // Reset animation and interaction
//   modelViewer.pause();
//   modelViewer.currentTime = 0;

//   // Hide your info panel if open
//   document.querySelector(".mainsdivstyle").style.display = "none";

//   // Reset hotspots audio if playing
//   const audioPlayer = document.getElementById("hotspot-audio");
//   audioPlayer.pause();
//   audioPlayer.currentTime = 0;
// }

function resetModel() {
  const modelViewer = document.getElementById("modelViewer");

  // Reset rotation & camera to initial values
  modelViewer.resetTurntableRotation();
  modelViewer.cameraOrbit = initialOrbit;
  modelViewer.cameraTarget = initialTarget;

  // Reset animation & interaction
  modelViewer.pause();
  modelViewer.currentTime = 0;

  // Hide info panel if open
  document.querySelector(".mainsdivstyle").style.display = "none";

  // Reset hotspot audio
  const audioPlayer = document.getElementById("hotspot-audio");
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}
