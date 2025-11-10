# Preloader Component

A reusable, animated preloader component for React/Next.js applications with two animation variants.

## Features

-   ✅ Full-screen loading animation
-   ✅ Two animation variants: `ide` (code editor) and `boxes` (animated grid)
-   ✅ Framer Motion powered animations
-   ✅ Tailwind CSS styling
-   ✅ Respects `prefers-reduced-motion`
-   ✅ Accessible with ARIA labels
-   ✅ Custom background image support
-   ✅ Smooth fade-out transition

## Props

| Prop                 | Type               | Default                  | Description                      |
| -------------------- | ------------------ | ------------------------ | -------------------------------- |
| `name`               | `string`           | `"Cyril Ofori Kupualor"` | Name to display                  |
| `variant`            | `"ide" \| "boxes"` | `"ide"`                  | Animation style                  |
| `isReady`            | `boolean`          | `false`                  | When `true`, preloader fades out |
| `backgroundImageUrl` | `string`           | `undefined`              | Optional custom background image |

## Animation Variants

### IDE Variant

Displays a fake code editor with typing animation showing:

```python
# python
print("Hello, Cyril Ofori Kupualor")

// java
System.out.println("Hello, Cyril Ofori Kupualor");
```

### Boxes Variant

Shows a 3×3 grid of colorful boxes that bounce into place sequentially.

## Usage

### Next.js (App Router)

```tsx
// app/layout.tsx
'use client';
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';

export default function RootLayout({ children }) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 3500); // Adjust timing as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <html lang="en">
            <body>
                <Preloader
                    name="Cyril Ofori Kupualor"
                    variant="ide"
                    isReady={isReady}
                />
                {children}
            </body>
        </html>
    );
}
```

### React (Standard App)

```tsx
// App.tsx
import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';

function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Simulate app initialization
        const loadApp = async () => {
            await Promise.all([
                // Your loading logic here
                fetch('/api/data'),
                new Promise((resolve) => setTimeout(resolve, 2000)),
            ]);
            setIsReady(true);
        };

        loadApp();
    }, []);

    return (
        <>
            <Preloader
                name="Your Name"
                variant="boxes"
                isReady={isReady}
                backgroundImageUrl="/background.jpg"
            />
            <main>{/* Your app content */}</main>
        </>
    );
}
```

### With Custom Background

```tsx
<Preloader
    name="Cyril Ofori Kupualor"
    variant="ide"
    isReady={isReady}
    backgroundImageUrl="/images/office-blur.jpg"
/>
```

### Switch Variants

```tsx
// Use IDE variant (code editor)
<Preloader variant="ide" name="Developer Name" isReady={isReady} />

// Use Boxes variant (animated grid)
<Preloader variant="boxes" name="Designer Name" isReady={isReady} />
```

## Installation

1. Install dependencies:

```bash
npm install framer-motion
# or
yarn add framer-motion
# or
pnpm add framer-motion
```

2. Ensure Tailwind CSS is configured in your project.

3. Copy the `Preloader.tsx` component to your components folder.

## Accessibility

-   Uses semantic HTML with `role="status"` for screen readers
-   Includes `aria-label="Loading content"` for context
-   Respects user's motion preferences via `prefers-reduced-motion`
-   Falls back to static state when animations are disabled

## Customization

### Change Animation Timing

Edit the `useEffect` timeout in your wrapper:

```tsx
setTimeout(() => setIsReady(true), 4000); // 4 seconds
```

### Modify Code Lines (IDE Variant)

In `Preloader.tsx`, update the `codeLines` array:

```tsx
const codeLines = ['// Your custom code here', 'console.log("Hello World");'];
```

### Customize Colors

Modify Tailwind classes in the component:

```tsx
// Box gradient colors
className = 'bg-gradient-to-br from-pink-500 to-orange-600';

// IDE syntax highlighting
className = 'text-emerald-400'; // Python comments
```

## Browser Support

-   Modern browsers with CSS Grid and Flexbox support
-   Graceful degradation for older browsers
-   Animation support requires JavaScript enabled

## Performance

-   Animations use GPU acceleration
-   Minimal re-renders with proper state management
-   Automatically unmounts when `isReady={true}`
