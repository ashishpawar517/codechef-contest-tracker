CodeChef Tracker
A Next.js 13 app to browse and track CodeChef contests by division.
Built with React, TypeScript, Tailwind CSS, and Radix UI components.

Features
Browse contests by division (Div. 1, 2, 3, 4)
Search contests by name or ID
Pagination with configurable items per page
Cache invalidation & manual refresh
Responsive design with mobile support
Dark/light theme via theme-provider
Tech Stack
Next.js 13 (app directory)
React & TypeScript
Tailwind CSS
Radix UI (Tabs, Button, Input, …)
lucide-react icons
Demo
!screenshot

Getting Started
Prerequisites
Node.js ≥14
pnpm (or npm/yarn)
Install
Develop
Build & Start
Lint
Project Structure
app – Next.js app routes & global styles
components – UI components
contest-tracker.tsx – main tracker
contest-problems.tsx – contest list
api.ts – CodeChef API helpers
public – static assets
styles – global styles & Tailwind config
package.json – scripts & dependencies
LICENSE – GPL v3
Usage
Select a division tab (Div. 1–4).
Navigate pages with “Previous”/“Next”.
Search contests by name or ID.
Click the refresh icon to clear cache and reload.
Contributing
Fork the repo
Create a feature branch (git checkout -b feature/foo)
Commit your changes (git commit -m "feat: add foo")
Push to the branch (git push origin feature/foo)
Open a pull request
Please follow the existing code style and run pnpm run lint before submitting.

License
This project is licensed under the GNU General Public License v3.0 – see LICENSE.
