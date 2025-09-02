# 🚀 Express + Dockerized PostgreSQL Backend

## Summary

This project is a modern full-stack backend starter featuring a Node.js/Express API connected to a PostgreSQL database running in a Docker container. It demonstrates secure environment variable management, production-grade architecture, RESTful CRUD endpoints, and testing setup. The stack is suitable for rapid prototyping and scales well for larger applications.

---

## 🏆 Key Features & Achievements

- **Modern DevOps Structure:** Organized backend codebase with npm scripts, Docker for database, and .env management.
- **Dockerized PostgreSQL:** Local development database runs in an isolated, reproducible container.
- **RESTful Express API:** All CRUD routes implemented with robust error handling.
- **Environment Security:** Database credentials and config managed via dotenv.
- **Industry Tools:** Endpoints tested with Postman & ready for supertest/Jest integration.

---

## 🔧 Project Architecture

- **Express.js Backend:** Handles routes, validation, business logic.
- **PostgreSQL:** Production-grade database entirely in Docker.
- **Secure Config:** All sensitive info kept out of code with `.env` files.

![Express + Dockerized Postgres Architecture](https://i.imgur.com/ZZLBxyL.png)

---

## 🛠️ Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js + npm](https://nodejs.org/)

---

### 1. Clone & Setup Backend

```bash
git clone <repo-url>
cd backend
npm install
cp .env.example .env  # Create your actual .env if needed

PGHOST=localhost
PGPORT=5432
PGDATABASE=devops_db
PGUSER=postgres
PGPASSWORD=postgres

docker run --name devops-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=devops_db \
  -p 5432:5432 -d postgres

npm run dev           # Runs with nodemon for auto-restart on changes
npm start             # Runs normally

** Create database Table**
docker exec -it devops-postgres psql -U postgres -d devops_db

In the SQL shell (devops_db=#), paste:

sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

http://localhost:4000

**Get all tasks**
GET /tasks

json
[
  { "id": 1, "title": "Sample Task", "completed": false }
]


**Get a Single Task**
GET /tasks/:id
Response

json
{ "id": 1, "title": "Sample Task", "completed": false }

3. Create a Task
POST /tasks
Body
json
{ "title": "Do homework", "completed": false }
Response

json
{ "id": 2, "title": "Do homework", "completed": false }
4. Update a Task
PUT /tasks/:id
Body
json
{ "title": "Do homework", "completed": true }
Response

json
{ "id": 2, "title": "Do homework", "completed": true }
5. Delete a Task
DELETE /tasks/:id
Response

json
{ "message": "Task deleted" }
```

# DevOps Fullstack Portfolio – Module 1: Backend, Dockerized Database, & API Testing

## Overview

This module demonstrates a practical and modern DevOps setup:

- Node.js/Express.js REST API for "tasks"
- PostgreSQL database running in Docker
- Full CRUD support for tasks (Create, Read, Update, Delete)
- Environment configuration via `.env`
- Automated API testing with **Jest** and **Supertest**
- Manual API testing with Postman or Insomnia

---

## Architecture

![Backend and Dockerized Postgres](https://i.imgur.com/ViK4DbC.png)

- **Backend:** Express.js REST API (`backend/`) running locally.
- **Database:** PostgreSQL in a Docker container (`devops-postgres`).
- **.env:** All DB credentials and settings managed via environment variables.
- _Frontend and full containerization come in later modules!_

---

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker