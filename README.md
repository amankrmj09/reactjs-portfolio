<div align="center">

# 🚀 Portfolio Website

A dynamic, interactive, and responsive personal portfolio website built with modern web technologies to showcase projects, skills, and experiences.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11+-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

### **[🌐 Visit My Portfolio: https://www.amankrmj.dev/](https://www.amankrmj.dev/)** 

</div>

This frontend application is part of a full-stack portfolio system. It focuses on delivering a visually stunning user experience while consuming data from a robust Micronaut backend.

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Docker Setup](#docker-setup)
- [Related Projects](#related-projects)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)

## Features

- **Modern UI/UX**: Beautiful, responsive design with glassmorphism elements and smooth animations.
- **Dynamic Content**: Fetches real-time portfolio data (works, certificates, resume) from the backend.
- **Interactive Animations**: Advanced transitions and scroll effects using Framer Motion and Lenis.
- **Theme Support**: Seamlessly adapts to different screen sizes and environments.

## Tech Stack

- **React 18** & **Vite**
- **React Router** for routing
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API requests

## Architecture Overview

This repository contains the client-facing frontend for the portfolio ecosystem. It is designed to be fully modular and scalable.

## Docker Setup

This application is fully containerized using a multi-stage Docker build. It uses Node.js to build the static files and an **NGINX** server to serve them, ensuring high performance and a tiny image footprint.

### 1. Build the Docker Image
You can pass the backend API URL as a build argument (`VITE_BASE_URL`) so the frontend knows where to fetch data:

```bash
docker build --build-arg VITE_BASE_URL=https://api.yourdomain.com -t reactjs-portfolio .
```

### 2. Run the Container
Run the built image, mapping NGINX's port 80 to your host machine's port:

```bash
docker run -p 3000:80 reactjs-portfolio
```

### Custom NGINX Configuration
The project includes a custom `nginx.conf` file that is automatically copied into the Docker container. It is configured to:
- Serve the compiled React static files from `/usr/share/nginx/html`.
- Handle React Router's client-side routing by redirecting all missing paths to `index.html` (`try_files $uri $uri/ /index.html;`).

## Related Projects

The portfolio ecosystem consists of three main components:
- **[Portfolio Frontend (ReactJS)](https://github.com/amankrmj09/reactjs-portfolio)**: The public-facing interactive portfolio (This repository).
- **[Portfolio Admin (ReactJS)](https://gitlab.com/amankrmj09/reactjs-admin)**: The secure CMS dashboard to manage portfolio content.
- **[Portfolio Backend (Micronaut)](https://gitlab.com/amankrmj09/micronaut-portfolio)**: The robust REST API providing data to both frontends.

## Folder Structure

```text
src/
├── components/       # Shared reusable UI components (layout, shared, animations)
├── context/          # React Context providers (AppContext)
├── features/         # Feature-based modules encapsulating UI and API logic
│   ├── certificates/ # Certificates section and components
│   ├── contact/      # Contact dialog and API services
│   ├── home/         # Hero section, about section, social links
│   ├── profile/      # Profile API services
│   ├── resume/       # Resume page and timeline components
│   ├── site-config/  # Site configuration API services
│   └── works/        # Projects and works display components
├── lib/              # Configuration for third-party libraries (e.g., Axios)
└── main.jsx          # Application entry point
```

## Screenshots

*(Screenshots will be added later)*
