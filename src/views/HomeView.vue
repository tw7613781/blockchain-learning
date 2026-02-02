<template>
  <div class="min-h-screen bg-gray-950">
    <!-- Header -->
    <header class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">EVM</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">EVM Storage & Memory Visualizer</h1>
            <p class="text-xs text-gray-400">Based on did-contracts</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="container mx-auto px-6 py-20">
      <div class="text-center max-w-4xl mx-auto">
        <h2 class="text-5xl font-bold text-white mb-6">
          Understand EVM Storage at a
          <span class="text-gradient bg-gradient-to-r from-primary-400 to-purple-400">Deeper Level</span>
        </h2>
        <p class="text-xl text-gray-400 mb-8">
          Interactive visualizations of advanced Solidity patterns from the did-contracts project
        </p>
        <div class="flex justify-center gap-4">
          <button 
            @click="scrollToModules"
            class="btn btn-primary px-8 py-3 text-lg"
          >
            Explore Visualizations
          </button>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="container mx-auto px-6 py-16" ref="modulesSection">
      <h3 class="text-3xl font-bold text-white text-center mb-12">Visualization Modules</h3>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <!-- ERC-7201 Module -->
        <router-link 
          to="/storage/erc7201"
          class="card hover:scale-105 transition-transform duration-300 group"
        >
          <div class="card-header">
            <div class="flex items-center justify-between">
              <h4 class="text-xl font-bold text-white">ERC-7201 Calculator</h4>
              <div class="w-12 h-12 bg-storage-slot/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-storage-slot" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="text-gray-400 mb-4">
              Interactive storage slot calculator with animated step-by-step breakdown of the ERC-7201 formula.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-storage-slot/10 text-storage-slot rounded-full text-sm">Storage Layout</span>
              <span class="px-3 py-1 bg-storage-slot/10 text-storage-slot rounded-full text-sm">Namespaces</span>
              <span class="px-3 py-1 bg-storage-slot/10 text-storage-slot rounded-full text-sm">UUPS</span>
            </div>
          </div>
        </router-link>

        <!-- Namespaces Module -->
        <router-link 
          to="/storage/namespaces"
          class="card hover:scale-105 transition-transform duration-300 group"
        >
          <div class="card-header">
            <div class="flex items-center justify-between">
              <h4 class="text-xl font-bold text-white">Storage Namespaces</h4>
              <div class="w-12 h-12 bg-storage-namespace/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-storage-namespace" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="text-gray-400 mb-4">
              Compare multiple storage namespaces side-by-side and understand collision avoidance.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-storage-namespace/10 text-storage-namespace rounded-full text-sm">Multi-layer</span>
              <span class="px-3 py-1 bg-storage-namespace/10 text-storage-namespace rounded-full text-sm">Upgradeable</span>
            </div>
          </div>
        </router-link>

        <!-- Tag.Group Module -->
        <router-link 
          to="/tag-group"
          class="card hover:scale-105 transition-transform duration-300 group"
        >
          <div class="card-header">
            <div class="flex items-center justify-between">
              <h4 class="text-xl font-bold text-white">Tag.Group Structure</h4>
              <div class="w-12 h-12 bg-storage-data/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-storage-data" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="text-gray-400 mb-4">
              Watch the dual-structure (array + mapping) in action with animated Add, Remove, and Swap-and-Pop operations.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-storage-data/10 text-storage-data rounded-full text-sm">Data Structure</span>
              <span class="px-3 py-1 bg-storage-data/10 text-storage-data rounded-full text-sm">O(1) Operations</span>
            </div>
          </div>
        </router-link>

        <!-- Memory Module -->
        <router-link 
          to="/memory"
          class="card hover:scale-105 transition-transform duration-300 group"
        >
          <div class="card-header">
            <div class="flex items-center justify-between">
              <h4 class="text-xl font-bold text-white">Memory Operations</h4>
              <div class="w-12 h-12 bg-memory-data/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-memory-data" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="text-gray-400 mb-4">
              Step through assembly operations with live memory visualization showing mstore, mload, and pointer management.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-memory-data/10 text-memory-data rounded-full text-sm">Assembly</span>
              <span class="px-3 py-1 bg-memory-data/10 text-memory-data rounded-full text-sm">Low-level</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Key Features Section -->
    <section class="container mx-auto px-6 py-16">
      <div class="card max-w-4xl mx-auto">
        <div class="card-header">
          <h3 class="text-2xl font-bold text-white">Why This Project?</h3>
        </div>
        <div class="card-body">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-semibold text-white mb-2">🎓 Educational Value</h4>
              <p class="text-gray-400">
                Deep dive into advanced Solidity patterns used in production smart contracts
              </p>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-white mb-2">🎨 Interactive Learning</h4>
              <p class="text-gray-400">
                Animated visualizations make complex concepts easy to understand
              </p>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-white mb-2">⚡ Real-world Examples</h4>
              <p class="text-gray-400">
                Based on actual did-contracts implementation, not textbook examples
              </p>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-white mb-2">💼 Interview Ready</h4>
              <p class="text-gray-400">
                Perfect for demonstrating EVM mastery in technical interviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-800 bg-gray-900/50 mt-20">
      <div class="container mx-auto px-6 py-8">
        <div class="text-center text-gray-400">
          <p>Built with ❤️ to showcase EVM storage and memory operations</p>
          <p class="text-sm mt-2">Based on did-contracts project</p>
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
