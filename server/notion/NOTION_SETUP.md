# Notion Integration Setup Guide

This guide explains how to set up and use Notion as a database for prototyping in your React application.

## Initial Setup

1. Create a Notion Integration:
   - Go to https://www.notion.so/my-integrations
   - Create a new integration
   - Save the Integration Token (API Key)

2. Create a Notion Database:
   - Create a new page in Notion
   - Add a database (full page)
   - Share the database with your integration
   - Copy the database ID from the URL

3. Environment Configuration:
```env
VITE_NOTION_API_KEY=your_integration_token
VITE_NOTION_DATABASE_ID=your_database_id
```

## Database Structure

Example database schema for a typical application:

```typescript
interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: {
    Name: { title: [{ text: { content: string } }] };
    Status: { select: { name: string } };
    Tags: { multi_select: { name: string }[] };
    Description: { rich_text: [{ text: { content: string } }] };
    // Add more properties as needed
  };
}
```

## API Integration

1. Install dependencies:
```bash
npm install @notionhq/client
```

2. Create Notion client utility:
```typescript
// src/lib/notion.ts
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

export const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

export default notion;
```

3. Create API functions:
```typescript
// src/lib/notionApi.ts
import notion, { databaseId } from './notion';

export async function queryDatabase() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      // Add filters, sorts as needed
    });
    return response.results;
  } catch (error) {
    console.error('Error querying Notion database:', error);
    throw error;
  }
}

export async function createPage(data: any) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        // Map your data to Notion properties
        Name: {
          title: [{ text: { content: data.name } }]
        },
        // Add more properties
      }
    });
    return response;
  } catch (error) {
    console.error('Error creating Notion page:', error);
    throw error;
  }
}

export async function updatePage(pageId: string, data: any) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        // Map your data to Notion properties
      }
    });
    return response;
  } catch (error) {
    console.error('Error updating Notion page:', error);
    throw error;
  }
}
```

## React Integration

1. Create a custom hook:
```typescript
// src/hooks/useNotion.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryDatabase, createPage, updatePage } from '../lib/notionApi';

export function useNotionData() {
  return useQuery({
    queryKey: ['notion-data'],
    queryFn: queryDatabase
  });
}

export function useCreateNotionPage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notion-data'] });
    }
  });
}

export function useUpdateNotionPage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ pageId, data }) => updatePage(pageId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notion-data'] });
    }
  });
}
```

2. Use in components:
```typescript
function MyComponent() {
  const { data, isLoading } = useNotionData();
  const { mutate: createPage } = useCreateNotionPage();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {/* Render your data */}
      <button onClick={() => createPage(newData)}>
        Create Page
      </button>
    </div>
  );
}
```

## Best Practices

1. Error Handling:
   - Implement proper error boundaries
   - Use toast notifications for API errors
   - Add retry logic for failed requests

2. Data Caching:
   - Configure React Query caching
   - Implement optimistic updates
   - Handle stale data appropriately

3. Security:
   - Never expose API keys in client code
   - Use environment variables
   - Implement proper access controls

4. Performance:
   - Batch updates when possible
   - Implement pagination
   - Cache frequently accessed data

## Migration Path

When moving from prototype to production:

1. Create proper database schema
2. Implement data migration scripts
3. Replace Notion API calls with your production backend
4. Update types and interfaces
5. Maintain data structure consistency
