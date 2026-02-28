![Deploy](https://github.com/Em-Ant/svelte-webpack/workflows/Deploy/badge.svg?branch=main)

# Svelte Experiments

Tiny components library built with Svelte 5 and TypeScript.

A test page where you can see all the components is available [here](https://emant.altervista.org/svelte/).

## Components

- `Accordion` - Collapsible content panels
- `Alert` - Notification messages with variants (info, warn, error, success)
- `Button` - Action buttons with loading and success states
- `Checkbox` - Checkbox input component
- `Indicator` - Loading/status indicator
- `Input` - Text input field
- `Label` - Form label component
- `Modal` - Dialog/modal window
- `Radio` - Radio button input
- `Select` - Dropdown select component
- `Slider` - Range slider input
- `Tabs` - Tabbed navigation
- `Toggle` - Toggle switch
- `Tooltip` - Hover tooltip

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Testing

Run all tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

Generate test coverage report:

```bash
pnpm test:coverage
```

Run tests for a specific component:

```bash
pnpm test src/components/Button.test.ts
```

## Type Checking

```bash
pnpm check
```
