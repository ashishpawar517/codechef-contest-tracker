<h1 align="center"> CodeChef Contest Tracker
  <p align="center">

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?logo=vercel)](https://codechef-contest-tracker.vercel.app) [![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)](https://nextjs.org) [![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)](https://www.typescriptlang.org) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blue?logo=tailwind-css)](https://tailwindcss.com) [![Radix UI](https://img.shields.io/badge/Radix_UI-stable-3A0CA3?logo=radix-ui)](https://www.radix-ui.com) [![lucide-react](https://img.shields.io/badge/lucide--react-0.258.0-lightgrey?logo=react)](https://lucide.dev) [![pnpm](https://img.shields.io/badge/Package_Manager-pnpm-F69220?logo=pnpm)](https://pnpm.io)

  </p>
 </h1>


A Next.js 13 app to browse and track CodeChef contests by division.
Built with React, TypeScript, Tailwind CSS, and Radix UI components.

## Features

- Browse contests by division (Div. 1, 2, 3, 4)
<!-- - Search contests by name or ID -->
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
