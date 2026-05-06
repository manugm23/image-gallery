# Image Gallery

A responsive and interactive image gallery built with React, TypeScript, and Tailwind CSS. This project was developed iteratively following professional development practices including clean code principles, Git Flow, and comprehensive testing.

---

# Features

- **Responsive grid layout** — adapts to any screen size
- **Featured image** — first image displayed prominently with Favorites overlay
- **Drag & Drop reordering** — reorder images by dragging and dropping
- **Multiple selection** — select one or more images and delete them in batch
- **Personal images** — gallery loaded with your own photos stored locally
- **Accessible** — keyboard navigation and screen reader friendly

---

# Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [dnd-kit](https://dndkit.com) | Drag and drop |
| [Vitest](https://vitest.dev) | Unit & integration testing |
| [React Testing Library](https://testing-library.com/react) | Component testing |

---

# Project Structure

```
image-gallery/
├── public/
│   └── bean-pictures/       # Optimized WebP images (16 photos)
│       ├── bean1.webp
│       └── ...
├── src/
│   ├── components/
│   │   ├── Gallery.tsx          # Main gallery — state & layout
│   │   ├── Gallery.test.tsx     # Gallery integration tests
│   │   ├── ImageItem.tsx        # Single image card — drag, select, overlay
│   │   └── ImageItem.test.tsx   # ImageItem unit tests
│   ├── data/
│   │   └── images.ts            # Initial image data
│   ├── types/
│   │   └── image.ts             # Image interface
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Tailwind CSS entry
│   ├── vite-env.d.ts            # Vite type declarations
│   └── setupTests.ts            # Vitest + Testing Library setup
├── index.html
├── vite.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── eslint.config.js
└── package.json
```

---

# Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/image-gallery.git

# Navigate to the project folder
cd image-gallery

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests in watch mode
```

---

# Development Iterations

This project was built in 6 incremental iterations following Git Flow.

### Iteration 1 — Foundations
- Project setup with Vite + React + TypeScript
- `Image` interface defined in `src/types/image.ts`
- `Gallery` and `ImageItem` functional components
- Featured image logic (first item in array)

### Iteration 2 — Styling
- Tailwind CSS v4 integrated via `@tailwindcss/vite` plugin
- Responsive grid layout (3 columns)
- Featured image displayed larger and centered
- Hover animations and smooth transitions
- iOS-style Favorites overlay with heart icon

### Iteration 3 — Interactivity
- Delete button per image (later replaced by batch selection)
- Parent-child callback pattern (`onDelete` prop)
- Immutable state updates with `Array.filter()`
- `window.confirm` for deletion confirmation

### Iteration 4 — Drag & Drop
- `dnd-kit` library integrated (`@dnd-kit/core`, `@dnd-kit/sortable`)
- `DndContext` + `SortableContext` wrapping the gallery
- `useSortable` hook in each `ImageItem`
- `arrayMove` utility for reordering state
- `PointerSensor` with 8px activation distance to prevent click conflicts

### Iteration 5 — Multiple Selection
- `Set<string>` state for selected image IDs
- Toggle select on click with visual feedback (blue ring + checkmark)
- Batch delete bar appears when selection is active
- Individual delete removed in favour of selection-based deletion

### Iteration 6 — Testing
- Vitest configured with `jsdom` environment
- React Testing Library for user-centric tests
- `vi.mock()` for dnd-kit and image imports
- `vi.spyOn(window, 'confirm')` for deletion flow testing
- 14 tests covering rendering, selection, and deletion

---

# Testing

```bash
npm run test
```

```
✓ src/components/ImageItem.test.tsx   (6 tests)
✓ src/components/Gallery.test.tsx     (7 tests)

Test Files  2 passed
Tests      13 passed
```

**Coverage targets:**
- Statements: > 80%
- Functions: > 80%
- Branches: > 75%

---

# Git Flow

```
main
├── feature/basic-gallery
├── feature/styles
├── feature/event-handlers
├── feature/drag-and-drop
├── feature/multiple-selection
└── feature/testing
```

Commits follow the [Conventional Commits](https://www.conventionalcommits.org) specification:

```
feat: implement basic gallery structure with featured image
feat: add tailwind configuration
feat: implement responsive grid layout with featured image
feat: implement image deletion with confirmation
feat: implement drag-and-drop reordering
feat: implement multiple selection and batch deletion
feat: add comprehensive test suite
```

---

# Accessibility

- All images include descriptive `alt` text
- Buttons have `aria-label` attributes
- Keyboard navigation supported
- Semantic HTML structure

---

# Performance

- Images compressed from ~3MB to ~100KB each using `sips`
- Local images imported directly via Vite for optimized bundling

---

# License

MIT