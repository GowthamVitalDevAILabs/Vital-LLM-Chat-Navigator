# Project Structure

This document outlines the folder and file structure for the LLM Chat Links application.

-   **`/public`**: Contains static assets.
    -   **`/data`**: Stores cached JSON data.
        -   `llmLinks.json`: The cached data from the Notion database.
-   **`/src`**: The main source code for the React application.
    -   **`/components`**: Reusable React components.
        -   **`/ui`**: Components from shadcn/ui.
        -   `LlmLinkCard.tsx`: The card component for displaying a single LLM link.
        -   `ThemeToggle.tsx`: The button to toggle between light and dark themes.
    -   **`/hooks`**: Custom React hooks.
        -   `useLlmLinks.ts`: Hook for fetching the LLM links data.
        -   `use-toast.ts`: Hook for displaying toasts.
    -   **`/lib`**: Utility functions.
        -   `utils.ts`: Contains the `cn` utility for merging Tailwind classes.
    -   **`/pages`**: Top-level page components.
        -   `LlmLinksPage.tsx`: The main page that displays the list of links.
        -   `NotFound.tsx`: The 404 error page.
    -   `App.tsx`: The root component of the application.
    -   `main.tsx`: The entry point of the React application.
    -   `index.css`: Global CSS styles.
-   **`/server`**: The Express.js backend server.
    -   `index.js`: The main server file that handles the Notion API integration.
    -   `.env`: Environment variables for the server.
