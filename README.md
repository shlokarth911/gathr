# Venue Booking Full-Stack Application

This is a full-stack web application that allows users to find and book venues for events. It also provides a platform for venue owners to list and manage their properties. The application is built with a modern MERN stack, featuring a React frontend and a Node.js/Express backend.

## Features

*   **Dual User Roles:** Separate registration and login for "Attendees" (users looking for venues) and "Owners" (users who own venues).
*   **Venue Management:** Owners can create, read, update, and delete their venue listings.
*   **Venue Discovery:** Attendees can browse, search, and filter through available venues.
*   **Booking System:** Attendees can request to book a venue, and owners can manage these booking requests.
*   **User Profiles:** Both attendees and owners have profile pages to manage their information and activities.
*   **Authentication:** Secure JWT-based authentication to protect routes and user data.

## Tech Stack

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool and development server for modern web projects.
*   **React Router:** For declarative routing in the React application.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Axios:** A promise-based HTTP client for making API requests.
*   **GSAP:** For high-performance animations.
*   **Lucide React:** A library of simply beautiful and consistent icons.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express:** A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB:** A cross-platform, document-oriented NoSQL database.
*   **Mongoose:** An elegant MongoDB object modeling tool for Node.js.
*   **JWT (JSON Web Tokens):** For creating access tokens for authentication.
*   **bcrypt:** A library for hashing passwords.
*   **CORS:** A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your machine:

*   [Node.js](https://nodejs.org/) (which comes with npm)
*   [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install Backend Dependencies:**
    Navigate to the `backend` directory and install the required packages.
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    Navigate to the `frontend` directory and install the required packages.
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Configure Environment Variables:**
    In the `backend` directory, create a `.env` file and add the following variables. Replace the placeholder values with your actual configuration.
    ```
    PORT=8080
    MONGODB_URI=<Your_MongoDB_Connection_String>
    JWT_SECRET=<Your_JWT_Secret>
    CORS_ORIGIN=http://localhost:5173
    ```

### Running the Application

1.  **Start the Backend Server:**
    From the `backend` directory, run the following command to start the Express server.
    ```bash
    npm run dev
    ```
    The server will start on the port you specified in the `.env` file (e.g., `http://localhost:8080`).

2.  **Start the Frontend Development Server:**
    From the `frontend` directory, run the following command to start the Vite development server.
    ```bash
    npm run dev
    ```
    The React application will open in your browser at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

The project is organized into two main directories:

*   `frontend/`: Contains the React application.
    *   `src/`: The main source code for the frontend.
        *   `api/`: Functions for making API calls to the backend.
        *   `components/`: Reusable React components.
        *   `contexts/`: React contexts for state management.
        *   `pages/`: Top-level page components.
        *   `services/`: Miscellaneous services like image uploading.
*   `backend/`: Contains the Node.js/Express server.
    *   `controllers/`: Express route handlers.
    *   `db/`: Database connection configuration.
    *   `middlewares/`: Custom middleware (e.g., for authentication).
    *   `models/`: Mongoose schemas for the database models.
    *   `routes/`: API route definitions.
    *   `services/`: Business logic separated from controllers.

