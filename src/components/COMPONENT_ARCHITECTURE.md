# Component Architecture Guide

This guide outlines the component architecture for VitalDev React applications using shadcn/ui and Tailwind CSS.

## Component Structure

```
components/
├── ui/              # shadcn base components
├── common/          # shared components
├── features/        # feature-specific components
├── layouts/         # layout components
└── providers/       # context providers
```

## Component Template

```typescript
// Template for a typical component
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  // Add other props
}

export function Component({
  className,
  children,
  ...props
}: ComponentProps) {
  // State and hooks
  const [state, setState] = useState();

  // Event handlers
  const handleEvent = () => {
    // Handle event
  };

  return (
    <div className={cn("base-classes", className)} {...props}>
      {children}
    </div>
  );
}
```

## Styling Guidelines

1. Use Tailwind Classes:
```typescript
// Good
<div className="flex items-center justify-between p-4">

// Avoid
<div style={{ display: 'flex', alignItems: 'center' }}>
```

2. Use cn Utility for Class Merging:
```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  variant === "primary" && "variant-classes",
  className
)}>
```

3. Theme Variables:
```css
/* In your CSS */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* Other variables */
}

/* Usage in components */
<div className="bg-background text-foreground">
```

## Component Types

### 1. UI Components (ui/)
Basic building blocks from shadcn:
```typescript
// button.tsx
import { Button } from "@/components/ui/button";

<Button variant="outline" size="sm">
  Click me
</Button>
```

### 2. Common Components (common/)
Shared components used across features:
```typescript
// Card.tsx
import { Card } from "@/components/ui/card";

export function CustomCard({ title, content }) {
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Content>{content}</Card.Content>
    </Card>
  );
}
```

### 3. Feature Components (features/)
Components specific to features:
```typescript
// UserProfile.tsx
export function UserProfile({ user }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      {/* Feature-specific content */}
    </div>
  );
}
```

### 4. Layout Components (layouts/)
Page layout components:
```typescript
// MainLayout.tsx
export function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

## State Management

1. Local State:
```typescript
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  );
}
```

2. Context State:
```typescript
// context/ThemeContext.tsx
export const ThemeContext = createContext<ThemeContextType>({});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## Component Best Practices

1. Composition Over Inheritance:
```typescript
// Good
function Button({ icon, children }) {
  return (
    <button>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

// Instead of inheritance
class IconButton extends Button {
  // ...
}
```

2. Props Interface:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}
```

3. Default Props:
```typescript
function Button({ 
  variant = "primary",
  size = "md",
  ...props 
}: ButtonProps) {
  // ...
}
```

4. Error Boundaries:
```typescript
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <MyComponent />
</ErrorBoundary>
```

## Testing Components

1. Component Tests:
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('Button click handler', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  await userEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalled();
});
```

2. Snapshot Tests:
```typescript
test('Button renders correctly', () => {
  const { container } = render(<Button>Click me</Button>);
  expect(container).toMatchSnapshot();
});
```

## Performance Optimization

1. Memoization:
```typescript
const MemoizedComponent = React.memo(function Component({ data }) {
  return <div>{data}</div>;
});
```

2. Callback Memoization:
```typescript
const handleClick = useCallback(() => {
  // Handle click
}, [/* dependencies */]);
```

3. Expensive Calculations:
```typescript
const expensiveValue = useMemo(() => {
  return performExpensiveCalculation(props.data);
}, [props.data]);
```

## Accessibility

1. ARIA Labels:
```typescript
<button
  aria-label="Close modal"
  aria-describedby="modal-desc"
>
  <Icon name="close" />
</button>
```

2. Keyboard Navigation:
```typescript
function handleKeyDown(event: React.KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    // Handle activation
  }
}
```

## Documentation

1. Component Documentation:
```typescript
/**
 * Button component that follows the shadcn/ui design system
 * @param variant - The visual style variant of the button
 * @param size - The size of the button
 * @param children - The content to be rendered inside the button
 */
export function Button({ variant, size, children }: ButtonProps) {
  // ...
}
```

2. Usage Examples:
```typescript
// Example.tsx
function Example() {
  return (
    <div className="space-y-4">
      <Button variant="primary" size="sm">Small Button</Button>
      <Button variant="secondary" size="lg">Large Button</Button>
    </div>
  );
}
```
