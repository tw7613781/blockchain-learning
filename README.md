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

### EVM ABI Encoding
- **Tag ABI Encoding System**: Deep dive into Olares DID's compact encoding architecture
  - Why custom encoding? (70-90% gas savings vs full ABI strings)
  - Compact type byte encoding rules (Tag.sol)
  - Tuple field name flattening (tree → 2D array pre-order traversal)
  - Event-based storage architecture (on-chain hashes + off-chain field names)
  - SDK decoding process (reconstructing human-readable data)

### Solana Architecture
- **Account Model**: Understand Solana's revolutionary account-based storage
- **PDA Calculator**: Interactive Program Derived Address generation
- **Anchor Framework**: Deep dive into the most popular Solana dev framework
- **Cross-Program Invocation (CPI)**: Learn program composability patterns
- **EVM vs Solana**: Side-by-side comparison using real atomic swap contracts


### DeFi Math & Algorithms (NEW! 🎉)
- **Synthetix StakingRewards Model**: The most elegant and widely-used staking rewards distribution algorithm
  - The problem: How to distribute rewards fairly with O(1) complexity?
  - Mathematical principles: rewardPerToken and time-weighted calculations
  - Interactive simulation: Watch 小明 and 小红 stake, withdraw, and earn rewards in real-time
  - Production code: Used by Uniswap V2, Sushiswap, Curve, and hundreds of DeFi protocols


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
