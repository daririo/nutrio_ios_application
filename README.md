# Nutrio App

A React Native food scanning app built with Expo Go, connected to a Node.js + Express + TypeORM backend using PostgreSQL.

---

## 📱 Mobile App (Expo)

### Requirements
- Node.js installed
- Expo Go app installed on your phone  
  - iOS: App Store  
  - Android: Google Play Store  
- Same WiFi network for phone + computer

---

### Frontend Setup

#### 1. Install dependencies from myApp folder:

```bash
npm install
```

#### 2. Add Enviroment file:
Create a .env file in the root of myApp and add your backend URL:
```bash
EXPO_PUBLIC_BACKEND_URL=http://192.XXX.X.X:3000
```

#### 3. Start Frontend:

```bash
npm run start
```
Then scan QR code from terminal.

### Backend Setup (Express + TypeORM + PostgreSQL)

#### 1. Install dependencies (from backend folder)

```bash
npm install
```

#### 2. Create PostgreSQL db

```bash
nurtio_app
```

#### 3. Add Enviroment file

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=nutrio_app
```
#### 4. Start Backend

```bash
npm run dev
```