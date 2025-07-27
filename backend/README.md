# RoboVestX Backend

This is the backend for the RoboVestX platform. It is built with Node.js, Express, and MongoDB.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/robovestx.git
    ```
2.  **Install dependencies:**
    ```bash
    cd backend
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add the following:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4.  **Seed the database:**
    ```bash
    npm run data:import
    ```
5.  **Start the server:**
    ```bash
    npm start
    ```

## API Documentation

The API documentation is available at `http://localhost:5000/api-docs` when the server is running.

## Available Scripts

-   `npm start`: Starts the server in production mode.
-   `npm run dev`: Starts the server in development mode with nodemon.
-   `npm run data:import`: Imports data into the database.
-   `npm run data:destroy`: Destroys all data in the database.
