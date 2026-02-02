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
          <h1 class="text-xl font-bold text-white">ERC-7201 Storage Slot Calculator</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Left Column: Input and Controls -->
        <div class="space-y-6">
          <!-- Input Card -->
          <div class="card">
            <div class="card-header">
              <h2 class="text-xl font-bold text-white">Namespace Input</h2>
            </div>
            <div class="card-body">
              <label class="block text-sm font-medium text-gray-400 mb-2">
                Enter Namespace String
              </label>
              <input
                v-model="namespace"
                type="text"
                placeholder="e.g., terminus.TerminusDID"
                class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                @input="calculateSlot"
              />
              <p class="text-xs text-gray-500 mt-2">
                Try: terminus.TerminusDID, terminus.TagRegistry, terminus.ERC721
              </p>
            </div>
          </div>

          <!-- Presets -->
          <div class="card">
            <div class="card-header">
              <h2 class="text-xl font-bold text-white">Quick Presets</h2>
            </div>
            <div class="card-body">
              <div class="grid grid-cols-1 gap-3">
                <button
                  v-for="preset in presets"
                  :key="preset.namespace"
                  @click="loadPreset(preset)"
                  class="btn btn-secondary text-left flex items-center justify-between group"
                >
                  <div>
                    <div class="font-semibold text-white">{{ preset.name }}</div>
                    <div class="text-xs text-gray-400">{{ preset.namespace }}</div>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Result Card -->
          <div v-if="result" class="card">
            <div class="card-header">
              <h2 class="text-xl font-bold text-white">Calculated Storage Slot</h2>
            </div>
            <div class="card-body">
              <div class="bg-gray-800 rounded-lg p-4 font-mono text-sm break-all">
                <div class="text-storage-slot">{{ result }}</div>
              </div>
              <button
                @click="copyResult"
                class="mt-3 btn btn-primary w-full"
              >
                {{ copied ? '✓ Copied!' : 'Copy to Clipboard' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Calculation Steps -->
        <div class="space-y-6">
          <div class="card">
            <div class="card-header flex items-center justify-between">
              <h2 class="text-xl font-bold text-white">Calculation Steps</h2>
              <button
                v-if="steps.length > 0"
                @click="animateSteps"
                class="btn btn-primary text-sm"
                :disabled="isAnimating"
              >
                {{ isAnimating ? 'Playing...' : '▶ Play Animation' }}
              </button>
            </div>
            <div class="card-body space-y-4">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="step-card"
                :class="{ 'step-active': currentStep === index, 'step-completed': currentStep > index }"
              >
                <div class="flex items-start space-x-4">
                  <div class="step-number">{{ index + 1 }}</div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-white mb-2">{{ step.title }}</h3>
                    <div class="code-block text-xs mb-2">
                      <code class="text-primary-400">{{ step.code }}</code>
                    </div>
                    <div class="bg-gray-800 rounded p-3 font-mono text-xs break-all text-gray-300 mb-2">
                      {{ step.result }}
                    </div>
                    <p class="text-sm text-gray-400">{{ step.description }}</p>
                  </div>
                </div>
              </div>

              <div v-if="steps.length === 0" class="text-center text-gray-500 py-8">
                Enter a namespace to see the calculation steps
              </div>
            </div>
          </div>

          <!-- Formula Explanation -->
          <div class="card">
            <div class="card-header">
              <h2 class="text-xl font-bold text-white">ERC-7201 Formula</h2>
            </div>
            <div class="card-body">
              <div class="code-block mb-4">
                <code class="text-xs text-gray-300">
                  slot = keccak256(abi.encode(<br>
                  &nbsp;&nbsp;uint256(keccak256(namespace)) - 1<br>
                  )) & ~bytes32(uint256(0xff))
                </code>
              </div>
              <div class="space-y-3 text-sm">
                <div>
                  <div class="font-semibold text-white mb-1">Why subtract 1?</div>
                  <div class="text-gray-400">Ensures the hash is never exactly a round number, adding entropy.</div>
                </div>
                <div>
                  <div class="font-semibold text-white mb-1">Why clear lowest 8 bits?</div>
                  <div class="text-gray-400">Avoids collision with standard storage slots (0-255) and provides 256× safety margin.</div>
                </div>
                <div>
                  <div class="font-semibold text-white mb-1">Result format</div>
                  <div class="text-gray-400">Always ends in <code class="text-storage-slot">00</code>, making collisions extremely rare.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { calculateERC7201Slot, getERC7201CalculationSteps } from '../utils/evm'

interface Preset {
  name: string
  namespace: string
  expectedSlot: string
}

const namespace = ref('terminus.TerminusDID')
const result = ref('')
const steps = ref<any[]>([])
const currentStep = ref(-1)
const isAnimating = ref(false)
const copied = ref(false)

const presets: Preset[] = [
  {
    name: 'TerminusDID Storage',
    namespace: 'terminus.TerminusDID',
    expectedSlot: '0x4666f7c9ed2861482dc7def82e62cce78d7520c45f1fbe5cf48442a77f54bb00'
  },
  {
    name: 'TagRegistry Storage',
    namespace: 'terminus.TagRegistry',
    expectedSlot: '0xc8ba1573a83064b637069eac29a25dd52440bc4f98f399766e0040c151cb1f00'
  },
  {
    name: 'ERC721 Storage',
    namespace: 'terminus.ERC721',
    expectedSlot: '0x04cc3b1160dff1f611a48ab325b162d9ef138626f346e30f670e6c29c03db600'
  }
]

const calculateSlot = () => {
  if (!namespace.value.trim()) {
    result.value = ''
    steps.value = []
    return
  }

  try {
    result.value = calculateERC7201Slot(namespace.value)
    steps.value = getERC7201CalculationSteps(namespace.value)
    currentStep.value = -1
  } catch (error) {
    console.error('Calculation error:', error)
    result.value = 'Error calculating slot'
    steps.value = []
  }
}

const loadPreset = (preset: Preset) => {
  namespace.value = preset.namespace
  calculateSlot()
}

const animateSteps = async () => {
  isAnimating.value = true
  currentStep.value = -1

  for (let i = 0; i < steps.value.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 800))
    currentStep.value = i
  }

  await new Promise(resolve => setTimeout(resolve, 500))
  isAnimating.value = false
}

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(result.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

onMounted(() => {
  calculateSlot()
})
</script>

<style scoped>
.step-card {
  @apply bg-gray-800/50 border border-gray-700 rounded-lg p-4 transition-all duration-300;
}

.step-card.step-active {
  @apply bg-primary-500/10 border-primary-500 shadow-lg shadow-primary-500/20;
}

.step-card.step-completed {
  @apply opacity-60;
}

.step-number {
  @apply w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0;
}

.step-active .step-number {
  @apply bg-primary-500 animate-pulse-glow;
}

.step-completed .step-number {
  @apply bg-green-600;
}
</style>
