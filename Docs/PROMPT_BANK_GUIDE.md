# My Prompts Feature Guide

## Overview
The **"My Prompts"** feature allows you to store, organize, and quickly access your frequently used AI prompts. Each prompt is private to your account and can be searched, filtered, and copied with one click.

## Current Status
- ✅ **Phase 1 Complete**: UI implementation with mock data
- ⏳ **Phase 2 Ready**: Database schema prepared for Supabase integration
- 📍 **Access**: Navigate to `/prompts` or click "My Prompts" in navigation

---

## Getting Started

### Accessing My Prompts
1. Sign in to your account
2. Navigate to `/prompts` or click the **"My Prompts"** button in the header
3. You'll see your personal prompt library

---

## Features

### Creating a Prompt

**Two Ways to Create:**
1. Click the **"+ New Prompt"** button in the header
2. Click the floating **"+"** button (bottom-right)

**Form Fields:**
- **Title** (required): A short, descriptive name (1-100 characters)
  - Example: "Speech Enhancer", "Code Review Template"
- **Category** (required): Select or create a category
  - Default categories: Enhancer, Formatter, Study Expert, Code Assistant
  - You can create custom categories
- **Description** (optional): Brief explanation (up to 200 characters)
  - Example: "Enhances speech clarity and grammar"
- **Prompt Text** (required): The actual prompt content (minimum 10 characters)
  - This is what gets copied to clipboard
- **Tags** (optional): Add multiple tags for easier filtering
  - Example: "agent", "text-format", "technical"

**Tips:**
- Use clear, descriptive titles
- Choose categories that group similar prompts
- Add tags for specific use cases or tools

### Searching for Prompts

The search bar finds prompts across:
- Title
- Description
- Prompt text content
- Tags

**Features:**
- **Debounced Search**: 300ms delay for smooth performance
- **Real-time Results**: Updates as you type
- **Clear Button**: X icon appears when search is active

**Example Searches:**
- "enhancer" → finds all enhancement-related prompts
- "notion" → finds prompts tagged with notion
- "code" → finds code-related prompts

### Filtering by Category

**How to Filter:**
1. Click any category pill below the search bar
2. Click **"All"** to clear the filter

**Features:**
- Categories are dynamically generated from your prompts
- Active category is highlighted with primary color
- Can combine with search for precise results

### Copying a Prompt

**Three Ways to Copy:**

1. **Quick Copy from Card**
   - Click the copy icon on any prompt card
   - Toast notification confirms: "Prompt copied!"

2. **From Details Dialog**
   - Click any card to open full details
   - Click the **"Copy"** button
   - Full prompt text is copied

3. **Keyboard Shortcut** (future feature)
   - Coming soon!

**What Gets Copied:**
- Only the `prompt_text` field is copied
- Not the title or description

### Viewing Prompt Details

**How to View:**
- Click on any prompt card

**Details Dialog Shows:**
- Full title
- Category badge
- Complete description
- Full prompt text (no truncation)
- All tags
- Edit and Delete buttons

### Editing a Prompt

**Steps:**
1. Click a prompt card to open details
2. Click the **"Edit"** button
3. Modify any fields in the form
4. Click **"Update"** to save

**What You Can Edit:**
- All fields (title, category, description, prompt_text, tags)
- Validation rules still apply

### Deleting a Prompt

**Steps:**
1. Click a prompt card to open details
2. Click the **"Delete"** button (red)
3. Confirm deletion in the dialog

**Warning:**
- Deletion is permanent (in Phase 2 with database)
- Currently with mock data, deleted prompts are removed from localStorage

---

## Best Practices

### Naming Conventions
✅ **Good Examples:**
- "Speech Enhancer"
- "Code Review Template"
- "Study Notes Generator"
- "Email Formatter - Professional"

❌ **Avoid:**
- "Prompt 1"
- "untitled"
- "asdfgh"

### Category Organization
**Recommended Categories:**
- **Enhancer**: Improve text quality, grammar, style
- **Formatter**: Format text for specific platforms
- **Study Expert**: Academic and learning prompts
- **Code Assistant**: Programming-related prompts
- **Creative Writing**: Story, poetry, creative content
- **Data Analysis**: Analysis and insights prompts

### Tag Strategy
**Good Tag Examples:**
- Tool names: "notion", "github", "slack"
- Audience: "technical", "business", "casual"
- Task type: "summarize", "analyze", "format"
- Language: "python", "markdown", "json"

**Tips:**
- Use lowercase for consistency
- Be specific but not too narrow
- Add 2-5 tags per prompt

### Prompt Text Best Practices
**Include:**
- Clear instructions
- Expected output format
- Context or constraints
- Examples if helpful

**Example:**
```
You are an expert code reviewer. Review the following code and provide:

1. Overall assessment
2. Potential bugs or issues
3. Performance improvements
4. Best practice suggestions

Format your response in markdown with clear sections.
```

---

## Current Implementation (Phase 1)

### Data Storage
- **Mock Data**: Uses `localStorage` in browser
- **Persistence**: Data saved locally on your device
- **Limitation**: Not synced across devices or browsers

### Sample Prompts
Three default prompts are included:
1. **Speech Enhancer** (Enhancer)
2. **Text Format — Notion** (Formatter)
3. **Study Notes** (Study Expert)

### Performance
- Search debounce: 300ms
- Simulated API delay: 500ms (fetching)
- CRUD operations: 300ms delay (simulated)

---

## Phase 2: Database Integration (Coming Soon)

### What Changes in Phase 2
✅ **Supabase Integration**
- Real database storage
- Cross-device sync
- Permanent storage

✅ **Full-Text Search**
- Faster search with PostgreSQL tsvector
- Better relevance ranking

✅ **Row Level Security (RLS)**
- Your prompts are truly private
- Server-side enforcement

### Migration Path
1. Database schema is ready (`database-prompts-setup.sql`)
2. Hook implementation will be swapped
3. Mock data file will be removed
4. All features will work identically

---

## Troubleshooting

### Prompts Not Appearing
**Check:**
- Are you signed in?
- Clear search and filters (click "Clear filters")
- Check browser console for errors

**Solution:**
- Refresh the page
- Clear localStorage: `localStorage.removeItem('mock_prompts')`

### Copy Not Working
**Possible Causes:**
- Browser clipboard permissions denied
- HTTPS required for clipboard API

**Solutions:**
- Grant clipboard permissions in browser settings
- Use fallback copy (automatic)
- Try a different browser

### Search Not Finding Prompts
**Tips:**
- Check spelling
- Try fewer keywords
- Use category filter to narrow results
- Search is case-insensitive

### Form Validation Errors
**Common Issues:**
- Title required (1-100 chars)
- Category required
- Prompt text minimum 10 characters

---

## Keyboard Shortcuts (Planned)

Coming in future updates:
- `Ctrl/Cmd + K`: Quick search focus
- `Ctrl/Cmd + N`: New prompt
- `Escape`: Close dialog
- `Enter`: Submit form (when focused)

---

## Technical Details

### Stack
- **Frontend**: React 18 + TypeScript
- **State**: TanStack Query (React Query)
- **UI**: shadcn/ui + Tailwind CSS
- **Storage (Phase 1)**: localStorage
- **Storage (Phase 2)**: Supabase PostgreSQL

### Component Architecture
```
PromptBankPage
├── PromptSearchBar
├── CategoryPills
├── PromptCard (grid)
├── NewPromptForm (dialog)
└── PromptDetailsDialog
```

### Data Flow
1. `usePrompts` hook fetches data
2. Filters applied client-side
3. React Query caches results
4. Mutations invalidate cache

---

## Support

### Getting Help
- Check this guide first
- Review `Docs/Implementation.md`
- File GitHub issue with `[Prompt Bank]` prefix

### Feature Requests
- Open GitHub issue
- Describe use case clearly
- Provide examples

---

## Changelog

### Phase 1 (Current)
- ✅ UI implementation complete
- ✅ Mock data with localStorage
- ✅ Search and filter
- ✅ CRUD operations
- ✅ Copy to clipboard
- ✅ Responsive design
- ✅ Toast notifications

### Phase 2 (Planned)
- ⏳ Supabase database integration
- ⏳ RLS policy enforcement
- ⏳ Full-text search optimization
- ⏳ Cross-device sync

### Phase 3 (Future)
- 📋 Prompt sharing
- 📋 Template library
- 📋 Export/import (JSON)
- 📋 Keyboard shortcuts
- 📋 Favorites/pinning
- 📋 Prompt versioning

---

**Last Updated**: October 21, 2025  
**Version**: 1.0 (Phase 1)  
**Status**: ✅ Production Ready (UI)


