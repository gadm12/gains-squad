# Gains Squad

Gains Squad is a full-stack fitness and workout tracking application
built to help users discover exercises, create workout sessions, record
individual sets, and track fitness-related data through a responsive web
interface.

The project was developed as a full-stack software engineering capstone
and demonstrates production deployment, REST API development, secure
authentication, relational database design, third-party API integration,
automated testing, containerization, and continuous integration.

## Live Application

**Live Site:** https://gains-squad.duckdns.org/

## Features

- User registration, login, logout, and persistent authentication
- JWT authentication using secure HttpOnly cookies
- Short-lived access tokens and refresh-token rotation
- Refresh-token blacklisting on logout
- Protected API routes for authenticated users
- Exercise library powered by ExerciseDB
- Paginated exercise browsing
- Individual exercise detail pages
- Workout session creation and management
- Workout set creation, editing, and deletion
- Workout history
- Fitness and calorie-related functionality
- Responsive React user interface
- Client-side routing with React Router
- Reusable API service modules using Axios
- Redis-backed Django caching
- PostgreSQL persistent data storage
- HTTPS production deployment
- Automated backend and end-to-end testing
- GitHub Actions continuous integration

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS
- Cypress
- React Icons

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- PostgreSQL
- Redis
- django-redis
- Gunicorn

### DevOps & Deployment

- Docker
- Docker Compose
- Nginx
- AWS EC2
- GitHub Actions
- Let's Encrypt / Certbot
- DuckDNS

## Architecture

Gains Squad uses a containerized full-stack architecture.

In production, Nginx serves the compiled React application over HTTPS
and proxies `/api/` requests to the Django backend. Django communicates
with PostgreSQL for persistent application data and Redis for caching.

```text
Browser
   |
   | HTTPS
   v
Nginx / React
   |
   | /api/
   v
Django REST Framework / Gunicorn
   |                  |
   v                  v
PostgreSQL          Redis
```

Docker Compose manages the application services and allows the frontend,
backend, database, and Redis services to run together as a single
application stack.

## Authentication

Authentication is implemented with Django REST Framework and Simple JWT.

After a successful signup or login, the backend issues:

- a short-lived access token
- a longer-lived refresh token

Both tokens are stored in HttpOnly cookies so client-side JavaScript
cannot directly access them.

Production authentication cookies are configured with secure cookie
settings and are transmitted over HTTPS. The application can refresh an
expired access token using the refresh cookie without requiring the user
to log in again.

Refresh tokens are rotated and blacklisted, and logout invalidates the
refresh token and clears the authentication cookies.

## API Organization

The backend is organized into separate Django applications for major
areas of functionality:

```text
server/
├── user_app/
├── workout_app/
└── calories_app/
```

The API includes endpoints for:

- user signup
- user login
- user logout
- authenticated user information
- JWT refresh
- workout sessions
- workout sets
- calorie-related functionality

Protected endpoints require an authenticated user.

## ExerciseDB Integration

Gains Squad integrates with ExerciseDB to provide an exercise library.

Users can:

- browse exercises
- move between paginated results
- view individual exercises
- use exercise information while planning workouts

Third-party API communication is kept in dedicated frontend service
modules instead of being performed directly inside React components.

## Workout Tracking

Authenticated users can create and manage workout sessions.

Workout functionality includes:

- creating workout sessions
- viewing workout history
- viewing individual sessions
- updating sessions
- deleting sessions
- adding sets to sessions
- viewing individual sets
- updating sets
- deleting sets

Workout data is associated with the authenticated user through the
backend API.

## Testing

The project includes automated backend and frontend testing.

### Django / DRF Tests

Backend tests cover core API behavior including:

- user signup
- user login
- authenticated user information
- logout
- authentication requirements
- workout session endpoints
- workout creation and retrieval

Authentication tests verify the JWT cookie-based authentication flow
rather than exposing tokens to frontend JavaScript.

Run the backend test suite with:

```bash
docker compose exec backend python manage.py test
```

Django configuration can also be validated with:

```bash
docker compose exec backend python manage.py check
```

### Cypress End-to-End Tests

Cypress is used to test the application from the user's perspective,
including authentication and protected application flows.

Run Cypress interactively:

```bash
npx cypress open
```

Or run the complete Cypress suite headlessly:

```bash
npx cypress run
```

## Continuous Integration

GitHub Actions provides continuous integration for the project.

The CI workflow automatically runs the project's automated tests when
changes are pushed or proposed for the main branch. This helps catch
regressions before changes are accepted into the production branch.

The CI pipeline validates the application by running the required
backend and frontend test suites.

## Local Development

### Prerequisites

Install:

- Docker
- Docker Compose
- Node.js
- npm
- Git

### Environment Variables

Create a local `server/.env` file containing the required development
environment variables.

Example variable names:

```env
SECRET_KEY=
DEBUG=True

POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=db
POSTGRES_PORT=5432

REDIS_URL=redis://redis:6379/0

SESSION_COOKIES_SECURE=False
SESSION_COOKIES_HTTPONLY=True
CSRF_COOKIES_SECURE=False
AUTH_COOKIES_SECURE=False
AUTH_COOKIES_SAMESITE=Lax
```

Do not commit `.env` files or production secrets to source control.

### Start Backend Services

For local development, PostgreSQL, Redis, and Django can run through
Docker:

```bash
docker compose up -d db redis backend
```

Run migrations:

```bash
docker compose exec backend python manage.py migrate
```

### Start the React Development Server

From the `client` directory:

```bash
npm install
npm run dev
```

The Vite development server proxies `/api` requests to the local Django
backend.

The local frontend is then available at:

```text
http://localhost:5173
```

## Production Deployment

The production application is deployed to AWS EC2 using Docker Compose.

Production traffic follows this flow:

```text
Internet
   |
   v
AWS EC2
   |
   v
Nginx :443
   |
   +---- React static application
   |
   +---- /api/ ---> Gunicorn / Django
                      |
                      +---- PostgreSQL
                      |
                      +---- Redis
```

Nginx:

- serves the React production build
- redirects HTTP traffic to HTTPS
- terminates TLS
- proxies API requests to Django
- supports React Router fallback routing

HTTPS certificates are issued by Let's Encrypt and managed with Certbot.

Docker services use restart policies so the application services can
automatically return after a host restart.

## Security

Production security measures include:

- HTTPS
- Let's Encrypt TLS certificates
- HttpOnly JWT cookies
- secure production authentication cookies
- JWT refresh-token rotation
- refresh-token blacklisting
- Django `ALLOWED_HOSTS`
- `DEBUG=False` in production
- environment-based secrets
- Django REST Framework authentication
- authenticated API permissions
- API throttling
- Nginx reverse proxy
- PostgreSQL and Redis kept behind the application stack rather than
  exposed as public application services

Sensitive values such as database credentials, API keys, and Django's
secret key are stored in environment variables and excluded from Git.

## Project Structure

```text
gains-squad/
├── client/
│   ├── nginx/
│   │   └── default.conf
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── Dockerfile
│   └── vite.config.js
├── server/
│   ├── calories_app/
│   ├── user_app/
│   ├── workout_app/
│   ├── server/
│   ├── tests/
│   ├── Dockerfile
│   └── manage.py
├── db/
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## What This Project Demonstrates

Gains Squad demonstrates experience with:

- designing and building a full-stack web application
- React component architecture
- React Router loaders and protected routes
- separation of frontend components and API service logic
- RESTful API design with Django REST Framework
- JWT authentication and secure cookie handling
- relational data modeling with PostgreSQL
- caching with Redis
- third-party API integration
- backend API testing
- Cypress end-to-end testing
- Docker containerization
- Nginx reverse proxy configuration
- HTTPS certificate management
- AWS EC2 deployment
- GitHub Actions CI
- production environment configuration

## Author

Built by **Mohamed Gad \| Software Engineer**

Portfolio: https://gadm12.github.io/portfolio/#about

GitHub: https://github.com/gadm12
