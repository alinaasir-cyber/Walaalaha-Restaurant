# Walaalaha Restaurant - Customer Mobile App (React Native & Expo)

Cross-platform mobile application for **Walaalaha Restaurant** customers to browse food, order delivery/takeaway, pay via EVC Plus/Zaad, track cooking status, and reserve event halls.

## Getting Started

1. **Navigate to mobile directory:**
   ```bash
   cd mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npx expo start
   ```

4. **Run on Device or Emulator:**
   - Scan the QR code using the **Expo Go** app on your Android or iPhone.
   - Press `a` to run on Android Emulator.
   - Press `i` to run on iOS Simulator.

## Building Android APK & Production App:

To build a standalone APK without Android Studio:
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
This generates a downloadable `.apk` file for direct installation on Android phones.
