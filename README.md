# 🪔 छठ पूजा गीत — Chhath Puja Music Web Experience ☀️

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-Studio%20Mastering-E87C1A?style=for-the-badge&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**An authentic, cinematic, single-page Chhath Puja devotional music streaming website designed with Bihar Ghat sunrise aesthetics, glowing diya particle simulation, glassmorphism audio player, and a curated collection of nostalgic Chhath songs.**

[Live Demo](http://localhost:5173/) • [Features](#-features) • [Keyboard Shortcuts](#-keyboard-shortcuts) • [Song Collection](#-curated-song-collection) • [Getting Started](#-getting-started) • [Author](#-author)

</div>

---

## 🌅 The Cultural & Visual Atmosphere

This project captures the sacred atmosphere of **Chhath Puja Ghat at sunrise in Bihar & Purvanchal**:
- 🪔 **Deep Saffron & Gold Palette**: Inspired by marigolds, sunrise rays reflecting on the holy river Ganga, and traditional glowing earthen diyas (*दीया*).
- 🌊 **Cinematic Glassmorphic Stage**: Ultra-modern frosted glass controls integrated seamlessly with traditional Bihar cultural identity.
- ✨ **Canvas Diya Particle System**: Floating ember particles that rise dynamically, creating an authentic devotional ghat atmosphere.
- 🎚️ **Reactive Equalizer Waveform**: 20-band audio visualizer animating synchronously with live playback.

---

## 🚀 Key Features

- 🎵 **57+ Verified Authentic Audio Tracks**: Featuring the legendary evergreen voices of **Sharda Sinha**, **Anuradha Paudwal**, **Pawan Singh**, **Khesari Lal Yadav**, **Devi**, and **Kalpana Patwari**.
- 🎛️ **Studio Audio Mastering Engine (Web Audio API)**: Built-in dynamics compression, warm low-shelf bass enhancement (@140Hz), vocal clarity booster (@2.8kHz), and peak normalization preventing digital distortion or speaker crackle.
- 🔍 **Instant Search & Playlist Drawer (Press `Q`)**: Real-time multi-criteria filtering by song name, singer, or devotional category (Sharda Sinha, Pawan Singh, Khesari Lal, Surya Vandana, Aarti).
- ⌨️ **Full Keyboard Shortcuts**: Complete hands-free music control from your keyboard.
- 🔀 **Shuffle & 🔂 Repeat Engine**: Infinite loop or randomized queue playback.
- 📱 **100% Fully Responsive**: Pixel-perfect on 4K Desktops, Tablets, iPhones, and Android devices.

---

## ⌨️ Keyboard Shortcuts

| Key | Action | Description |
| :--- | :--- | :--- |
| <kbd>SPACE</kbd> | **Play / Pause** | Toggle active playback |
| <kbd>→</kbd> | **Seek Forward** | Jump forward by 5 seconds |
| <kbd>←</kbd> | **Seek Backward** | Jump backward by 5 seconds |
| <kbd>N</kbd> | **Next Track** | Play next track in queue |
| <kbd>P</kbd> | **Previous Track** | Go to previous track or restart current song |
| <kbd>S</kbd> | **Toggle Shuffle** | Toggle randomized track selection |
| <kbd>R</kbd> | **Toggle Repeat** | Loop current track continuously |
| <kbd>Q</kbd> | **Open Playlist Drawer** | Search & browse all 57+ songs |
| <kbd>ESC</kbd> | **Close Playlist** | Dismiss the drawer / modal |

---

## 🎶 Curated Song Collection

### 🌸 1. Sharda Sinha (The Queen of Bhojpuri & Maithili Chhath Geet)
- *Pahile Pahil Chhathi Maiya*
- *Kaanch Hi Baans Ke Bahangiya*
- *Kelwa Ke Paat Par*
- *Ho Dinanath*
- *Ugihen Suraj Gosaiyan Hey*
- *Marbo Re Sugwa Dhanukh Se*
- *Uthau Surooj Bhaile Bihaan*
- *Baanjhi Kewdwa Dhaile Thaadh*
- *Kartik Maas Ijoriya*
- *Kerwa Je Farela*
- *Kopi Kopi Bolele Chhathi Maiya*

### ⚡ 2. Pawan Singh Chhath Hits
- *Chhath Parab Bada Bhaari*
- *Matha Pa Daurwa Uthai Ke*
- *Jode Jode Nariyalwa Suruj Dev*
- *Parab Karab Ae Raja*
- *Dauwra Leke Jaib Ammaji*
- *Suraj Ke Rath Maiya*
- *Ae Rajao Chhath Ghate Chali*
- *Ae Saiya Jaldi Uthi Bhor Bhaile*
- *Sab Milke Aaj Bolo Jai Chhathi Maai*

### 🔥 3. Khesari Lal Yadav Chhath Hits
- *Aage Bilaiyya Pichhe Chhathi Maiya*
- *Chhoti Muti Beti Hamar*
- *Tuhu Kari Chhathi Ke Baratiya*
- *Chhathi Maiya Aai Na Duariya*
- *Chhathi Maiya Aeythin Aaj*
- *Dauwra Sajawal Ba Aai*
- *Baat Ghaat Saji Gel Aay Hey*
- *Sara Sukh Mai Charan Chhathi Maai Ke*

### 🪔 4. Anuradha Paudwal, Devi & Kalpana Patwari
- *Sakal Jagtarni Hey Chhathi Mata*
- *Ganga Ji Ke Nirmal Paniya Me*
- *Argh Ke Ber* / *Arghiya Ke Beri Bhaile*
- *Pahila Argh Surya Dev Ke* / *Dusra Argh Bhor Me*
- *Sandhya Argh Ke Bera* / *Usha Argh Suruj Mal Ke*
- *Ghatwa Sajal Ba Bhaav Se*
- *Chhathi Maai Ke Daurha*
- *Piyari Pahir La / Lal Chunariya*
- *Bartin Ke Angna Mein Chhathi Maai*

---

## 🛠️ Project Structure

```text
chhatpuja/
├── public/
│   ├── audio/              # 57+ high quality Chhath MP3 recordings (song01.mp3 - song57.mp3)
│   ├── album-art.jpg       # Chhath Puja Ghat artwork
│   ├── chhath-hero.jpg     # Hero background image
│   └── favicon.svg         # Sun & Diya favicon
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top bar, branding & social links (GitHub / Instagram)
│   │   ├── HeroTitle.jsx       # Hindi typography headline & badges
│   │   ├── PlayerCard.jsx      # Glassmorphic music card
│   │   ├── Controls.jsx        # Play, pause, skip, shuffle, repeat
│   │   ├── ProgressBar.jsx     # Smooth seek track with diya flame scrubber
│   │   ├── Waveform.jsx        # 20-band synchronized visualizer
│   │   ├── PlaylistDrawer.jsx  # Search, filter chips & 1-click play modal
│   │   ├── Particles.jsx       # Canvas floating diya ember particles
│   │   └── KeyboardHints.jsx   # Keyboard helper strip
│   ├── data/
│   │   └── songs.js            # 57 curated song metadata definitions
│   ├── hooks/
│   │   ├── usePlayer.js        # Core audio state machine & lifecycle events
│   │   └── useKeyboard.js      # Global keyboard shortcuts listener
│   ├── utils/
│   │   ├── audioMastering.js   # Web Audio dynamics compressor & studio EQ
│   │   └── audioSynth.js       # Devotional ambient tanpura/flute synthesizer
│   ├── App.jsx                 # Main application layout
│   ├── index.css               # Design tokens, keyframes, responsive breakpoints
│   └── main.jsx                # React DOM root entry
├── index.html                  # HTML5 shell with Google Fonts
├── package.json                # Dependencies & build scripts
└── vite.config.js              # Vite bundler configuration
```

---

## 📦 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** / **pnpm**

### 2. Installation
Clone this repository and install dependencies:

```bash
git clone https://github.com/aryanshaw421-alt/chhatpuja.git
cd chhatpuja
npm install
```

### 3. Running Locally
Start the development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173/` to experience the music player.

### 4. Building for Production
To generate an optimized production bundle:

```bash
npm run build
```

The output will be built into the `dist/` directory, ready to deploy to **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 👨‍💻 Author

**Aryan Kumar Shaw**

- 🐙 **GitHub**: [@aryanshaw421-alt](https://github.com/aryanshaw421-alt)
- 📸 **Instagram**: [@aryan_m340i](https://www.instagram.com/aryan_m340i?igsh=OWZocGlzMTVyMTI2)

---

<div align="center">

**जय छठी मईया 🙏**  
*आस्था • श्रद्धा • सूर्य उपासना*

</div>
