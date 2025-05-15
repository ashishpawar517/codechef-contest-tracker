
<h1 align="center"> CodeChef Contest Tracker
  <p align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/42ec3679-b07a-44d2-8b9b-48c8d552e9e8/deploy-status)](https://app.netlify.com/sites/matrix-visualizer/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev/)

  </p>
 </h1>
  

A Next.js 13 app to browse and track CodeChef contests by division.
Built with React, TypeScript, Tailwind CSS, and Radix UI components.

## Features
- Browse contests by division (Div. 1, 2, 3, 4)
- Search contests by name or ID
- Pagination with configurable items per page
- Cache invalidation & manual refresh
- Responsive design with mobile support

## Tech Stack
- Next.js 13 (app directory)
- React & TypeScript
- Tailwind CSS
- Radix UI (Tabs, Button, Input, …)
- lucide-react icons

## Live Demo
Click here - [Deployed on Vercel](https://codechef-contest-tracker.vercel.app/)

## Project Structure
- app – Next.js app routes & global styles
- components – UI components
- contest-tracker.tsx – main tracker
- contest-problems.tsx – contest list
- api.ts – CodeChef API helpers
- public – static assets
- styles – global styles & Tailwind config
- package.json – scripts & dependencies
- LICENSE – GPL v3

## Usage
- Select a division tab (Div. 1–4).
- Navigate pages with “Previous”/“Next”.
- Search contests by name or ID.
- Click the refresh icon to clear cache and reload.

## Contributing
- Fork the repo
- Create a feature branch (git checkout -b feature/foo)
- Commit your changes (git commit -m "feat: add foo")
- Push to the branch (git push origin feature/foo)
- Open a pull request
- Please follow the existing code style and run pnpm run lint before submitting.

## License
This project is licensed under the GNU General Public License v3.0 – see [LICENSE](/LICENSE).
