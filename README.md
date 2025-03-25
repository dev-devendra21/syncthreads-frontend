# Frontend Project Setup

## Project Overview

This project is a frontend application built with **Vite + TypeScript** and utilizes **ShadCN UI** for styling and components. It features a dashboard, a map page, and authentication (Login & Signup) with protected routes.

## Tech Stack

- **Framework**: Vite + TypeScript
- **UI Framework**: ShadCN UI
- **Routing**: React Router DOM
- **Third-Party Libraries**: js-cookie

## Pages & Routes

### Pages

- **Dashboard**: Accessible only for authenticated users.
- **Map**: Accessible only for authenticated users.
- **Auth (Login & Signup)**: Available for unauthenticated users.

### Routes

- **ProtectedRoute**: Restricts access to authenticated users (Dashboard & Map pages).
- **AuthRoute**: Restricts access to unauthenticated users (Login & Signup pages).

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/dev-devendra21/syncthreads-frontend.git
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Rename Environment File

Rename `.env-example` to `.env` and update the following environment variable:

```sh
VITE_API_URL="http://localhost:4000/api"
```

### 4. Start Development Server

```sh
npm run dev
```

### 5. Build for Production

```sh
npm run build
```

### 6. Run Production Build

```sh
npm run preview
```

## Project Structure

```plaintext
/src
├── components
│   ├── ui
│   │   ├── Button
│   │   ├── Card
│   │   ├── Input
│   │   ├── Sonner
├── pages
│   ├── Main
│   │   ├── Dashboard.tsx
│   │   ├── Map.tsx
│   ├── Auth
│   │   ├── Auth.tsx
├── ProtectedRoute.tsx
├── AuthRoute.tsx
├── App.tsx
├── main.tsx
```

## Contribution Guidelines

1. **Fork** the repository.
2. **Create** a new branch.
3. **Make changes** and commit.
4. **Push** to your branch and submit a pull request.

## Deployment

The application is deployed and accessible at: [SyncThreads Frontend](https://syncthreads-frontend.vercel.app/)

## License

This project is licensed under [MIT License](LICENSE).
