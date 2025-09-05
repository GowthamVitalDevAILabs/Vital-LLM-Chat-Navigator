# LLM Chat Links

A modern web application for managing and discovering AI model links and resources. Built with React, TypeScript, and Supabase.

## Features

- 🔍 Search and filter LLM resources
- 🏷️ Category-based organization
- ⭐ Popular links highlighting
- 🌓 Dark/Light theme support
- ✨ Modern, responsive UI
- 🔄 Real-time updates with Supabase
- ➕ Add new links through a user-friendly form

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query
- **Backend**: Supabase
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm
- Supabase account and project

### Setup

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd llm-chat-links
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The Supabase database includes a `llm_links` table with the following structure:

```sql
CREATE TABLE llm_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  model TEXT,
  category TEXT[],
  "isPopular" BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[]
);
```

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── LlmLinkCard    # Link display component
│   ├── NewLinkForm    # Form for adding new links
│   └── ThemeToggle    # Theme switcher
├── config/            # Constants and types
├── hooks/             # Custom React hooks
├── lib/              # Utilities and configurations
├── pages/            # Page components
└── types/            # TypeScript type definitions
```

## Features & Roadmap

### Current Features
- Search functionality across name, model, description, and tags
- Category-based filtering
- Popular links section
- Dark/Light theme toggle
- Add new links through form
- Real-time updates

### Planned Features
- User authentication
- Favorite links
- Share links
- Advanced filtering
- Analytics dashboard
- User collections

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.