# Taskly

**Taskly** is a full-stack task management platform built with **NestJS**, **TypeORM**, **Next.js**, and **TailwindCSS**.
The goal is to provide a collaborative environment where teams can manage tasks, assign responsibilities, and control access with role-based permissions.

---

## 🚀 Features

### Authentication & Authorization

- User registration and login with **JWT + Refresh Tokens**.
- Role-based access control (`admin`, `member`, `guest`).
- Secure password hashing with bcrypt.

### Teams

- Create, update, and delete teams.
- Add and remove members.
- Invite members via unique shareable links.
- List all teams a user belongs to.
- Role restrictions for actions (only team admins can remove members).

### Tasks

- Create, edit, and delete tasks.
- Assign tasks to specific members.
- Track task status: **To Do, In Progress, Done**.
- Filter tasks by status, assignee, or team.
- Comment system for each task.
- Activity log to track changes (e.g. _“John marked Task A as done”_).

### UI/UX

- Responsive and mobile-first design.
- Persistent dark mode.
- Intuitive dashboard with team and task overview.
- Toast notifications for quick feedback.
- Reusable components (buttons, forms, modals, etc).

### Extra Features

- Real-time updates with **WebSockets**.
- Export tasks to CSV/Excel.
- API documentation with Swagger.
- Unit and integration tests.
- CI/CD pipeline with GitHub Actions.
- Docker Compose setup for backend + PostgreSQL.

---

## 🛠️ Tech Stack

### Backend

- [NestJS](https://nestjs.com/) – Node.js framework
- [TypeORM](https://typeorm.io/) – ORM
- [PostgreSQL](https://www.postgresql.org/) – Database
- [JWT](https://jwt.io/) – Authentication
- [Swagger](https://swagger.io/) – API Documentation

### Frontend

- [Next.js](https://nextjs.org/) – React framework
- [TailwindCSS](https://tailwindcss.com/) – Styling

---

## 📂 Project Structure

```bash
/taskly
├── backend/        # NestJS + TypeORM API
├── frontend/       # Next.js + Tailwind client
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

- Node.js >= 18
- PostgreSQL (or use Docker)
- Yarn or npm

### Clone the repository

```bash
git clone https://github.com/gbatistaa/taskly.git
cd taskly
```

### Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app should now be running at:

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:4000`

---

## 🧪 Testing

### Backend

```bash
cd backend
npm run start:test
```

### Frontend

```bash
cd frontend
npm run test
```

---

## 📦 Deployment

- **Backend**: Render, Railway, or Heroku.
- **Database**: Neon, Supabase, or Railway.
- **Frontend**: Vercel or Netlify.

Use the provided `docker-compose.yml` to spin up a local PostgreSQL instance.

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use it as a template for your own applications.

---

## 👨‍💻 Author

Developed by **Gabriel** – Fullstack Developer passionate about building scalable web applications.
