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
          <h1 class="text-xl font-bold text-white">Solana Account Model</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Introduction -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">Understanding Solana's Account Model</h2>
        </div>
        <div class="card-body">
          <p class="text-gray-300 mb-4">
            Solana uses a fundamentally different approach to storing state compared to EVM chains. 
            Instead of storing state inside smart contracts, Solana stores all state in <strong class="text-purple-400">accounts</strong>.
          </p>
          <p class="text-gray-300">
            Programs (Solana's term for smart contracts) are <strong class="text-purple-400">stateless</strong> - 
            they only contain executable code. All data is stored in separate accounts that programs can read from and write to.
          </p>
        </div>
      </div>

      <!-- Key Concept: Everything is an Account -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔑 Key Concept: Everything is an Account</h3>
        </div>
        <div class="card-body">
          <div class="grid md:grid-cols-3 gap-4 mb-6">
            <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 class="font-semibold text-purple-400 mb-2">Programs</h4>
              <p class="text-sm text-gray-300">Executable code stored in accounts marked as <code class="text-xs bg-gray-800 px-1 py-0.5 rounded">executable: true</code></p>
            </div>
            <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 class="font-semibold text-blue-400 mb-2">Data Accounts</h4>
              <p class="text-sm text-gray-300">Store program state, owned by programs</p>
            </div>
            <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 class="font-semibold text-green-400 mb-2">Token Accounts</h4>
              <p class="text-sm text-gray-300">Special accounts for holding SPL tokens</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Structure -->
      <div class="grid lg:grid-cols-2 gap-8 mb-8">
        <!-- Left: Account Fields -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-xl font-bold text-white">Account Structure</h3>
          </div>
          <div class="card-body space-y-4">
            <div v-for="field in accountFields" :key="field.name" class="border-l-4 pl-4" :class="field.borderColor">
              <div class="flex items-start justify-between mb-1">
                <h4 class="font-semibold text-white">{{ field.name }}</h4>
                <span class="text-xs text-gray-500 font-mono">{{ field.size }}</span>
              </div>
              <p class="text-sm text-gray-400 mb-2">{{ field.description }}</p>
              <code class="text-xs bg-gray-800 px-2 py-1 rounded block overflow-x-auto">{{ field.example }}</code>
            </div>
          </div>
        </div>

        <!-- Right: Visual Representation -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-xl font-bold text-white">Otmoic Escrow Account Example</h3>
          </div>
          <div class="card-body">
            <p class="text-sm text-gray-400 mb-4">
              From the atomic swap bridge contract, showing how real-world state is stored:
            </p>
            
            <div class="space-y-3">
              <div class="bg-gray-800 rounded p-3">
                <div class="text-xs text-gray-500 mb-1">Address</div>
                <code class="text-xs text-purple-400 break-all">{{ exampleAccount.address }}</code>
              </div>
              
              <div class="bg-gray-800 rounded p-3">
                <div class="text-xs text-gray-500 mb-1">Owner (Program)</div>
                <code class="text-xs text-blue-400 break-all">{{ exampleAccount.owner }}</code>
              </div>
              
              <div class="bg-gray-800 rounded p-3">
                <div class="text-xs text-gray-500 mb-2">Lamports (Balance)</div>
                <div class="flex items-baseline gap-2">
                  <code class="text-xl text-green-400">{{ (exampleAccount.lamports / 1_000_000_000).toFixed(4) }}</code>
                  <span class="text-sm text-gray-400">SOL</span>
                </div>
                <div class="text-xs text-gray-500 mt-1">{{ exampleAccount.lamports.toLocaleString() }} lamports</div>
              </div>
              
              <div class="bg-gray-800 rounded p-3">
                <div class="text-xs text-gray-500 mb-1">Data Size</div>
                <code class="text-xs text-white">{{ exampleAccount.dataSize }} bytes</code>
              </div>
              
              <div class="bg-gray-800 rounded p-3">
                <div class="text-xs text-gray-500 mb-1">Executable</div>
                <code class="text-xs" :class="exampleAccount.executable ? 'text-yellow-400' : 'text-gray-400'">
                  {{ exampleAccount.executable }}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- EVM vs Solana Comparison -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">🔄 EVM vs Solana Storage Model</h3>
        </div>
        <div class="card-body">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-700">
                  <th class="text-left py-3 px-4 text-gray-400 font-semibold">Aspect</th>
                  <th class="text-left py-3 px-4 text-blue-400 font-semibold">EVM (Ethereum)</th>
                  <th class="text-left py-3 px-4 text-purple-400 font-semibold">Solana</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in comparisonItems" :key="index" class="border-b border-gray-800 hover:bg-gray-800/50">
                  <td class="py-3 px-4 font-semibold text-white">{{ item.aspect }}</td>
                  <td class="py-3 px-4 text-gray-300">{{ item.evm }}</td>
                  <td class="py-3 px-4 text-gray-300">{{ item.solana }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Code Example from Otmoic -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">📝 Real Code: Otmoic Escrow Account</h3>
        </div>
        <div class="card-body">
          <p class="text-gray-400 mb-4">
            This is the actual account structure from the Otmoic atomic swap bridge:
          </p>
          
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-sm"><code class="text-gray-300"><span class="text-purple-400">#[account]</span>
<span class="text-blue-400">pub struct</span> <span class="text-yellow-400">Escrow</span> {
    <span class="text-gray-500">/// Sender address</span>
    <span class="text-blue-400">pub</span> from: <span class="text-green-400">Pubkey</span>,              <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// Receiver address</span>
    <span class="text-blue-400">pub</span> to: <span class="text-green-400">Pubkey</span>,                <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// Token program ID</span>
    <span class="text-blue-400">pub</span> token_program: <span class="text-green-400">Pubkey</span>,     <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// Token mint address</span>
    <span class="text-blue-400">pub</span> mint: <span class="text-green-400">Pubkey</span>,              <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// Source token account</span>
    <span class="text-blue-400">pub</span> source: <span class="text-green-400">Pubkey</span>,            <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// Escrow token account</span>
    <span class="text-blue-400">pub</span> escrow_ata: <span class="text-green-400">Pubkey</span>,        <span class="text-gray-500">// 32 bytes</span>
    <span class="text-gray-500">/// SOL amount locked</span>
    <span class="text-blue-400">pub</span> sol_amount: <span class="text-green-400">u64</span>,           <span class="text-gray-500">// 8 bytes</span>
    <span class="text-gray-500">/// Token amount locked</span>
    <span class="text-blue-400">pub</span> token_amount: <span class="text-green-400">u64</span>,         <span class="text-gray-500">// 8 bytes</span>
    <span class="text-gray-500">/// SOL fee</span>
    <span class="text-blue-400">pub</span> sol_fee: <span class="text-green-400">u64</span>,              <span class="text-gray-500">// 8 bytes</span>
    <span class="text-gray-500">/// Token fee</span>
    <span class="text-blue-400">pub</span> token_fee: <span class="text-green-400">u64</span>,            <span class="text-gray-500">// 8 bytes</span>
    <span class="text-gray-500">/// HTLC lock data</span>
    <span class="text-blue-400">pub</span> lock: <span class="text-yellow-400">Lock</span>,               <span class="text-gray-500">// nested struct</span>
    <span class="text-gray-500">/// Direction flag</span>
    <span class="text-blue-400">pub</span> is_out: <span class="text-green-400">bool</span>,             <span class="text-gray-500">// 1 byte</span>
}

<span class="text-gray-500">// Total size: 8 (discriminator) + 257 bytes = 265 bytes</span></code></pre>
          </div>
          
          <div class="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="text-sm text-gray-300">
                <strong class="text-blue-400">Why separate accounts?</strong> This design allows Solana to process transactions in parallel. 
                Multiple escrows can be created/confirmed simultaneously because each has its own account, 
                unlike EVM where all state is in one contract storage.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Takeaways -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">💡 Key Takeaways</h3>
        </div>
        <div class="card-body">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <h4 class="font-semibold text-purple-400">Solana Benefits</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Parallel Processing:</strong> Independent accounts can be modified simultaneously</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Clear Ownership:</strong> Each account has a clear owner program</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>Rent Efficiency:</strong> Pay for storage based on account size</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span><strong>No Conflicts:</strong> Transactions touching different accounts don't conflict</span>
                </li>
              </ul>
            </div>
            
            <div class="space-y-3">
              <h4 class="font-semibold text-blue-400">Developer Considerations</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Account Discovery:</strong> Need to know all account addresses upfront</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Rent Costs:</strong> Accounts must maintain minimum balance for rent</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Size Limits:</strong> Account data has maximum size (10MB)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-400 mt-1">⚠</span>
                  <span><strong>Different Mental Model:</strong> Requires thinking in terms of accounts, not storage slots</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg">
        <h3 class="text-xl font-bold text-white mb-4">🚀 Next Steps</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <router-link 
            to="/solana/pda-seeds"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-purple-400 mb-2">→ PDA & Seeds</h4>
            <p class="text-sm text-gray-300">Learn how to deterministically derive account addresses</p>
          </router-link>
          
          <router-link 
            to="/solana/anchor-structures"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-blue-400 mb-2">→ Anchor Framework</h4>
            <p class="text-sm text-gray-300">Understand Anchor's account validation and macros</p>
          </router-link>
          
          <router-link 
            to="/solana/evm-comparison"
            class="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <h4 class="font-semibold text-green-400 mb-2">→ Full Comparison</h4>
            <p class="text-sm text-gray-300">Side-by-side code comparison with EVM contracts</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const accountFields = ref([
  {
    name: 'address',
    size: '32 bytes',
    description: 'Unique identifier (public key) for this account',
    example: 'FAqaHQHgBFFX8fJB6fQUqNdc8zABV5pGVRdCt7fLLYVo',
    borderColor: 'border-purple-500'
  },
  {
    name: 'owner',
    size: '32 bytes',
    description: 'Program ID that owns this account and can modify its data',
    example: '11111111111111111111111111111111 (System Program)',
    borderColor: 'border-blue-500'
  },
  {
    name: 'lamports',
    size: '8 bytes',
    description: 'Balance in lamports (1 SOL = 1,000,000,000 lamports), used for rent',
    example: '2039280 (≈ 0.00203928 SOL)',
    borderColor: 'border-green-500'
  },
  {
    name: 'data',
    size: 'variable',
    description: 'Raw bytes storing the account state, structure defined by owner program',
    example: '[0x01, 0x02, 0x03, ...] (serialized struct)',
    borderColor: 'border-yellow-500'
  },
  {
    name: 'executable',
    size: '1 byte',
    description: 'Whether this account contains executable program code',
    example: 'false (for data accounts), true (for programs)',
    borderColor: 'border-red-500'
  }
])

const exampleAccount = ref({
  address: '8uaB9H5DpKC9sNZT7YLr3vXkxYqH7F4eMkFp9z2Wc3Tr',
  owner: 'FAqaHQHgBFFX8fJB6fQUqNdc8zABV5pGVRdCt7fLLYVo',
  lamports: 2039280,
  dataSize: 265,
  executable: false
})

const comparisonItems = ref([
  {
    aspect: 'State Storage',
    evm: 'Inside contract storage (slots)',
    solana: 'In separate accounts owned by program'
  },
  {
    aspect: 'Programs/Contracts',
    evm: 'Stateful - code and data together',
    solana: 'Stateless - only code, no state'
  },
  {
    aspect: 'State Access',
    evm: 'Direct storage read/write',
    solana: 'Must pass accounts to transaction'
  },
  {
    aspect: 'Parallelization',
    evm: 'Sequential (one contract at a time)',
    solana: 'Parallel (different accounts simultaneously)'
  },
  {
    aspect: 'Storage Cost',
    evm: 'Gas per SSTORE operation',
    solana: 'Rent based on account size'
  },
  {
    aspect: 'Data Structure',
    evm: '32-byte slots with packing',
    solana: 'Raw bytes, any structure'
  },
  {
    aspect: 'Upgradability',
    evm: 'Requires proxy patterns',
    solana: 'Built-in program upgrade authority'
  }
])
</script>
