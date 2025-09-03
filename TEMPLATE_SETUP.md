# VitalDev React Template Setup Guide

This template provides a standardized setup for React applications using Vite, TypeScript, shadcn/ui, and Tailwind CSS.

## Quick Start

1. Create a new project using Vite:
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

2. Install base dependencies:
```bash
npm install
```

3. Install and configure Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/typography
npx tailwindcss init -p
```

4. Install shadcn/ui:
```bash
npx shadcn-ui@latest init
```

Use these configuration options:
- Style: Default
- Base color: slate
- CSS variables: Yes
- React Server Components: No
- Tailwind CSS config: tailwind.config.ts
- CSS file: src/index.css
- Import aliases: Yes (use provided paths)

5. Install additional core dependencies:
```bash
npm install @tanstack/react-query react-router-dom sonner next-themes
npm install @hookform/resolvers zod react-hook-form
npm install class-variance-authority clsx tailwind-merge
```

6. Copy the following configuration files from this template:
- `components.json`
- `tailwind.config.ts`
- `tsconfig.json`
- `.eslintrc.json`

## Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn components
│   └── custom/      # project-specific components
├── config/
│   ├── constants.ts # app constants
│   ├── types.ts     # TypeScript types
│   └── urls.ts      # API endpoints
├── hooks/
│   └── use-*.ts     # custom hooks
├── lib/
│   └── utils.ts     # utility functions
├── pages/
│   └── *.tsx        # route pages
└── main.tsx         # app entry
```

## Theme Setup

1. Copy the theme configuration from `src/index.css`
2. Implement the theme toggle component from `src/components/ThemeToggle.tsx`
3. Configure theme provider in `App.tsx`

## Component Installation

Install shadcn components as needed:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# etc...
```

## Notion Integration

1. Install Notion SDK:
```bash
npm install @notionhq/client
```

2. Create environment variables:
```env
VITE_NOTION_API_KEY=your_key_here
VITE_NOTION_DATABASE_ID=your_db_id
```

3. Copy the Notion integration setup from `server/notion/` directory

## Development Workflow

1. Start the development server:
```bash
npm run dev
```

2. Build for production:
```bash
npm run build
```

3. Preview production build:
```bash
npm run preview
```

## Best Practices

1. Component Development:
   - Use TypeScript for all components
   - Follow shadcn/ui patterns for consistency
   - Implement proper prop types and interfaces

2. Styling:
   - Use Tailwind CSS utilities
   - Follow the component class structure from shadcn
   - Maintain dark mode compatibility

3. State Management:
   - Use React Query for server state
   - Implement custom hooks for reusable logic
   - Follow the container/presenter pattern

4. Testing:
   - Write unit tests for utilities
   - Implement component testing
   - Use integration tests for critical flows

## Common Issues and Solutions

1. shadcn Component Styling:
   - Always import component styles
   - Use proper class merging with cn utility
   - Check theme variables in index.css

2. Tailwind Configuration:
   - Extend theme in tailwind.config.ts
   - Use proper color variables
   - Follow shadcn naming conventions

3. TypeScript Integration:
   - Maintain proper type definitions
   - Use strict mode
   - Follow interface naming conventions
