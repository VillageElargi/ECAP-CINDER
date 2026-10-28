# 🔥 Cinder - Safety Inspection Swipe App (ECAP Escape Game)

This project is an immersive mobile application developed for the **ECAP** escape room. Dubbed **Cinder** (a parody of Tinder), this app forces players to review various household and industrial electronic devices to gather "matches" and unlock a critical **SYNC code**.

---

## 🕹️ Concept & Gameplay

- **The Illusion:** The screen displays a swiping interface closely mimicking a famous dating app, but instead of profiles, it shows electrical appliances (e.g., hairdryers, power strips, kettles).
- **The Escape Room Pitch:** Players act as safety inspectors auditing an unstable facility. They must identify which devices are hazardous and which ones are safe to prevent an electrical fire or short circuit.
- **The Mechanics (Swipe Right/Left):**
  - **Swipe Left (Dislike/Danger):** The item is visibly damaged, frayed, overloaded, or unsafe.
  - **Swipe Right (Like/Safe):** The item is perfectly intact and secure.
- **The Win Condition (Getting Matches):**
  - Successfully sorting the objects triggers "Matches" with specific devices.
  - Collecting the correct matches reveals hidden clues, ultimately handing the players their next **SYNC code** to bypass the room's security system.

---

## 🛠️ Tech Stack

The application is built using **Expo SDK 57** and **React Native 19**:

- **Framework:** [Expo](https://expo.dev) (Managed workflow, optimized for smooth mobile or tablet deployment).
- **Navigation:** `expo-router` for file-based routing.
- **Swipe Animations:** Powered by `react-native-reanimated` and `react-native-gesture-handler` to deliver fluid, physics-based card-swiping mechanics.
- **Haptics:** `expo-haptics` to provide physical vibration feedback (tactile thuds on rejections, crisp clicks on matches).
- **Visuals:** `expo-linear-gradient` for background styling and `expo-image` for high-performance card loading.
- **Icons:** `lucide-react-native` for the interface controls and status icons.
- **Localization:** `react-i18next` and `react-native-localize` to support multi-language escape room groups.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org) installed on your development machine.

### 1. Clone the project and install dependencies

```bash
git clone <your-repository-url>
cd cinder
npm install
```

### 2. Start the development server

```bash
npm run start
```

### 3. Run on device / simulator

From the Expo interactive terminal:

- **iOS:** Press `i` to launch the iPhone/iPad Simulator.
- **Android:** Press `a` to run on an Android device or emulator.
- **Web:** Press `w` or run `npm run web` to instantly test card swipe animations in your browser.

---

## 📁 Project Structure (Overview)

- `/app`: App screens, swipe views, and victory code routes managed by `expo-router`.
- `/components`: The core swipeable card deck component, action buttons (Heart/Cross), and matching modals.
- `/assets`: High-quality images of appliances (both clean and dangerously damaged versions) and feedback audio.

---

## ⚙️ Room Maintenance & Game Master Info

- **SYNC Code Customization:** To refresh the room puzzles, hold the Cinder logo for 5s.
- **Kiosk Mode:** To prevent players from wandering into the device settings or closing the game, ensure the phone or tablet is locked into **Single App Mode** (iOS Guided Access / Android Screen Pinning) during gameplay.

---

EXCLUSIVE PROPERTY OF ALYEM SÀRL © 2026
