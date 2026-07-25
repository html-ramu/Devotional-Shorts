# 📱 Devotional Shorts

A lightweight, distraction-free Progressive Web App (PWA) built to simulate the YouTube Shorts experience for elderly users. Designed specifically for simplicity, high performance on low-end Android devices, and seamless vertical scrolling through devotional content.

🌐 **Live Demo:** [https://html-ramu.github.io/Devotional-Shorts/](https://html-ramu.github.io/Devotional-Shorts/)

---

## ✨ Features

* **👵 Elderly-Friendly UI:** Minimalist, clutter-free interface with a familiar YouTube-style dark theme and non-intrusive placeholder controls.
* **👆 Simple Touch Gestures:** Single-tap anywhere on the screen to globally unmute audio and toggle Play/Pause.
* **🎞️ Smooth 60fps Scrolling:** Uses native CSS Scroll Snap (`scroll-snap-type: y mandatory`) for buttery-smooth vertical navigation without heavy gesture libraries.
* **🚀 Hardware & Memory Optimized:** Implements the `IntersectionObserver` API to dynamically play the active video while pausing and unloading off-screen videos, preventing memory crashes on low-end smartphones.
* **♾️ Infinite Loop Navigation:** Automatically loops back to the first video after scrolling past the final short for endless, uninterrupted playback.
* **📲 PWA Ready:** Fully installable to Android home screens as a standalone native app experience with custom app icons and offline caching.

---

## 🛠️ Tech Stack

* **HTML5:** Semantic structure and media playback.
* **CSS3:** Dynamic viewport sizing (`100dvh`), custom animations, and GPU-accelerated scroll snapping.
* **Vanilla JavaScript:** DOM manipulation, IntersectionObserver memory management, and touch interaction handling (No React, libraries, or frameworks).
* **Progressive Web App (PWA):** `manifest.json` and Service Worker integration for native app installation.

---

## 📁 Project Structure

```text
Devotional-Shorts/
│
├── index.html              # Main Shorts feed interface
├── style.css               # Complete styling and scroll-snap physics
├── script.js               # Video loading, IntersectionObserver, and interaction logic
├── manifest.json           # PWA configuration and home screen icon mapping
├── service-worker.js       # Offline caching and asset management
├── README.md               # Project documentation
│
├── assets/
│   ├── icons/
│   │   ├── favicon.png     # AI-generated YouTube-style app icon
│   │   └── *.svg           # UI control placeholders (like, comment, share, etc.)
│   └── images/
│
├── data/
│   └── videos.json         # Dataset containing titles and paths for 25 devotional videos
│
└── videos/
    ├── video01.mp4         # Local MP4 devotional video files
    └── ... (up to video25.mp4)