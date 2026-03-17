# Lottery Game

A frontend lottery game application built with React and Vite. The app includes authentication, protected routes, live result fetching, local result caching, and a game interface that updates based on the latest available draw data.

## About The Repo

This project focuses on building an interactive lottery-style experience where users can:

- sign up and log in
- access protected game and results pages
- view the latest winning values
- refresh and browse fetched results
- work with changing UI state across multiple parts of the app

The app uses a backend API for authentication and result fetching, while the frontend handles rendering, routing, local caching, and state coordination.

## What I Learned

This project helped me get better at:

- handling real-time style UI updates by refreshing and displaying the latest result data
- managing multiple simultaneous pieces of state in React, such as result sets, selected ranges, totals, and pending transactions
- structuring a React app into reusable components
- protecting routes based on authentication state
- working with API calls using `axios`
- storing and reusing data with `localStorage`
- keeping UI and data flow organized across screens like login, game, and results
- handling date-based result fetching and displaying historical result data

## Features

- User registration and login
- Protected routes using `react-router-dom`
- Lottery game screen with dynamic result rendering
- Results page with date selection
- Cached result storage in `localStorage`
- API integration using environment variables
- Responsive frontend built with React, Vite, and Tailwind-based styling utilities

## Live Demo

Deployed app: https://lottery-game.janakmandavgade.dedyn.io/

## Tech Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Material UI

## Project Structure

```text
src/
  components/
    Login.jsx
    SignUp.jsx
    ProtectedRoute.jsx
    LotteryGame.jsx
    Results.jsx
  utils/
    fetchResults.js
    fetchBalance.js
```

## System Design

```text
User
  |
  v
Login / Signup Page
  |
  v
Backend Auth API
  |
  v
JWT Token Returned
  |
  v
localStorage
  |
  v
ProtectedRoute Check
  |
  +--> No token -> Redirect to /login
  |
  v
Game / Results Pages
  |
  +--> LotteryGame
  |      |
  |      +--> fetch latest results from Backend API
  |      +--> store results in localStorage as resultsMap
  |      +--> update winning values, current range, totals
  |      +--> sync pending transactions across UI sections
  |
  +--> Results
         |
         +--> select date
         +--> fetch historical results
         +--> render grouped ranges and generated times
```

### Main Frontend Flow

- `Login` and `SignUp` handle authentication requests
- `ProtectedRoute` controls access to `/game` and `/results`
- `LotteryGame` acts as the main state coordinator for the game screen
- `fetchResults.js` handles API communication for result data
- `Results` loads and displays historical result records

### State Design

The app manages multiple connected states at the same time:

- fetched result data
- current result slice or range
- refresh trigger updates
- grand total values
- pending transactions
- selected date for historical results

This setup helped organize state so different components could stay in sync without losing clarity in the UI flow.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment variables

Create a `.env` file in the root of the project and add:

```env
VITE_BACKEND_URL=your_backend_url_here
VITE_API_KEY=your_api_key_here
```

### 3. Start the development server

```bash
npm run dev
```

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint

## Challenges Faced

- Managing multiple simultaneous states across the game screen was one of the biggest challenges. I had to keep fetched results, selected ranges, totals, and pending transactions synchronized without breaking the user flow.
- Keeping data fresh while also avoiding unnecessary refetches required balancing API calls with `localStorage` caching.
- Handling date-based result history added extra complexity because the UI needed to switch between current and past results smoothly.
- Coordinating state across several components made it important to think carefully about which component should own which piece of data.
- Protecting authenticated routes while keeping the login flow simple was another useful challenge in app structure and navigation.

## Future Improvements

Some good next steps for this project could be:

- add better loading and error states across the app
- improve form validation and auth feedback
- add automated tests for components and flows
- make result updates more truly real-time with polling or sockets
- improve accessibility and mobile polish
- add user history, analytics, or transaction tracking

## Closing Note

This project was a strong learning exercise in building a frontend app that works with changing data, multiple connected states, and authenticated user flows. It gave me practical experience in combining UI logic, API integration, and state management into a single working product.
