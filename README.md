# LLM Chat Links

A modern, full-featured web application for managing and discovering AI model links and resources. Built with React, TypeScript, and Supabase with dual viewing modes and comprehensive data management capabilities.

## ✨ Features

### 🎯 Core Functionality
- 🔍 **Advanced Search & Filtering** - Search across name, model, description, and tags with real-time results
- 🏷️ **Category-based Organization** - Dynamic category filtering and organization
- ⭐ **Popular Links Highlighting** - Mark and filter popular AI resources
- 📊 **Dual View Modes** - Switch between card view and table view for different use cases
- ➕ **CRUD Operations** - Create, read, update, and delete links with full data management

### 🎨 User Experience
- 🌓 **Dark/Light Theme Support** - System-aware theme switching with manual toggle
- ✨ **Modern, Responsive UI** - Built with shadcn/ui and Tailwind CSS
- 📱 **Mobile-First Design** - Fully responsive across all device sizes
- 🔄 **Real-time Updates** - Live data synchronization with Supabase
- 🎭 **Glass Morphism Effects** - Premium visual effects and animations
- 🚀 **Toast Notifications** - User-friendly feedback for all operations

### 📋 Table View Features
- 🔧 **Inline Editing** - Edit all fields directly in the table
- 🔄 **Column Sorting** - Click headers to sort by any field
- 🎯 **Multi-column Filtering** - Filter by name, model, and other fields
- 📋 **Bulk Operations** - Copy URLs, delete rows, and batch actions
- 📊 **Data Validation** - Real-time validation and error handling

### 🎴 Card View Features
- 🎨 **Visual Link Cards** - Beautiful card-based display with badges
- 🏷️ **Tag System** - Visual tag representation with color coding
- 🔗 **Quick Actions** - One-click access to external links
- 📱 **Grid Layout** - Responsive grid that adapts to screen size

## 🛠 Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Database**: Supabase (PostgreSQL)
- **Table Management**: TanStack Table
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Theme**: next-themes
- **Form Handling**: React Hook Form + Zod validation

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Supabase account** and project

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [your-repo-url]
   cd llm-chat-links
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env.local` file in the project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup:**
   Run this SQL in your Supabase SQL Editor:
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

5. **Start Development Server:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
llm-chat-links/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui component library
│   │   │   ├── button.tsx  # Button variants (default, hero, premium)
│   │   │   ├── card.tsx    # Card variants (default, glass, premium)
│   │   │   ├── input.tsx   # Form input components
│   │   │   ├── table.tsx   # Table primitive components
│   │   │   ├── toast.tsx   # Toast notification system
│   │   │   └── ...         # Other UI primitives
│   │   ├── LlmLinkCard.tsx # Link display card component
│   │   ├── NewLinkForm.tsx # Form for adding new links
│   │   └── ThemeToggle.tsx # Dark/light theme switcher
│   ├── config/             # Configuration and constants
│   │   ├── constants.ts    # App-wide constants
│   │   ├── types.ts        # Type definitions and configs
│   │   └── urls.ts         # URL configurations
│   ├── hooks/              # Custom React hooks
│   │   ├── useLlmLinks.ts  # Main data fetching and CRUD hooks
│   │   ├── use-toast.ts    # Toast notification hook
│   │   └── use-mobile.tsx  # Mobile detection hook
│   ├── lib/                # Utilities and configurations
│   │   ├── supabase.ts     # Supabase client configuration
│   │   └── utils.ts        # Utility functions
│   ├── pages/              # Page components
│   │   ├── LlmLinksPage.tsx      # Main card view page
│   │   ├── LlmLinksTablePage.tsx # Table view page
│   │   └── NotFound.tsx          # 404 error page
│   ├── types/              # TypeScript type definitions
│   │   └── supabase.ts     # Supabase database types
│   └── App.tsx             # Main app component with routing
├── public/                 # Static assets
├── components.json         # shadcn/ui configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
└── package.json           # Dependencies and scripts
```

## 🎯 Usage

### Navigation
- **Card View**: `/` - Visual card-based interface for browsing
- **Table View**: `/table` - Spreadsheet-like interface for data management

### Card View Operations
- **Search**: Use the search bar to find links by name, model, description, or tags
- **Filter**: Click category buttons to filter by specific categories
- **Add New**: Click the "New link" button to add a new resource
- **View Link**: Click "Visit" to open the external link

### Table View Operations
- **Inline Edit**: Click any cell to edit the value directly
- **Sort**: Click column headers to sort data
- **Filter**: Use the filter inputs above the table
- **Delete**: Use the delete button in the actions column
- **Copy URL**: Quick copy button for sharing links

## 🔧 Database Schema

The application uses a single `llm_links` table with the following structure:

| Column      | Type          | Description                    |
|-------------|---------------|--------------------------------|
| id          | UUID          | Primary key (auto-generated)  |
| created_at  | TIMESTAMPTZ   | Creation timestamp             |
| name        | TEXT          | Display name of the resource   |
| description | TEXT          | Detailed description           |
| url         | TEXT          | External link URL              |
| model       | TEXT          | AI model name/version          |
| category    | TEXT[]        | Array of category tags         |
| isPopular   | BOOLEAN       | Popular resource flag          |
| tags        | TEXT[]        | Array of searchable tags       |

## 🎨 UI Components & Design System

### Component Library
Built on **shadcn/ui** with custom extensions:

- **Buttons**: Multiple variants (default, outline, ghost, hero, premium)
- **Cards**: Glass morphism effects and premium styling
- **Forms**: Integrated validation with React Hook Form
- **Tables**: Full-featured data tables with sorting and filtering
- **Toasts**: Non-intrusive notification system
- **Theme**: Automatic dark/light mode with system detection

### Design Principles
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Optimized with React Query caching and lazy loading
- **Responsiveness**: Mobile-first approach with Tailwind breakpoints
- **Consistency**: Unified design language across all components

## 🔄 State Management

### Data Layer
- **TanStack Query**: Server state management with caching
- **Supabase Client**: Real-time database operations
- **React State**: Local UI state management

### CRUD Operations
- **Create**: Add new links via form with validation
- **Read**: Fetch and cache data with automatic refetching
- **Update**: Inline editing with optimistic updates
- **Delete**: Soft delete with confirmation prompts

## 🚀 Performance Features

- **Code Splitting**: Route-based code splitting with React Router
- **Caching**: Intelligent caching with TanStack Query
- **Optimistic Updates**: Immediate UI updates before server confirmation
- **Lazy Loading**: Components loaded on demand
- **Bundle Optimization**: Vite-powered build optimization

## 🛣 Roadmap

### Completed Features ✅
- ✅ Supabase integration and migration from Notion
- ✅ Dual view modes (card and table)
- ✅ Full CRUD operations
- ✅ Advanced search and filtering
- ✅ Responsive design and theme support
- ✅ Inline table editing
- ✅ Toast notification system

### Upcoming Features 🚧
- 🔐 User authentication and authorization
- 👤 User profiles and personal collections
- ⭐ Favorite links and bookmarking
- 🔗 Link sharing and collaboration
- 📊 Usage analytics and insights
- 🏷️ Advanced tagging system
- 📱 Progressive Web App (PWA) support
- 🔍 Full-text search with Supabase
- 📈 Link popularity tracking
- 🎯 Personalized recommendations

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Development Process
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React best practices
- **Prettier**: Code formatting (integrated with shadcn/ui)
- **Conventional Commits**: Structured commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
- Check the [Issues](https://github.com/your-repo/issues) page
- Create a new issue with detailed information
- Contact the maintainers

---

Built with ❤️ using modern web technologies for the AI community.