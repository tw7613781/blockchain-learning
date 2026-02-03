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
          <h1 class="text-xl font-bold text-white">EVM vs Solana Comparison</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Introduction -->
      <div class="card mb-8">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-white">Otmoic Atomic Swap Bridge: Two Implementations</h2>
        </div>
        <div class="card-body">
          <p class="text-gray-300 mb-4">
            The Otmoic project implements the same atomic swap functionality on both EVM and Solana. 
            This provides a perfect case study for understanding the fundamental differences between these two ecosystems.
          </p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 class="font-semibold text-blue-400 mb-2">EVM (Ethereum)</h3>
              <ul class="text-sm text-gray-300 space-y-1">
                <li>• Contract: <code class="text-xs bg-gray-800 px-1 py-0.5 rounded">OBridge.sol</code></li>
                <li>• Language: Solidity</li>
                <li>• Storage: Contract-internal</li>
                <li>• Execution: Sequential</li>
              </ul>
            </div>
            <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h3 class="font-semibold text-purple-400 mb-2">Solana</h3>
              <ul class="text-sm text-gray-300 space-y-1">
                <li>• Program: <code class="text-xs bg-gray-800 px-1 py-0.5 rounded">obridge/lib.rs</code></li>
                <li>• Language: Rust (Anchor)</li>
                <li>• Storage: External accounts</li>
                <li>• Execution: Parallel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="mb-6">
        <div class="flex gap-2 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors"
            :class="activeTab === tab.id
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Storage Model Comparison -->
      <div v-show="activeTab === 'storage'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-xl font-bold text-white">Storage Model Architecture</h3>
          </div>
          <div class="card-body">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- EVM -->
              <div>
                <h4 class="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  EVM Storage
                </h4>
                <div class="bg-gray-900 rounded-lg p-4 mb-3">
                  <pre class="text-sm text-gray-300 overflow-x-auto"><code><span class="text-blue-400">contract</span> Otmoic {
    <span class="text-gray-500">// All state inside contract</span>
    <span class="text-green-400">mapping</span>(bytes32 => SwapStatus) <span class="text-blue-400">public</span> swapStatus;
    
    <span class="text-blue-400">struct</span> SwapStatus {
        TransferStatus transferStatus;
        uint256 nativeFee;
        uint256 tokenFee;
    }
}</code></pre>
                </div>
                <ul class="text-sm text-gray-300 space-y-2">
                  <li class="flex items-start gap-2">
                    <span class="text-green-400 mt-0.5">✓</span>
                    <span>State stored in contract's storage slots</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-green-400 mt-0.5">✓</span>
                    <span>Direct mapping access</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-yellow-400 mt-0.5">⚠</span>
                    <span>Sequential writes (no parallelization)</span>
                  </li>
                </ul>
              </div>

              <!-- Solana -->
              <div>
                <h4 class="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Solana Accounts
                </h4>
                <div class="bg-gray-900 rounded-lg p-4 mb-3">
                  <pre class="text-sm text-gray-300 overflow-x-auto"><code><span class="text-purple-400">#[account]</span>
<span class="text-blue-400">pub struct</span> Escrow {
    <span class="text-blue-400">pub</span> from: Pubkey,
    <span class="text-blue-400">pub</span> to: Pubkey,
    <span class="text-blue-400">pub</span> sol_amount: u64,
    <span class="text-gray-500">// ... more fields</span>
}

<span class="text-gray-500">// Each escrow = separate account</span>
<span class="text-green-400">seeds</span> = [&uuid], bump</code></pre>
                </div>
                <ul class="text-sm text-gray-300 space-y-2">
                  <li class="flex items-start gap-2">
                    <span class="text-green-400 mt-0.5">✓</span>
                    <span>Each escrow in its own account</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-green-400 mt-0.5">✓</span>
                    <span>Parallel processing possible</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-green-400 mt-0.5">✓</span>
                    <span>Clear account ownership</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Function Comparison -->
      <div v-show="activeTab === 'functions'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-xl font-bold text-white">Function: Create Escrow / Prepare Transfer</h3>
          </div>
          <div class="card-body">
            <div class="grid lg:grid-cols-2 gap-6">
              <!-- EVM -->
              <div>
                <div class="flex items-center gap-2 mb-3">
                  <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded">EVM</span>
                  <span class="text-sm text-gray-400">transferOut()</span>
                </div>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre class="text-sm"><code class="text-gray-300"><span class="text-blue-400">function</span> <span class="text-yellow-400">transferOut</span>(
    <span class="text-green-400">address</span> _sender,
    <span class="text-green-400">address</span> _receiver,
    <span class="text-green-400">address</span> _token,
    <span class="text-green-400">uint256</span> _amount,
    <span class="text-green-400">bytes32</span> _hashlock,
    <span class="text-gray-500">// ... more params</span>
) <span class="text-blue-400">external payable</span> {
    <span class="text-gray-500">// Validation</span>
    <span class="text-blue-400">if</span> (msg.sender != _sender) 
        <span class="text-blue-400">revert</span> InvalidSender();
    
    <span class="text-gray-500">// Generate transfer ID</span>
    bytes32 _transferId = <span class="text-yellow-400">keccak256</span>(...);
    
    <span class="text-gray-500">// Store in mapping</span>
    swapStatus[_transferId].transferStatus 
        = TransferStatus.Pending;
    
    <span class="text-gray-500">// Transfer tokens</span>
    <span class="text-yellow-400">_transfer</span>(_transferId, _sender, ...);
    
    <span class="text-blue-400">emit</span> LogNewTransferOut(...);
}</code></pre>
                </div>
              </div>

              <!-- Solana -->
              <div>
                <div class="flex items-center gap-2 mb-3">
                  <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded">Solana</span>
                  <span class="text-sm text-gray-400">prepare()</span>
                </div>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre class="text-sm"><code class="text-gray-300"><span class="text-blue-400">pub fn</span> <span class="text-yellow-400">prepare</span>(
    ctx: Context&lt;Prepare&gt;,
    _uuid: [u8; 32],
    to: Pubkey,
    sol_amount: u64,
    token_amount: u64,
    lock: Lock,
    is_out: bool,
    _memo: Vec&lt;u8&gt;,
) -&gt; Result&lt;()&gt; {
    <span class="text-gray-500">// Validation</span>
    <span class="text-blue-400">require!</span>(
        ctx.accounts.payer.key() == ctx.accounts.from.key(),
        Errors::InvalidSender
    );
    
    <span class="text-gray-500">// Transfer tokens to escrow account</span>
    <span class="text-yellow-400">handle_token_transfer</span>(...)?;
    
    <span class="text-gray-500">// Store in escrow account</span>
    <span class="text-blue-400">let</span> escrow = &<span class="text-blue-400">mut</span> ctx.accounts.escrow;
    escrow.from = ctx.accounts.from.key();
    escrow.to = to;
    escrow.sol_amount = sol_amount;
    <span class="text-gray-500">// ...</span>
    
    <span class="text-blue-400">Ok</span>(())
}</code></pre>
                </div>
              </div>
            </div>

            <div class="mt-6 grid md:grid-cols-2 gap-4">
              <div class="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm">
                <h5 class="font-semibold text-blue-400 mb-2">EVM Approach</h5>
                <ul class="text-gray-300 space-y-1">
                  <li>• Uses <code class="text-xs bg-gray-800 px-1 rounded">keccak256</code> to generate ID</li>
                  <li>• Stores in contract mapping</li>
                  <li>• All swaps share same storage space</li>
                  <li>• Emits events for indexing</li>
                </ul>
              </div>
              <div class="bg-purple-500/10 border border-purple-500/30 rounded p-3 text-sm">
                <h5 class="font-semibold text-purple-400 mb-2">Solana Approach</h5>
                <ul class="text-gray-300 space-y-1">
                  <li>• Uses UUID as seed for PDA</li>
                  <li>• Creates new account per swap</li>
                  <li>• Independent accounts = parallel execution</li>
                  <li>• Account data is the "event"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cost Comparison -->
      <div v-show="activeTab === 'costs'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-xl font-bold text-white">Cost Model: Gas vs Rent</h3>
          </div>
          <div class="card-body">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-700">
                    <th class="text-left py-3 px-4 text-gray-400">Operation</th>
                    <th class="text-left py-3 px-4 text-blue-400">EVM (Gas)</th>
                    <th class="text-left py-3 px-4 text-purple-400">Solana (Rent/Fee)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-800">
                    <td class="py-3 px-4 text-white font-medium">Create Escrow</td>
                    <td class="py-3 px-4 text-gray-300">
                      ~100,000 gas<br>
                      <span class="text-xs text-gray-500">≈ $3-15 (depends on gas price)</span>
                    </td>
                    <td class="py-3 px-4 text-gray-300">
                      ~0.002 SOL<br>
                      <span class="text-xs text-gray-500">≈ $0.20 (fixed)</span>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-800">
                    <td class="py-3 px-4 text-white font-medium">Confirm/Release</td>
                    <td class="py-3 px-4 text-gray-300">
                      ~80,000 gas<br>
                      <span class="text-xs text-gray-500">Updates mapping + transfer</span>
                    </td>
                    <td class="py-3 px-4 text-gray-300">
                      ~0.0005 SOL<br>
                      <span class="text-xs text-gray-500">Close account (rent refunded!)</span>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-800">
                    <td class="py-3 px-4 text-white font-medium">Storage Rent</td>
                    <td class="py-3 px-4 text-gray-300">
                      One-time SSTORE cost<br>
                      <span class="text-xs text-gray-500">~20,000 gas per slot</span>
                    </td>
                    <td class="py-3 px-4 text-gray-300">
                      Ongoing (2 years worth upfront)<br>
                      <span class="text-xs text-gray-500">Refundable when account closed</span>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-800">
                    <td class="py-3 px-4 text-white font-medium">Cost Variability</td>
                    <td class="py-3 px-4 text-gray-300">
                      <span class="text-yellow-400">High</span><br>
                      <span class="text-xs text-gray-500">10-1000x variation based on network</span>
                    </td>
                    <td class="py-3 px-4 text-gray-300">
                      <span class="text-green-400">Low</span><br>
                      <span class="text-xs text-gray-500">Predictable, rarely spikes</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Comparison -->
      <div v-show="activeTab === 'security'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-xl font-bold text-white">Security Model & Common Pitfalls</h3>
          </div>
          <div class="card-body">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-blue-400 mb-4">EVM Security Concerns</h4>
                <div class="space-y-3">
                  <div class="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <h5 class="text-sm font-semibold text-red-400 mb-1">Reentrancy</h5>
                    <p class="text-xs text-gray-300">External calls can reenter before state updates</p>
                    <code class="text-xs text-gray-400 block mt-1">Use: checks-effects-interactions pattern</code>
                  </div>
                  <div class="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                    <h5 class="text-sm font-semibold text-yellow-400 mb-1">Integer Overflow</h5>
                    <p class="text-xs text-gray-300">Unchecked math can wrap around</p>
                    <code class="text-xs text-gray-400 block mt-1">Solidity 0.8+ has built-in checks</code>
                  </div>
                  <div class="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                    <h5 class="text-sm font-semibold text-yellow-400 mb-1">Front-Running</h5>
                    <p class="text-xs text-gray-300">MEV bots can see and front-run txs</p>
                    <code class="text-xs text-gray-400 block mt-1">Use: commit-reveal, flashbots</code>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-purple-400 mb-4">Solana Security Concerns</h4>
                <div class="space-y-3">
                  <div class="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <h5 class="text-sm font-semibold text-red-400 mb-1">Account Validation</h5>
                    <p class="text-xs text-gray-300">Must verify all account owners and constraints</p>
                    <code class="text-xs text-gray-400 block mt-1">Use: Anchor's #[account] macros</code>
                  </div>
                  <div class="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                    <h5 class="text-sm font-semibold text-yellow-400 mb-1">Signer Authorization</h5>
                    <p class="text-xs text-gray-300">Forgetting is_signer checks</p>
                    <code class="text-xs text-gray-400 block mt-1">Always verify Signer&lt;'info&gt;</code>
                  </div>
                  <div class="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                    <h5 class="text-sm font-semibold text-yellow-400 mb-1">PDA Seed Collision</h5>
                    <p class="text-xs text-gray-300">Two different seeds producing same PDA</p>
                    <code class="text-xs text-gray-400 block mt-1">Use unique, non-malleable seeds</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Comparison -->
      <div v-show="activeTab === 'performance'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-xl font-bold text-white">Performance Characteristics</h3>
          </div>
          <div class="card-body">
            <div class="grid md:grid-cols-3 gap-4 mb-6">
              <div class="text-center p-4 bg-gray-800 rounded-lg">
                <div class="text-3xl font-bold text-blue-400 mb-2">~15/s</div>
                <div class="text-sm text-gray-400">EVM TPS</div>
                <div class="text-xs text-gray-500 mt-1">(Ethereum mainnet)</div>
              </div>
              <div class="text-center p-4 bg-gray-800 rounded-lg">
                <div class="text-3xl font-bold text-purple-400 mb-2">~3,000/s</div>
                <div class="text-sm text-gray-400">Solana TPS</div>
                <div class="text-xs text-gray-500 mt-1">(Real-world sustained)</div>
              </div>
              <div class="text-center p-4 bg-gray-800 rounded-lg">
                <div class="text-3xl font-bold text-green-400 mb-2">200x</div>
                <div class="text-sm text-gray-400">Throughput Gain</div>
                <div class="text-xs text-gray-500 mt-1">(In favorable conditions)</div>
              </div>
            </div>

            <div class="bg-blue-500/10 border border-blue-500/30 rounded p-4 mb-4">
              <h5 class="font-semibold text-blue-400 mb-2">Why is Solana Faster?</h5>
              <ul class="text-sm text-gray-300 space-y-2">
                <li class="flex items-start gap-2">
                  <span class="text-green-400">1.</span>
                  <span><strong>Parallel Execution:</strong> Transactions touching different accounts run simultaneously</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400">2.</span>
                  <span><strong>No Mempool:</strong> Transactions are ordered by timestamp (Gulf Stream)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400">3.</span>
                  <span><strong>Pipelined Execution:</strong> Different stages of tx processing happen in parallel</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400">4.</span>
                  <span><strong>Fast Finality:</strong> ~400ms confirmation time</span>
                </li>
              </ul>
            </div>

            <div class="bg-purple-500/10 border border-purple-500/30 rounded p-4">
              <h5 class="font-semibold text-purple-400 mb-2">Otmoic Bridge Performance</h5>
              <p class="text-sm text-gray-300 mb-3">
                In the atomic swap use case, Solana's advantages shine:
              </p>
              <div class="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span class="text-blue-400">EVM:</span>
                  <ul class="text-gray-300 mt-1 space-y-1 ml-4">
                    <li>• 2-3 confirmations: ~30-45 sec</li>
                    <li>• Multiple swaps: sequential</li>
                    <li>• High gas during peak times</li>
                  </ul>
                </div>
                <div>
                  <span class="text-purple-400">Solana:</span>
                  <ul class="text-gray-300 mt-1 space-y-1 ml-4">
                    <li>• Finality: ~400ms</li>
                    <li>• Multiple swaps: parallel</li>
                    <li>• Consistent low fees</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-xl font-bold text-white">📊 Quick Reference</h3>
        </div>
        <div class="card-body">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-700">
                  <th class="text-left py-2 px-3 text-gray-400">Feature</th>
                  <th class="text-left py-2 px-3 text-blue-400">EVM</th>
                  <th class="text-left py-2 px-3 text-purple-400">Solana</th>
                </tr>
              </thead>
              <tbody class="text-xs">
                <tr class="border-b border-gray-800"><td class="py-2 px-3 text-white">Language</td><td class="py-2 px-3 text-gray-300">Solidity</td><td class="py-2 px-3 text-gray-300">Rust (Anchor)</td></tr>
                <tr class="border-b border-gray-800"><td class="py-2 px-3 text-white">Storage</td><td class="py-2 px-3 text-gray-300">Contract slots</td><td class="py-2 px-3 text-gray-300">External accounts</td></tr>
                <tr class="border-b border-gray-800"><td class="py-2 px-3 text-white">Execution</td><td class="py-2 px-3 text-gray-300">Sequential</td><td class="py-2 px-3 text-gray-300">Parallel</td></tr>
                <tr class="border-b border-gray-800"><td class="py-2 px-3 text-white">TPS</td><td class="py-2 px-3 text-gray-300">~15</td><td class="py-2 px-3 text-gray-300">~3,000</td></tr>
                <tr class="border-b border-gray-800"><td class="py-2 px-3 text-white">Finality</td><td class="py-2 px-3 text-gray-300">~15-30s</td><td class="py-2 px-3 text-gray-300">~400ms</td></tr>
                <tr class="border-b border-gray-800"><td class="py-2 px-3 text-white">Cost/Tx</td><td class="py-2 px-3 text-gray-300">$1-50 (variable)</td><td class="py-2 px-3 text-gray-300">$0.0001-0.01 (stable)</td></tr>
                <tr class="border-b border-gray-800"><td class="py-2 px-3 text-white">Account Model</td><td class="py-2 px-3 text-gray-300">Nonce-based</td><td class="py-2 px-3 text-gray-300">UTXO-like</td></tr>
                <tr class="border-b border-gray-800"><td class="py-2 px-3 text-white">Maturity</td><td class="py-2 px-3 text-gray-300">High (2015+)</td><td class="py-2 px-3 text-gray-300">Medium (2020+)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('storage')

const tabs = [
  { id: 'storage', name: 'Storage Model' },
  { id: 'functions', name: 'Function Comparison' },
  { id: 'costs', name: 'Cost Model' },
  { id: 'security', name: 'Security' },
  { id: 'performance', name: 'Performance' },
]
</script>
