# Blockchain Learning

Interactive learning platform for blockchain fundamentals.

## Overview

This project provides interactive visualizations for understanding blockchain internals. Current focus: Ethereum Virtual Machine (EVM) storage and memory operations.

## Modules

### EVM Storage
- **ERC-7201 Calculator**: Interactive storage slot calculation
- **Storage Layout**: Visualize storage structure with namespaces, mappings, and arrays

### EVM Memory & Assembly
- **Memory Basics**: Memory structure, type storage, and assembly operations
- **DomainUtils Case Study**: Gas optimization through assembly (77% savings)

### Solana Architecture (NEW! 🎉)
- **Account Model**: Understand Solana's revolutionary account-based storage
- **PDA Calculator**: Interactive Program Derived Address generation
- **EVM vs Solana**: Side-by-side comparison using real atomic swap contracts

> All Solana content is based on real production code from the [Otmoic](https://github.com/otmoic) atomic swap bridge project.

## Tech Stack

- Vue 3 + TypeScript
- Tailwind CSS
- Vite

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── views/              # Page components
│   ├── HomeView.vue
│   ├── ERC7201View.vue
│   ├── NamespacesView.vue
│   ├── MemoryBasicsView.vue
│   └── DomainUtilsView.vue
├── utils/              # Utility functions
└── types/              # TypeScript types
```

## License

MIT
