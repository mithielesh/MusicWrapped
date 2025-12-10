# 🎵 YouTube Music Wrapped 2025

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg?style=flat&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38b2ac.svg?style=flat&logo=tailwind-css)

A privacy-focused, client-side application that generates a "Spotify Wrapped"-style year-in-review for YouTube Music users. By analyzing your Google Takeout history, it creates an immersive, animated summary of your top artists, songs, and listening habits.

![Project Preview](public/preview-banner.png)

## ✨ Features

-   **🔒 100% Privacy Focused:** All data processing happens locally in your browser. No personal data is ever uploaded to a server.
-   **📊 Deep Analytics:** Visualizes listening patterns, day/night activity, and top genres.
-   **🫧 Interactive Visuals:** Physics-based Bubble Charts (D3.js) and spinning Vinyl records.
-   **🎨 Dynamic Theming:** The UI adapts its color palette based on your Top Artist's artwork.
-   **📸 Shareable Collectibles:** Generates high-resolution, Instagram-story-ready posters of your year.
-   **🖼️ High-Res Artwork:** Automatically fetches album art via iTunes API.

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/ytm-wrapped-2025.git](https://github.com/yourusername/ytm-wrapped-2025.git)
    cd ytm-wrapped-2025
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

## 📂 How to Get Your Data

To use this app, you need your **YouTube Watch History** JSON file.

1.  Go to [Google Takeout](https://takeout.google.com/).
2.  Deselect all, then find and check **YouTube and YouTube Music**.
3.  Click "Multiple formats" and select **JSON** for history.
4.  Download the export.
5.  Extract the zip and locate: `Takeout/YouTube and YouTube Music/history/watch-history.json`.
6.  Drop this file into the app!

## 🛠️ Tech Stack

-   **Frontend:** React (Vite)
-   **Styling:** Tailwind CSS
-   **Animations:** Framer Motion
-   **Data Visualization:** D3.js (Bubble Charts)
-   **Image Generation:** html2canvas
-   **APIs:** iTunes Search API (Metadata & Artwork)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

##  Acknowledgements

-   [Framer Motion](https://www.framer.com/motion/) for the butter-smooth animations.
-   [Lucide](https://lucide.dev/) for the beautiful icons.
-   [D3.js](https://d3js.org/) for the physics engine.

---

<p align="center">
  Built with ❤️ for music lovers.
</p>