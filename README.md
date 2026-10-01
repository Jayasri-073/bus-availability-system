# Bus Availability System

A simple frontend-only React app to search for available buses by route and date.
It uses dummy data stored in `src/data/buses.js` — no backend or database.

## Tech
React.js (Vite), plain CSS

## Run locally
```bash
npm install
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

## Build
```bash
npm run build
```

## How search works
The app filters the `buses` array where `bus.from` and `bus.to` match the selected cities.
If nothing matches, it shows "No buses available for this route."

## Try these searches
- Chennai → Madurai (2 buses)
- Trichy → Bangalore (1 bus)
- Madurai → Salem (no buses)

## Deploy
Push to GitHub, then import the repository in Vercel (Framework: Vite, defaults).
