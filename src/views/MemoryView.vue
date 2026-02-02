<template>
  <div class="min-h-screen bg-gray-950">
    <!-- Header -->
    <header class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="text-white font-semibold">Back to Home</span>
          </router-link>
          <h1 class="text-xl font-bold text-white">EVM Memory Operations</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <div class="card max-w-4xl mx-auto">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">Coming Soon</h2>
        </div>
        <div class="card-body text-center py-12">
          <div class="w-24 h-24 bg-memory-data/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-memory-data" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">Memory Operations Visualization</h3>
          <p class="text-gray-400 max-w-2xl mx-auto mb-6">
            This module will show assembly operations step-by-step with live memory
            visualization, including mstore, mload, and free memory pointer management.
          </p>
          <router-link to="/" class="btn btn-primary">
            Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Coming soon
</script>
