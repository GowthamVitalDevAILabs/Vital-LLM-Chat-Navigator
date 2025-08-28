# LLM Chat Links

A modern, responsive web application for managing and accessing AI chat interfaces and LLM platforms. Built with React, TypeScript, and shadcn/ui.

## Features

- **Curated LLM Links**: Browse and access various AI chat interfaces
- **Search & Filter**: Find links by name, model, tags, or description
- **Category Filtering**: Filter links by categories
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works on desktop and mobile devices
- **Notion Integration**: Sync data from Notion databases
- **Modern UI**: Built with shadcn/ui components

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Backend**: Express.js, Node.js
- **Database**: Notion API
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Notion API key and database ID

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd llm-chat-links
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
NOTION_API_KEY=your_notion_api_key
NOTION_LINKS_DATABASE_ID=your_notion_database_id
```

4. Install server dependencies:
```bash
cd server
npm install
cd ..
```

### Development

1. Start the development server:
```bash
npm run dev
```

2. Start the backend server (in a separate terminal):
```bash
cd server
npm run dev
```

The application will be available at `http://localhost:8081`

### Building for Production

```bash
npm run build
```

## Project Structure

```
llm-chat-links/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── LlmLinkCard.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   ├── useLlmLinks.ts
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── pages/
│   │   ├── LlmLinksPage.tsx
│   │   └── NotFound.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   └── main.tsx
├── server/
│   ├── index.js
│   └── package.json
├── public/
│   └── data/
│       └── llmLinks.json
└── package.json
```

## API Endpoints

- `GET /api/fetch-and-cache?type=llm_links` - Fetch and cache LLM links from Notion

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
