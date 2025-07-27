# Deploying to Vercel

This guide will walk you through deploying the RoboVestX application to Vercel.

## 1. Push to a Git Repository

Push your code to a GitHub, GitLab, or Bitbucket repository.

## 2. Import Project on Vercel

1.  Go to your Vercel dashboard and click "Add New... > Project".
2.  Import the Git repository you just pushed to.
3.  Vercel will automatically detect that you're using Next.js and configure the build settings for you.

## 3. Configure Environment Variables

You'll need to add the following environment variables to your Vercel project:

-   `MONGO_URI`: Your MongoDB connection string.
-   `JWT_SECRET`: A secret key for signing JWTs.

To add environment variables on Vercel:
1.  Go to your project's settings.
2.  Click on "Environment Variables".
3.  Add the variables and their values.

## 4. Deploy

Click the "Deploy" button. Vercel will build and deploy your project. Once it's done, you'll have a live URL for your application.

## 5. (Optional) Set up a Custom Domain

You can also set up a custom domain for your project in the "Domains" section of your project's settings.
