# UI/UX Guidelines

This document provides guidelines for the user interface and user experience of the LLM Chat Links application.

## Design System

The UI is built using **shadcn/ui**, a collection of reusable UI components, and styled with **Tailwind CSS**. The design is modern, clean, and responsive.

### Colors

The color palette is defined in `tailwind.config.ts` and uses CSS variables for easy theming.

* **Primary**: A vibrant purple, used for buttons, links, and accents.
* **Secondary**: A neutral gray, used for backgrounds and secondary elements.
* **Background**: White in light mode, dark gray in dark mode.
* **Foreground**: Dark gray in light mode, light gray in dark mode.

### Typography

* **Font**: The default sans-serif font stack is used.
* **Headings**: Bold and larger font sizes are used for headings (`<h1>`, `<h2>`, etc.).
* **Body Text**: The standard font size is used for body text.

### Components

* **Card**: The primary component for displaying information. It has a subtle shadow and rounded corners.
* **Button**: Used for actions. The primary button has a gradient background.
* **Badge**: Used for tags and categories.
* **Input**: A styled input field for the search bar.
* **Toast**: Used for notifications.

## User Flows

1.  **Viewing Links**: The user lands on the main page and sees a list of all LLM chat links.
2.  **Searching**: The user can type in the search bar to filter the links by name, model, tags, or description.
3.  **Filtering by Category**: The user can click on a category button to see only the links in that category.
4.  **Opening a Link**: The user can click the "Open" button on a link card to open the link in a new tab.
5.  **Syncing with Notion**: The user can click the "Sync with Notion" button to fetch the latest links from the Notion database.

## Accessibility

* The application should be keyboard-navigable.
* All interactive elements should have focus states.
* Images and icons should have appropriate alt text or ARIA labels.
