document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("shorts-container");
  let videosData = [];
  let userHasInteracted = false; // Tracks if user tapped screen to enable audio

  // 1. Fetch Video List (with fallback if running locally without JSON)
  try {
    const response = await fetch("data/videos.json");
    videosData = await response.json();
  } catch (error) {
    console.warn("Could not load videos.json. Using fallback auto-generation.");
    for (let i = 1; i <= 25; i++) {
      const num = i < 10 ? `0${i}` : i;
      videosData.push({
        id: i,
        title: `Devotional Short ${i}`,
        file: `videos/video${num}.mp4`
      });
    }
  }

  // 2. Render Videos into DOM
  videosData.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "short-slide";
    slide.dataset.index = index;

    slide.innerHTML = `
      <video src="${item.file}" 
             loop 
             muted 
             playsinline 
             preload="metadata">
      </video>
      
      <div class="play-indicator" id="indicator-${index}">⏸️</div>

      <div class="sidebar-controls">
        <div class="control-item" onclick="location.reload()">
          <div class="control-icon"><img src="assets/icons/like.svg" alt="" onerror="this.outerHTML='👍'"></div>
          <span class="control-text">Like</span>
        </div>
        <div class="control-item" onclick="location.reload()">
          <div class="control-icon"><img src="assets/icons/comment.svg" alt="" onerror="this.outerHTML='💬'"></div>
          <span class="control-text">0</span>
        </div>
        <div class="control-item" onclick="location.reload()">
          <div class="control-icon"><img src="assets/icons/share.svg" alt="" onerror="this.outerHTML='↗️'"></div>
          <span class="control-text">Share</span>
        </div>
      </div>

      <div class="video-info">
        <div class="video-title">${item.title}</div>
      </div>
    `;

    // Tap to Unmute / Play / Pause logic
    const video = slide.querySelector("video");
    const indicator = slide.querySelector(".play-indicator");

    slide.addEventListener("click", (e) => {
      // Ignore clicks if user tapped the right sidebar icons
      if (e.target.closest(".sidebar-controls")) return;

      // First tap on screen: Enable audio globally!
      if (!userHasInteracted || video.muted) {
        userHasInteracted = true;
        video.muted = false;
        if (video.paused) video.play();
        showIndicator(indicator, "🔊");
        return;
      }

      // Subsequent taps: Toggle Play/Pause
      if (video.paused) {
        video.play();
        showIndicator(indicator, "▶️");
      } else {
        video.pause();
        showIndicator(indicator, "⏸️");
      }
    });

    container.appendChild(slide);
  });

  // Helper: Flash play/pause/sound icon on screen tap
  function showIndicator(el, icon) {
    el.textContent = icon;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 600);
  }

  // 3. Performance Optimization: IntersectionObserver
  // Only play the video currently visible; pause & reset all others.
  const observerOptions = {
    root: container,
    threshold: 0.6 // Trigger when 60% of the slide is visible
  };

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target.querySelector("video");
      if (!video) return;

      if (entry.isIntersecting) {
        // If the user already tapped once, play next videos WITH sound!
        if (userHasInteracted) {
          video.muted = false;
        }
        
        video.play().catch(err => console.log("Autoplay blocked by browser policy:", err));
        
        // Check for Infinite Loop (If at Video 25, prepare to jump to 1)
        const currentIndex = parseInt(entry.target.dataset.index);
        if (currentIndex === videosData.length - 1) {
          setupInfiniteLoop();
        }
      } else {
        video.pause();
        video.currentTime = 0; // Reset video to start to save memory
      }
    });
  }, observerOptions);

  document.querySelectorAll(".short-slide").forEach((slide) => {
    videoObserver.observe(slide);
  });

  // 4. Infinite Loop Behavior (Video 25 -> Video 1)
  let loopListenerAdded = false;
  function setupInfiniteLoop() {
    if (loopListenerAdded) return;
    loopListenerAdded = true;

    container.addEventListener("scroll", () => {
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
      if (isAtBottom) {
        setTimeout(() => {
          container.scrollTo({ top: 0, behavior: "smooth" });
        }, 500);
      }
    });
  }
});