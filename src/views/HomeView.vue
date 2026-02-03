<template>
  <div class="min-h-screen bg-gray-950">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background gradient - owl themed -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-gray-950 to-indigo-900/20"></div>
      
      <div class="relative container mx-auto px-6 py-20">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Owl Logo -->
          <div class="mb-8 flex justify-center">
            <div class="w-24 h-24 rounded-full shadow-2xl shadow-blue-500/30 overflow-hidden">
              <!-- Owl SVG inline - matching the logo -->
              <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <!-- Main background circle -->
                <circle cx="50" cy="50" r="50" fill="#2d4a6f"/>
                
                <!-- Darker top arc for head -->
                <path d="M 10 50 Q 10 15 50 15 Q 90 15 90 50 Z" fill="#1e3a5f"/>
                
                <!-- Left eye (large white circle) -->
                <ellipse cx="32" cy="38" rx="13" ry="14" fill="white"/>
                <!-- Right eye (large white circle) -->
                <ellipse cx="68" cy="38" rx="13" ry="14" fill="white"/>
                <!-- Bridge connecting eyes -->
                <rect x="32" y="34" width="36" height="8" fill="white"/>
                
                <!-- Left pupil -->
                <circle cx="32" cy="38" r="8" fill="#1e3a5f"/>
                
                <!-- Right pupil -->
                <circle cx="68" cy="38" r="8" fill="#1e3a5f"/>
                
                <!-- Body (lower half) -->
                <ellipse cx="50" cy="65" rx="35" ry="25" fill="#2d4a6f"/>
                
                <!-- Left foot -->
                <g transform="translate(35, 75)">
                  <rect x="-3" y="0" width="6" height="12" rx="2" fill="white"/>
                  <line x1="-4" y1="12" x2="-6" y2="16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <line x1="0" y1="12" x2="0" y2="16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <line x1="4" y1="12" x2="6" y2="16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </g>
                
                <!-- Right foot -->
                <g transform="translate(65, 75)">
                  <rect x="-3" y="0" width="6" height="12" rx="2" fill="white"/>
                  <line x1="-4" y1="12" x2="-6" y2="16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <line x1="0" y1="12" x2="0" y2="16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <line x1="4" y1="12" x2="6" y2="16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </g>
              </svg>
            </div>
          </div>

          <!-- Main Heading -->
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Blockchain Learning
          </h1>
          
          <!-- Tagline -->
          <p class="text-xl md:text-2xl text-gray-400 mb-8">
            Interactive learning platform for <span class="text-blue-400">blockchain fundamentals</span>
          </p>

          <!-- Description -->
          <p class="text-gray-500 max-w-2xl mx-auto mb-12">
            From EVM internals to Solana's account model, from storage patterns to cross-chain bridges.
            Learn through interactive visualizations and real-world case studies.
          </p>

          <!-- CTA Button -->
          <button 
            @click="scrollToModules"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all inline-flex items-center"
          >
            Explore Learning Modules
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Tech Stack Badges -->
        <div class="flex flex-wrap justify-center gap-3 mt-12 max-w-3xl mx-auto">
          <span class="px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-sm">
            EVM Storage & Memory
          </span>
          <span class="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full text-sm">
            Assembly Optimization
          </span>
          <span class="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-sm">
            Interactive Learning
          </span>
          <span class="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-sm">
            Solana Account Model
          </span>
          <span class="px-4 py-2 bg-pink-500/10 border border-pink-500/30 text-pink-400 rounded-full text-sm">
            Cross-Chain Bridges
          </span>
        </div>
      </div>
    </section>

    <!-- Learning Tracks Section -->
    <section class="container mx-auto px-6 py-20" ref="modulesSection">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Learning Tracks</h2>
        <p class="text-gray-400">Choose your path and dive deep into blockchain technology</p>
      </div>

      <!-- EVM Track -->
      <div class="mb-16">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-white">Ethereum Virtual Machine (EVM)</h3>
            <p class="text-gray-400 text-sm">Master EVM storage, memory, and assembly programming</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Storage Track -->
          <div class="card group hover:scale-105 transition-transform duration-300">
            <div class="card-header">
              <div class="flex items-center justify-between">
                <h4 class="text-xl font-bold text-white">💾 Storage Deep Dive</h4>
                <span class="text-xs text-gray-500">2 modules</span>
              </div>
            </div>
            <div class="card-body">
              <p class="text-gray-400 mb-4">
                Understand EVM storage layout, ERC-7201 namespacing, and collision prevention strategies
              </p>
              <div class="space-y-2">
                <router-link 
                  to="/storage/erc7201"
                  class="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                >
                  <div class="text-sm font-semibold text-white">ERC-7201 Calculator</div>
                  <div class="text-xs text-gray-400">Interactive slot calculation</div>
                </router-link>
                <router-link 
                  to="/storage/namespaces"
                  class="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                >
                  <div class="text-sm font-semibold text-white">Storage Layout Visualization</div>
                  <div class="text-xs text-gray-400">Complete storage structure overview</div>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Memory Track -->
          <div class="card group hover:scale-105 transition-transform duration-300">
            <div class="card-header">
              <div class="flex items-center justify-between">
                <h4 class="text-xl font-bold text-white">🧠 Memory & Assembly</h4>
                <span class="text-xs text-gray-500">2 modules</span>
              </div>
            </div>
            <div class="card-body">
              <p class="text-gray-400 mb-4">
                Learn memory management, assembly operations, and optimization techniques
              </p>
              <div class="space-y-2">
                <router-link 
                  to="/memory/basics"
                  class="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                >
                  <div class="text-sm font-semibold text-white">Memory Basics</div>
                  <div class="text-xs text-gray-400">Structure, types & assembly ops</div>
                </router-link>
                <router-link 
                  to="/memory/domainutils"
                  class="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                >
                  <div class="text-sm font-semibold text-white">DomainUtils Case Study</div>
                  <div class="text-xs text-gray-400">77% gas savings with assembly</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Solana Track -->
      <div class="mb-16">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-white">Solana Virtual Machine (SVM)</h3>
            <p class="text-gray-400 text-sm">Master Solana's account model, PDAs, and parallel execution</p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Account Model -->
          <div class="card group hover:scale-105 transition-transform duration-300">
            <div class="card-header">
              <div class="flex items-center justify-between">
                <h4 class="text-xl font-bold text-white">🏦 Account Model</h4>
                <span class="text-xs text-gray-500">1 module</span>
              </div>
            </div>
            <div class="card-body">
              <p class="text-gray-400 mb-4">
                Understand Solana's revolutionary account-based architecture and how it differs from EVM
              </p>
              <div class="space-y-2">
                <router-link 
                  to="/solana/account-model"
                  class="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                >
                  <div class="text-sm font-semibold text-white">Solana Account Model</div>
                  <div class="text-xs text-gray-400">Everything is an account</div>
                </router-link>
              </div>
            </div>
          </div>

          <!-- PDA & Seeds -->
          <div class="card group hover:scale-105 transition-transform duration-300">
            <div class="card-header">
              <div class="flex items-center justify-between">
                <h4 class="text-xl font-bold text-white">🔑 PDA & Seeds</h4>
                <span class="text-xs text-gray-500">1 module</span>
              </div>
            </div>
            <div class="card-body">
              <p class="text-gray-400 mb-4">
                Learn Program Derived Addresses and how to deterministically generate account addresses
              </p>
              <div class="space-y-2">
                <router-link 
                  to="/solana/pda-seeds"
                  class="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                >
                  <div class="text-sm font-semibold text-white">PDA Calculator</div>
                  <div class="text-xs text-gray-400">Interactive PDA generation</div>
                </router-link>
              </div>
            </div>
          </div>

          <!-- EVM vs Solana -->
          <div class="card group hover:scale-105 transition-transform duration-300">
            <div class="card-header">
              <div class="flex items-center justify-between">
                <h4 class="text-xl font-bold text-white">⚡ EVM vs Solana</h4>
                <span class="text-xs text-gray-500">1 module</span>
              </div>
            </div>
            <div class="card-body">
              <p class="text-gray-400 mb-4">
                Side-by-side comparison using real atomic swap bridge contracts from both ecosystems
              </p>
              <div class="space-y-2">
                <router-link 
                  to="/solana/evm-comparison"
                  class="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                >
                  <div class="text-sm font-semibold text-white">Full Comparison</div>
                  <div class="text-xs text-gray-400">Otmoic bridge case study</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- Why This Platform Section -->
    <section class="container mx-auto px-6 py-16">
      <div class="card max-w-5xl mx-auto">
        <div class="card-header">
          <h3 class="text-2xl font-bold text-white">Why This Platform?</h3>
        </div>
        <div class="card-body">
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Interactive Learning</h4>
              <p class="text-gray-400 text-sm">
                Visualizations and hands-on examples make complex concepts easy to grasp
              </p>
            </div>
            <div>
              <div class="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Real-World Code</h4>
              <p class="text-gray-400 text-sm">
                Based on production smart contracts, not theoretical examples
              </p>
            </div>
            <div>
              <div class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Deep Technical</h4>
              <p class="text-gray-400 text-sm">
                Go beyond surface-level tutorials to understand how things really work
              </p>
            </div>
            <div>
              <div class="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Interview Ready</h4>
              <p class="text-gray-400 text-sm">
                Perfect for demonstrating blockchain expertise in technical interviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-800 bg-gray-900/50 mt-20">
      <div class="container mx-auto px-6 py-8">
        <div class="text-center">
          <p class="text-gray-400">
            All rights reserved by learning.tangwei.uk
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const modulesSection = ref<HTMLElement | null>(null)

const scrollToModules = () => {
  modulesSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
