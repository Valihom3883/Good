# RoboVestX

This is the unified repository for the RoboVestX platform, containing both the frontend and backend.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/robovestx.git
    ```
2.  **Install dependencies:**
    ```bash
    cd robovestx
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following:
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
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## API

The backend API is served from the `/api` route within the Next.js application.

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the code.
-   `npm run data:import`: Imports data into the database.
-   `npm run data:destroy`: Destroys all data in the database.
