<div align="center">

# 🚀 Taskly

**A modern, collaborative task management platform for teams**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Documentation](#-api-documentation) • [License](#-license)

</div>

---

## 📋 About

**Taskly** is a full-stack task management platform designed for teams that need to collaborate efficiently. Built with modern technologies, it provides an intuitive interface for organizing tasks in a Kanban-style board with drag-and-drop functionality.

Whether you're managing a small project or coordinating a large team, Taskly offers role-based access control, real-time updates, and a clean, responsive UI that works seamlessly across devices.

---

## ✨ Features

### 👥 Team Management

- **Create and manage teams** with custom information (name, company, description)
- **Role-based access control** with `owner` and `member` roles
- **Invite members** to collaborate on team projects
- **View all teams** you belong to in a unified dashboard

### 📝 Kanban Task Board

- **Customizable columns** with names and colors
- **Drag-and-drop tasks** between columns for seamless workflow
- **Drag-and-drop columns** to reorder your board
- **Task details** including title, description, and position tracking
- **Visual organization** with color-coded columns

### 🔐 Authentication & Security

- **JWT-based authentication** with access and refresh tokens
- **Secure password hashing** with bcrypt
- **HTTP-only cookies** for token storage
- **Protected routes** and API endpoints

### 🎨 Modern UI/UX

- **Responsive design** that works on desktop, tablet, and mobile
- **Dark mode** with a sleek, modern aesthetic
- **Toast notifications** for real-time feedback
- **Loading states** and smooth transitions

---

## 🛠 Tech Stack

### Backend

| Technology | Description |
|------------|-------------|
| **NestJS 11** | Progressive Node.js framework for scalable server-side applications |
| **TypeORM 0.3** | Object-Relational Mapping for TypeScript and JavaScript |
| **PostgreSQL** | Powerful, open-source relational database |
| **JWT** | JSON Web Tokens for secure authentication |
| **Swagger** | API documentation and testing interface |
| **class-validator** | Decorator-based validation for DTOs |
| **bcrypt** | Password hashing library |

### Frontend

| Technology | Description |
|------------|-------------|
| **Next.js 16** | React framework with server-side rendering and app router |
| **React 19** | Latest React with concurrent features |
| **TypeScript 5** | Type-safe JavaScript development |
| **TailwindCSS 4** | Utility-first CSS framework |
| **Jotai** | Primitive and flexible state management |
| **Axios** | Promise-based HTTP client |
| **Sonner** | Toast notifications library |

---

## 📁 Project Structure

```
taskly/
├── backend/                    # NestJS API Server
│   ├── src/
│   │   ├── data/              # Database configuration & migrations
│   │   │   ├── migrations/    # TypeORM migrations
│   │   │   └── data-source.ts # DataSource configuration
│   │   ├── modules/
│   │   │   ├── auth/          # Authentication (login, JWT)
│   │   │   ├── user/          # User management
│   │   │   ├── team/          # Team CRUD operations
│   │   │   ├── team-member/   # Team membership management
│   │   │   ├── task/          # Task management
│   │   │   ├── task-column/   # Kanban column management
│   │   │   ├── refresh-token/ # Token refresh handling
│   │   │   └── common/        # Shared entities and utilities
│   │   └── main.ts            # Application entry point
│   └── package.json
│
├── frontend/                   # Next.js Client Application
│   ├── app/
│   │   ├── (auth)/            # Auth pages (login, signup)
│   │   ├── (main)/            # Main app pages (dashboard, team)
│   │   └── _extra/            # Shared utilities, API, atoms
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **PostgreSQL** (local or cloud instance like Neon/Supabase)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/gbatistaa/taskly.git
cd taskly
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=4000
DB_PORT=5432
HOST=localhost
DB_USER=your_username
PASSWORD=your_password
DATABASE=taskly
NODE_ENV=development
JWT_SECRET=your_super_secret_key
DB_TYPE=postgres
```

Run migrations and start the server:

```bash
npm run migration:run
npm run start:dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Access the Application

| Service | URL |
|---------|-----|
| Frontend | <http://localhost:3000> |
| Backend API | <http://localhost:4000> |
| Swagger Docs | <http://localhost:4000/api> |

---

## 📖 API Documentation

The API is fully documented with **Swagger**. After starting the backend, visit:

```
http://localhost:4000/api
```

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | User login |
| `POST` | `/auth/refresh` | Refresh access token |
| `POST` | `/user/create` | Register new user |
| `GET` | `/user/teams` | Get user's teams |
| `POST` | `/team` | Create new team |
| `GET` | `/team/:id` | Get team by ID |
| `POST` | `/task-column` | Create task column |
| `POST` | `/task` | Create task |

---

## 🗄 Database Migrations

Taskly uses TypeORM migrations for database schema management:

```bash
# Generate a new migration based on entity changes
npm run migration:generate -- src/data/migrations/MigrationName

# Run pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert

# Create an empty migration
npm run migration:create -- src/data/migrations/MigrationName
```

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

---

## 🚢 Deployment

### Backend

Recommended platforms:

- **Railway** - Easy PostgreSQL + Node.js hosting
- **Render** - Free tier available
- **Fly.io** - Edge deployment

### Frontend

- **Vercel** - Optimized for Next.js (recommended)
- **Netlify** - Static and SSR support

### Database

- **Neon** - Serverless PostgreSQL
- **Supabase** - PostgreSQL with extras
- **Railway** - Managed PostgreSQL

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Gabriel Batista**

Fullstack Developer passionate about building scalable web applications.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gbatistaa)

</div>

---

<div align="center">

Made with ❤️ and ☕

</div>
