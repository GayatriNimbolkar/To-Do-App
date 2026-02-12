#To Do App

Got it 👍 — you want it in the **same clean formatted style with proper headings and code blocks**, like I gave from section 3 onward earlier.

Here is the full content starting from the top, written consistently and properly formatted.

You can paste this directly into your README.

---

# sportsexcitement-mobile-app

## Overview

The SportsExcitement Mobile App is the official mobile application for the SportsExcitement platform.

The application allows authenticated users to:

* Browse sports events
* Purchase tickets
* Manage bookings
* Access Gear Hub
* View and update profile information
* Receive notifications

This document explains how to set up the project, run it locally, connect to the backend, and follow development guidelines.

---

## Prerequisites

Make sure the following tools are installed:

* Node.js (version 18 or higher recommended)
* npm or yarn
* Git
* Expo CLI (if using Expo)
* Android Studio or Xcode (for emulators)

Verify installation:

```bash
node -v
npm -v
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://git.sportsexcitement.com/spex-app-devolpment/sportsexcitement-mobile-app/sportsexcitement-mobile-app.git
cd sportsexcitement-mobile-app
```

### Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## Environment Configuration

Create a `.env` file in the root of the project.

Example for local development:

```
API_BASE_URL=http://localhost:5000
```

Example for staging:

```
API_BASE_URL=https://staging-api.sportsexcitement.com
```

Important:

* Do not commit the `.env` file
* Always use environment variables for backend URLs

---

## Running the Application Locally

If using Expo:

```bash
npx expo start
```

If using React Native CLI:

```bash
npx react-native run-android
npx react-native run-ios
```

Ensure the backend server is running before starting the application.

---

## Backend Integration

The mobile application communicates with the backend using:

* REST APIs
* JWT-based authentication
* Environment-based base URL configuration

API calls are centralized inside:

```
/src/services/
```

Authentication tokens should be stored securely using Secure Storage or AsyncStorage, depending on project setup.

---

## Project Structure

```
sportsexcitement-mobile-app/
│
├── app/                  Application entry and routing (if using Expo Router)
├── components/           Reusable UI components
├── screens/              Screen-level components
├── services/             API communication layer
├── constants/            Global constants and configuration
├── assets/               Images, fonts, static files
├── package.json
└── README.md
```

---

## Branching Strategy

All development must follow this branching policy:

* Create feature branches from `dev`
* Do not create branches from `main` or `staging`
* All merge requests must target `dev`
* The `staging` branch is updated only by tech leads and maintainers

Example workflow:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/feature-name
```

---

## Development Guidelines

* Keep components modular and reusable
* Avoid hardcoded URLs
* Separate UI logic from business logic
* Follow existing folder structure and naming conventions
* Keep pull requests focused and small
* Test changes locally before opening a merge request

---

## Testing

If test scripts are configured:

```bash
npm test
```

---

## Deployment

Deployment to staging and production environments is managed through GitLab CI/CD by tech leads and DevOps.

Developers should not deploy directly to staging or production branches.

---

## Important Notes

* Do not push directly to `main`
* Do not push directly to `staging`
* Always branch from `dev`
* Do not commit environment files

---

This is now consistent, clean, professional, and properly formatted.
