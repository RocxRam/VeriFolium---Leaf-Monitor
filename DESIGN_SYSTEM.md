# VeriFolium Design System Documentation

## Overview

This document outlines the comprehensive design system and styling framework for the VeriFolium AgriTech application. The design is built on **Tailwind CSS** with a custom theme optimized for a modern, clean, and professional look suitable for an agricultural technology platform.

---

## Color Palette

### Primary Colors (Green - AgriTech Theme)
The primary colors represent nature, growth, and agricultural focus.

```
Primary Green: #22c55e (primary-600)
- Light shades: primary-50 to primary-100 (light backgrounds)
- Dark shades: primary-700 to primary-950 (text and borders)
```

### Secondary Colors (Purple - Intelligence)
Secondary colors represent AI/technology aspects.

```
Secondary Purple: #a855f7 (secondary-600)
- Used for CTAs and secondary actions
- Complementary to primary green
```

### Accent Colors (Orange - Energy)
Accent colors provide warmth and energy.

```
Accent Orange: #f97316 (accent-500)
- Used for highlights and important notifications
- Draws attention without overwhelming
```

### Neutral Colors (Grayscale)
Neutral palette for text, backgrounds, and borders.

```
- neutral-50: Very light backgrounds
- neutral-500: Secondary text
- neutral-900: Primary text
```

---

## Component Library

### Buttons

#### Variants
- **Primary**: Main CTA buttons (green)
- **Secondary**: Alternative actions (purple)
- **Outline**: Secondary interactions (bordered)
- **Ghost**: Subtle actions (transparent)
- **Danger**: Destructive actions (red)

#### Sizes
- **sm**: Small buttons (px-3 py-1.5)
- **base**: Default size (px-4 py-2.5)
- **lg**: Large buttons (px-6 py-3)

#### Usage
```jsx
import Button from '@/components/Button'

<Button variant="primary" size="lg" fullWidth>
  Click Me
</Button>

<Button variant="outline" disabled>
  Disabled
</Button>

<Button variant="danger" loading>
  Loading...
</Button>
```

### Cards

Container components for content grouping.

#### Basic Card
```jsx
import Card, { CardBody, CardHeader, CardFooter } from '@/components/Card'

<Card>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    Card content goes here
  </CardBody>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

#### Elevated Card
```jsx
<Card elevated>
  <CardBody>
    Content with stronger shadow
  </CardBody>
</Card>
```

### Form Components

#### Input
```jsx
import Input from '@/components/Input'

<Input
  type="email"
  label="Email Address"
  placeholder="you@example.com"
  error={errors.email}
  helpText="We'll never share your email"
  required
/>
```

#### TextArea
```jsx
import { TextArea } from '@/components/Input'

<TextArea
  label="Comments"
  placeholder="Enter your comments..."
  rows={4}
/>
```

#### Select
```jsx
import { Select } from '@/components/Input'

<Select
  label="Choose a crop"
  options={[
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
  ]}
/>
```

### Layout

The Layout component wraps all pages with Navbar, Footer, and proper spacing.

```jsx
import Layout from '@/components/Layout'

export default function MyPage() {
  return (
    <Layout user={user} title="VeriFolium">
      <h1>Page Title</h1>
      <p>Page content</p>
    </Layout>
  )
}
```

#### Full Width Layout
```jsx
<Layout fullWidth>
  <div className="w-full">
    Full width content
  </div>
</Layout>
```

### Navigation Components

#### Navbar
- Sticky header with logo and navigation
- Mobile-responsive hamburger menu
- User authentication status display
- Supports logged-in and logged-out states

#### Footer
- Dark theme footer with company info
- Quick links to product, company, and legal pages
- Social media links
- Copyright information

### Utility Components

#### Badge
```jsx
import Badge from '@/components/Utils'

<Badge variant="primary">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
```

#### Alert
```jsx
import { Alert } from '@/components/Utils'

<Alert type="success" title="Success!">
  Your action completed successfully.
</Alert>

<Alert type="error">Error message</Alert>

<Alert type="warning" title="Warning" onClose={handleClose}>
  This is a closeable alert
</Alert>
```

#### Hero Section
```jsx
import { Hero } from '@/components/Utils'

<Hero
  title="Main Heading"
  subtitle="Subheading"
  description="Description of your offering"
  primaryAction={{
    text: 'Get Started',
    href: '/signup',
  }}
  secondaryAction={{
    text: 'Learn More',
    href: '/about',
  }}
/>
```

---

## CSS Utilities

### Container Classes

```css
.container-app     /* max-width: 80rem (1280px) with padding */
.container-sm      /* max-width: 42rem (672px) with padding */
```

### Grid Classes

```css
.grid-auto         /* Responsive grid (1 col mobile, 2 col tablet, 3 col desktop) */
.grid-2            /* 1 col mobile, 2 col desktop */
.grid-3            /* 1 col mobile, 3 col desktop */
```

### Text Utilities

```css
.text-gradient     /* Gradient text (primary to secondary) */
.text-subtle       /* Neutral-500 color */
.text-muted        /* Neutral-400 color */
.truncate-2        /* Truncate text to 2 lines */
.truncate-3        /* Truncate text to 3 lines */
```

### Layout Utilities

```css
.center-flex       /* Flexbox centering (items-center justify-center) */
.center-grid       /* Grid centering (place-items-center) */
.glass             /* Glassmorphism effect */
```

### Gradient Utilities

```css
.gradient-primary  /* Primary green gradient */
.gradient-secondary /* Secondary purple gradient */
.gradient-accent   /* Accent orange gradient */
```

### Shadow Utilities

```css
.shadow-soft       /* Subtle shadow */
.shadow-strong     /* Prominent shadow */
```

### Section Spacing

```css
.section           /* py-16 md:py-24 */
.section-sm        /* py-8 md:py-12 */
```

---

## Typography

### Headings

```jsx
<h1>Large Primary Heading (4xl on mobile, 5xl on desktop)</h1>
<h2>Section Heading (3xl on mobile, 4xl on desktop)</h2>
<h3>Subsection Heading (2xl on mobile, 3xl on desktop)</h3>
<h4>Minor Heading (xl on mobile, 2xl on desktop)</h4>
<h5>Emphasis Text (lg, semibold)</h5>
<h6>Small Emphasis (base, semibold)</h6>
```

### Paragraphs

```jsx
<p>Standard paragraph text with optimal line-height (1.5)</p>
```

---

## Responsive Design

All components are fully responsive and follow this breakpoint structure:

- **Mobile**: Default (320px and up)
- **Tablet**: `sm:` prefix (640px and up)
- **Desktop**: `md:` and `lg:` prefixes (768px+ and 1024px+ respectively)

### Example
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

---

## Animation

Smooth transitions and animations are built-in:

```css
.animate-fade-in   /* Fade in animation (0.3s) */
.animate-slide-down /* Slide down animation (0.3s) */
```

Global transitions are applied to all interactive elements with `transition-all duration-200`.

---

## Accessibility

All components follow accessibility best practices:

- **ARIA Labels**: Buttons and interactive elements have proper labels
- **Focus States**: All interactive elements have visible focus rings
- **Semantic HTML**: Proper heading hierarchy, form labels, etc.
- **Color Contrast**: All text meets WCAG AA standards
- **Keyboard Navigation**: Full keyboard support for all interactive elements

---

## Pages Included

### 1. Home Page (Index)
- Hero section with CTA
- Features showcase grid
- How it works section with visual steps
- Call-to-action section
- Fully responsive and mobile-optimized

### 2. About Page
- Mission statement
- Statistics display
- Core values section
- Team profiles
- Technology overview
- Call-to-action for signup

### 3. Login Page
- Clean, centered form layout
- Email and password fields with icons
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Sign up link for new users
- Feature highlights

### 4. Password Reset Pages

#### Request Reset (Passwords/New)
- Email input field
- Help text for email recovery
- Back to login link

#### Set New Password (Passwords/Edit)
- Password strength indicator
- Confirm password field
- Show/hide password toggles
- Password requirements guide
- Validation feedback

---

## Design Principles

1. **Minimalistic**: Clean, uncluttered interfaces
2. **Consistency**: Uniform spacing, colors, and typography
3. **Accessibility**: Inclusive design for all users
4. **Mobile-First**: Responsive at all breakpoints
5. **Performance**: Optimized CSS and component structure
6. **User-Friendly**: Intuitive navigation and interactions

---

## Customization Guide

### Changing Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    600: '#NEW_HEX_VALUE',
    // ... other shades
  },
}
```

### Modifying Spacing

Edit spacing in `tailwind.config.js`:

```js
spacing: {
  'custom': '2.5rem',
}
```

### Adding New Components

Create new components in `app/javascript/components/`:

```tsx
// MyComponent.tsx
export default function MyComponent({ prop1, prop2 }) {
  return (
    <div className="card card-base">
      {/* Component content */}
    </div>
  )
}
```

### Extending Styles

Add custom styles to `app/javascript/entrypoints/application.css`:

```css
@layer components {
  .my-custom-class {
    @apply flex items-center justify-center p-4;
  }
}
```

---

## Quick Reference

### Common Class Combinations

```jsx
/* Primary Button */
<button className="btn btn-primary btn-lg">Click</button>

/* Card with hover effect */
<div className="card shadow-md hover:shadow-lg">Content</div>

/* Responsive Grid */
<div className="grid-auto">Items</div>

/* Centered Hero */
<div className="text-center space-y-6">
  <h1>Title</h1>
  <p>Description</p>
</div>

/* Form Group */
<div className="form-group">
  <label className="form-label">Label</label>
  <input className="form-input" />
</div>

/* Alert Box */
<div className="alert alert-success">
  Success message
</div>
```

---

## Performance Tips

1. **Use CSS Classes**: Avoid inline styles for better caching
2. **Component Reusability**: Leverage existing components
3. **Mobile-First**: Start with mobile design, enhance for desktop
4. **Tree Shaking**: Tailwind CSS automatically removes unused styles
5. **Lazy Loading**: Use React's lazy loading for heavy components

---

## Browser Support

All components are tested and supported on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Need Help?

For questions about the design system:
1. Check the component files in `app/javascript/components/`
2. Review the example implementations in the page files
3. Consult Tailwind CSS documentation: https://tailwindcss.com
4. Check the configuration in `tailwind.config.js`

---

## Future Enhancements

Potential additions to the design system:
- Dark mode support
- Animation library
- Additional page templates
- Data visualization components
- Advanced form components
- Internationalization integration

---

**Version**: 1.0  
**Last Updated**: 2026-06-13  
**Created for**: VeriFolium AgriTech Application
