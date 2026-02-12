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
          <h1 class="text-xl font-bold text-white">Olares Tag ABI Encoding System</h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Navigation Tabs -->
      <div class="flex space-x-2 mb-8 overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all"
          :class="activeTab === tab.id 
            ? 'bg-primary-500 text-white' 
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Tab 0: The Problem & Motivation -->
      <div v-if="activeTab === 'problem'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-2xl font-bold text-white">🎯 The Original Problem</h2>
          </div>
          <div class="card-body space-y-6">
            <!-- The Need -->
            <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-5">
              <div class="flex items-start space-x-4">
                <div class="text-3xl">🤔</div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-white mb-3">需求：为域名添加灵活的扩展属性</h3>
                  <div class="space-y-3 text-gray-300">
                    <p>
                      在 Olares DID 系统中，每个域名（例如 <code class="text-primary-400 bg-gray-800 px-2 py-1 rounded">alice.olares.com</code>）
                      需要能够存储各种类型的元数据，不仅仅是简单的字符串。
                    </p>
                    <div class="bg-gray-900 rounded-lg p-4">
                      <div class="text-sm font-semibold text-gray-400 mb-2">例如，用户可能需要存储：</div>
                      <div class="space-y-2 text-sm">
                        <div class="flex items-start space-x-2">
                          <span class="text-blue-400">•</span>
                          <div><code class="text-green-400">email</code>: <code class="text-yellow-400">"alice@example.com"</code> <span class="text-gray-500">(string 类型)</span></div>
                        </div>
                        <div class="flex items-start space-x-2">
                          <span class="text-blue-400">•</span>
                          <div><code class="text-green-400">age</code>: <code class="text-yellow-400">30</code> <span class="text-gray-500">(uint8 类型)</span></div>
                        </div>
                        <div class="flex items-start space-x-2">
                          <span class="text-blue-400">•</span>
                          <div><code class="text-green-400">verified</code>: <code class="text-yellow-400">true</code> <span class="text-gray-500">(bool 类型)</span></div>
                        </div>
                        <div class="flex items-start space-x-2">
                          <span class="text-blue-400">•</span>
                          <div><code class="text-green-400">socialLinks</code>: <code class="text-yellow-400">["twitter.com/alice", "github.com/alice"]</code> <span class="text-gray-500">(string[] 类型)</span></div>
                        </div>
                        <div class="flex items-start space-x-2">
                          <span class="text-blue-400">•</span>
                          <div><code class="text-green-400">address</code>: <code class="text-yellow-400">{city: "NYC", country: "USA"}</code> <span class="text-gray-500">(tuple 类型)</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- The Challenge -->
            <div class="grid md:grid-cols-2 gap-4">
              <!-- Traditional Approach -->
              <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div class="flex items-center space-x-2 mb-3">
                  <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div class="font-bold text-red-400">传统方案：只存字符串值</div>
                </div>
                <div class="space-y-3 text-sm">
                  <div class="bg-gray-900 rounded p-3">
                    <div class="font-mono text-xs text-gray-300">
                      mapping(string key => string value)
                    </div>
                  </div>
                  <div class="space-y-2 text-gray-400">
                    <div class="flex items-start space-x-2">
                      <span class="text-red-400 mt-1">✗</span>
                      <div>所有值都是字符串，丢失了类型信息</div>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-red-400 mt-1">✗</span>
                      <div>数字需要字符串转换：<code class="text-yellow-400">"30"</code> vs <code class="text-green-400">30</code></div>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-red-400 mt-1">✗</span>
                      <div>布尔值需要约定：<code class="text-yellow-400">"true"</code> vs <code class="text-green-400">true</code></div>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-red-400 mt-1">✗</span>
                      <div>复杂类型（数组、对象）需要 JSON 序列化</div>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-red-400 mt-1">✗</span>
                      <div>前端需要"猜测"类型或额外的元数据</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Type-Aware Approach -->
              <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div class="flex items-center space-x-2 mb-3">
                  <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div class="font-bold text-green-400">Olares 方案：类型 + 值</div>
                </div>
                <div class="space-y-3 text-sm">
                  <div class="bg-gray-900 rounded p-3">
                    <div class="font-mono text-xs text-gray-300">
                      struct Tag {<br>
                      &nbsp;&nbsp;bytes abiType;<br>
                      &nbsp;&nbsp;bytes value;<br>
                      }
                    </div>
                  </div>
                  <div class="space-y-2 text-gray-400">
                    <div class="flex items-start space-x-2">
                      <span class="text-green-400 mt-1">✓</span>
                      <div>每个 Tag 都有明确的类型定义</div>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-green-400 mt-1">✓</span>
                      <div>值按照 ABI 标准编码，保证正确性</div>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-green-400 mt-1">✓</span>
                      <div>支持所有 Solidity 类型（uint, bool, array, tuple...）</div>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-green-400 mt-1">✓</span>
                      <div>前端可以准确解析和显示数据</div>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-green-400 mt-1">✓</span>
                      <div>类型安全，避免运行时错误</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Real Example -->
            <div class="bg-gray-800/50 rounded-lg p-5">
              <div class="flex items-start space-x-3 mb-4">
                <div class="text-2xl">💡</div>
                <div>
                  <div class="text-lg font-bold text-white mb-2">实际应用场景</div>
                  <div class="text-sm text-gray-400">
                    在 Olares DID 中定义一个用户档案 Tag：
                  </div>
                </div>
              </div>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <div class="text-xs font-semibold text-gray-400 mb-2">定义 Tag 类型：</div>
                  <div class="code-block">
                    <code class="text-xs">
const profileType = TagTypeBuilder.tuple([<br>
&nbsp;&nbsp;TagTypeBuilder.string(), // name<br>
&nbsp;&nbsp;TagTypeBuilder.uint(8),  // age<br>
&nbsp;&nbsp;TagTypeBuilder.bool(),   // verified<br>
&nbsp;&nbsp;TagTypeBuilder.tuple([   // address<br>
&nbsp;&nbsp;&nbsp;&nbsp;TagTypeBuilder.string(), // city<br>
&nbsp;&nbsp;&nbsp;&nbsp;TagTypeBuilder.string()  // country<br>
&nbsp;&nbsp;])<br>
]);
                    </code>
                  </div>
                </div>
                <div>
                  <div class="text-xs font-semibold text-gray-400 mb-2">设置 Tag 值：</div>
                  <div class="code-block">
                    <code class="text-xs">
await tagCtx.setTag('alice.olares.com', 'profile', {<br>
&nbsp;&nbsp;name: "Alice",<br>
&nbsp;&nbsp;age: 30,<br>
&nbsp;&nbsp;verified: true,<br>
&nbsp;&nbsp;address: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;city: "New York",<br>
&nbsp;&nbsp;&nbsp;&nbsp;country: "USA"<br>
&nbsp;&nbsp;}<br>
});
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <!-- The Technical Challenge -->
            <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
              <div class="flex items-start space-x-4">
                <div class="text-3xl">⚡</div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-white mb-3">技术挑战：如何高效存储类型信息？</h3>
                  <div class="space-y-3 text-gray-300">
                    <p>
                      有了类型 + 值的设计后，下一个问题就是：<strong class="text-white">如何在链上高效存储类型信息？</strong>
                    </p>
                    <div class="grid md:grid-cols-2 gap-3 text-sm">
                      <div class="bg-gray-900 rounded p-3">
                        <div class="font-semibold text-red-400 mb-2">❌ 选项 1: 存完整 ABI 字符串</div>
                        <div class="text-gray-400 mb-2">
                          <code class="text-xs">"tuple(string,uint8,bool,tuple(string,string))"</code>
                        </div>
                        <div class="text-red-400 text-xs">
                          • 44 字节<br>
                          • ~40,000 gas (2 个 storage slot)<br>
                          • ❌ 太贵了！
                        </div>
                      </div>
                      <div class="bg-gray-900 rounded p-3">
                        <div class="font-semibold text-green-400 mb-2">✅ 选项 2: 紧凑编码</div>
                        <div class="text-gray-400 mb-2">
                          <code class="text-xs">0x06000403010102060002030303</code>
                        </div>
                        <div class="text-green-400 text-xs">
                          • 13 字节<br>
                          • ~20,000 gas (1 个 storage slot)<br>
                          • ✅ 节省 50% gas！
                        </div>
                      </div>
                    </div>
                    <div class="bg-yellow-500/10 border-l-4 border-yellow-500 pl-4 py-2">
                      <div class="text-sm text-yellow-400">
                        这就是接下来几个标签页要探讨的核心技术：<strong>Tag.sol 的紧凑编码系统</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex justify-end">
              <button
                @click="activeTab = 'why'"
                class="btn btn-primary flex items-center space-x-2"
              >
                <span>继续：深入 Gas 成本分析</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 1: Why Custom Encoding? -->
      <div v-if="activeTab === 'why'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-2xl font-bold text-white">💰 Why Not Store Full ABI Strings?</h2>
          </div>
          <div class="card-body space-y-6">
            <p class="text-gray-400">
              The naive approach would be to store full ABI type strings on-chain (e.g., <code class="text-primary-400">"tuple(string name, uint8 age, bool verified)"</code>). 
              However, this is <strong class="text-red-400">extremely expensive</strong> in terms of gas costs.
            </p>

            <!-- Comparison -->
            <div class="grid md:grid-cols-2 gap-4">
              <!-- Full ABI String -->
              <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div class="flex items-center space-x-2 mb-3">
                  <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div class="font-bold text-red-400">Full ABI String</div>
                </div>
                <div class="code-block mb-3">
                  <code class="text-xs">tuple(string name, uint8 age, bool verified)</code>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-400">Storage Size:</span>
                    <span class="text-white font-mono">{{ fullAbiExample.size }} bytes</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400">Gas Cost (SSTORE):</span>
                    <span class="text-red-400 font-mono">~{{ fullAbiExample.gasCost.toLocaleString() }} gas</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">
                    20,000 gas per 32-byte word + cold storage overhead
                  </div>
                </div>
              </div>

              <!-- Compact Encoding -->
              <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div class="flex items-center space-x-2 mb-3">
                  <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div class="font-bold text-green-400">Tag.sol Compact Encoding</div>
                </div>
                <div class="code-block mb-3">
                  <code class="text-xs">0x06000303010102</code>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-400">Storage Size:</span>
                    <span class="text-white font-mono">{{ compactExample.size }} bytes</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400">Gas Cost (SSTORE):</span>
                    <span class="text-green-400 font-mono">~{{ compactExample.gasCost.toLocaleString() }} gas</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">
                    Fits in 1 word, massive savings!
                  </div>
                </div>
              </div>
            </div>

            <!-- Savings -->
            <div class="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-lg font-bold text-white mb-1">
                    Gas Savings: {{ ((1 - compactExample.gasCost / fullAbiExample.gasCost) * 100).toFixed(0) }}%
                  </div>
                  <div class="text-sm text-gray-400">
                    For complex tuple types with nested structures, savings can reach <strong class="text-green-400">90%+</strong>
                  </div>
                </div>
                <div class="text-4xl">📉</div>
              </div>
            </div>

            <!-- Trade-off -->
            <div class="bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-500">
              <div class="flex items-start space-x-3">
                <div class="text-2xl">⚖️</div>
                <div>
                  <div class="font-semibold text-yellow-400 mb-2">The Trade-off</div>
                  <div class="text-sm text-gray-400 space-y-1">
                    <div>✅ On-chain: Massive gas savings (70-90% less storage cost)</div>
                    <div>✅ Users: Lower transaction fees for defining tags</div>
                    <div>⚠️ SDK: Additional complexity for encoding/decoding (but worth it!)</div>
                    <div>⚠️ Field Names: Need separate event-based storage (explained in Tab 4)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Encoding Rules -->
      <div v-if="activeTab === 'encoding'" class="space-y-6">
        <div class="card">
          <div class="card-header flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white">🔢 Tag.sol Compact Encoding Rules</h2>
            <button
              v-if="encodingExamples.length > 0"
              @click="animateEncoding"
              class="btn btn-primary text-sm"
              :disabled="isAnimating"
            >
              {{ isAnimating ? 'Playing...' : '▶ Animate All' }}
            </button>
          </div>
          <div class="card-body space-y-4">
            <p class="text-gray-400 mb-4">
              Each type is encoded into a compact byte sequence. The first byte indicates the type, followed by type-specific data.
            </p>

              <div
                v-for="(example, index) in encodingExamples"
                :key="index"
                :class="[
                  'bg-gray-800/50 border rounded-lg p-4 transition-all duration-300',
                  currentEncodingStep === index ? 'bg-primary-500/10 border-primary-500 shadow-lg shadow-primary-500/20 scale-[1.02]' : 'border-gray-700',
                  currentEncodingStep > index ? 'opacity-50' : ''
                ]"
              >
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0',
                      currentEncodingStep === index ? 'bg-primary-500 animate-pulse' : 'bg-gray-700'
                    ]"
                  >
                    {{ index + 1 }}
                  </div>
                  <div>
                    <div class="font-bold text-white">{{ example.name }}</div>
                    <div class="text-xs text-gray-400">{{ example.abiType }}</div>
                  </div>
                </div>
                <div class="px-2 py-1 bg-gray-700 rounded text-xs font-mono text-gray-300">
                  {{ example.bytes.length / 2 }} bytes
                </div>
              </div>

              <!-- Byte Breakdown -->
              <div class="bg-gray-900 rounded p-3 mb-3">
                <div class="flex flex-wrap gap-1 font-mono text-xs">
                  <div
                    v-for="(byte, byteIndex) in example.byteBreakdown"
                    :key="byteIndex"
                    class="flex flex-col items-center"
                  >
                    <div 
                      class="px-2 py-1 rounded"
                      :class="byte.color"
                    >
                      {{ byte.value }}
                    </div>
                    <div class="text-[10px] text-gray-500 mt-1 text-center max-w-[60px]">
                      {{ byte.label }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Formula -->
              <div class="code-block mb-2">
                <code class="text-xs">{{ example.formula }}</code>
              </div>

              <div class="text-sm text-gray-400">
                {{ example.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: Tuple Field Names Flattening -->
      <div v-if="activeTab === 'flattening'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-2xl font-bold text-white">🌳 Flattening Tuple Field Names</h2>
          </div>
          <div class="card-body space-y-6">
            <p class="text-gray-400">
              Tuple types have field names (e.g., <code class="text-primary-400">name</code>, <code class="text-primary-400">age</code>). 
              For nested tuples, we have a <strong class="text-white">tree structure</strong>. 
              To store efficiently, we flatten this tree into a <strong class="text-primary-400">2D array using pre-order traversal</strong>.
            </p>

            <!-- Example Structure -->
            <div class="bg-gray-800/50 rounded-lg p-4">
              <div class="text-sm font-semibold text-white mb-3">Example: User Profile with Nested Address</div>
              <div class="code-block">
                <code class="text-xs">
                  tuple(<br>
                  &nbsp;&nbsp;string name,<br>
                  &nbsp;&nbsp;uint8 age,<br>
                  &nbsp;&nbsp;tuple(<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;string city,<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;string country<br>
                  &nbsp;&nbsp;) address<br>
                  )
                </code>
              </div>
            </div>

            <!-- Step by Step -->
            <div class="space-y-4">
              <!-- Step 1: Tree Structure -->
              <div 
                :class="[
                  'bg-gray-800/30 border rounded-lg p-4 transition-all duration-300',
                  flatteningStep >= 1 ? 'border-primary-500 bg-primary-500/5' : 'border-gray-700'
                ]"
              >
                <div class="flex items-center space-x-2 mb-3">
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full text-white font-bold text-sm flex items-center justify-center flex-shrink-0',
                      flatteningStep >= 1 ? 'bg-primary-500' : 'bg-gray-700'
                    ]"
                  >
                    1
                  </div>
                  <div class="font-semibold text-white">Original Tree Structure</div>
                </div>
                <div class="bg-gray-900 rounded p-4">
                  <pre class="text-xs text-gray-300 font-mono">
Root (tuple)
├── name (string)
├── age (uint8)
└── address (tuple)
    ├── city (string)
    └── country (string)</pre>
                </div>
              </div>

              <!-- Step 2: Pre-order Traversal -->
              <div 
                :class="[
                  'bg-gray-800/30 border rounded-lg p-4 transition-all duration-300',
                  flatteningStep >= 2 ? 'border-primary-500 bg-primary-500/5' : 'border-gray-700'
                ]"
              >
                <div class="flex items-center space-x-2 mb-3">
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full text-white font-bold text-sm flex items-center justify-center flex-shrink-0',
                      flatteningStep >= 2 ? 'bg-primary-500' : 'bg-gray-700'
                    ]"
                  >
                    2
                  </div>
                  <div class="font-semibold text-white">Pre-order Traversal (depth-first)</div>
                </div>
                <div class="space-y-2">
                  <div v-for="(node, i) in traversalOrder" :key="i" 
                       class="flex items-center space-x-3 p-2 rounded"
                       :class="currentTraversalNode === i ? 'bg-primary-500/20 border border-primary-500' : 'bg-gray-800'">
                    <div class="font-mono text-sm text-primary-400 w-8">{{ i + 1 }}.</div>
                    <div class="text-sm text-white font-mono">{{ node.name }}</div>
                    <div class="text-xs text-gray-400">({{ node.type }})</div>
                    <div class="text-xs text-gray-500 ml-auto">depth: {{ node.depth }}</div>
                  </div>
                </div>
                <button
                  @click="animateTraversal"
                  class="btn btn-secondary mt-3 text-sm"
                  :disabled="isTraversing"
                >
                  {{ isTraversing ? 'Traversing...' : '▶ Animate Traversal' }}
                </button>
              </div>

              <!-- Step 3: 2D Array Storage -->
              <div 
                :class="[
                  'bg-gray-800/30 border rounded-lg p-4 transition-all duration-300',
                  flatteningStep >= 3 ? 'border-primary-500 bg-primary-500/5' : 'border-gray-700'
                ]"
              >
                <div class="flex items-center space-x-2 mb-3">
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full text-white font-bold text-sm flex items-center justify-center flex-shrink-0',
                      flatteningStep >= 3 ? 'bg-primary-500' : 'bg-gray-700'
                    ]"
                  >
                    3
                  </div>
                  <div class="font-semibold text-white">Flattened 2D Array Storage</div>
                </div>
                <div class="bg-gray-900 rounded p-4">
                  <div class="text-xs text-gray-400 mb-2">string[][] fieldNames = [</div>
                  <div class="ml-4 space-y-1 text-xs font-mono">
                    <div class="text-green-400">&nbsp;&nbsp;["name", "age", "address"], <span class="text-gray-500">// Level 0 (root tuple)</span></div>
                    <div class="text-blue-400">&nbsp;&nbsp;["city", "country"] <span class="text-gray-500">// Level 1 (nested address tuple)</span></div>
                  </div>
                  <div class="text-xs text-gray-400">]</div>
                </div>
                <div class="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 mt-3">
                  <div class="text-xs text-yellow-400 font-semibold mb-1">💡 Key Insight</div>
                  <div class="text-xs text-gray-400">
                    Each array represents one "level" of tuples in pre-order. 
                    When decoding, we consume field names in the same pre-order sequence to reconstruct the tree.
                  </div>
                </div>
              </div>

              <!-- Navigation -->
              <div class="flex space-x-3">
                <button
                  @click="flatteningStep = Math.max(0, flatteningStep - 1)"
                  :disabled="flatteningStep === 0"
                  class="btn btn-secondary"
                >
                  ← Previous
                </button>
                <button
                  @click="flatteningStep = Math.min(3, flatteningStep + 1)"
                  :disabled="flatteningStep === 3"
                  class="btn btn-primary"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 4: Event-Based Field Name Storage -->
      <div v-if="activeTab === 'events'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-2xl font-bold text-white">📡 Clever Event-Based Storage</h2>
          </div>
          <div class="card-body space-y-6">
            <p class="text-gray-400">
              Storing full field names on-chain in contract storage is expensive. 
              The Olares Tag system uses a <strong class="text-primary-400">hybrid approach</strong>:
            </p>

            <!-- Architecture Diagram -->
            <div class="grid md:grid-cols-2 gap-4">
              <!-- On-Chain -->
              <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div class="flex items-center space-x-2 mb-3">
                  <div class="text-2xl">⛓️</div>
                  <div class="font-bold text-blue-400">On-Chain Storage</div>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-start space-x-2">
                    <div class="text-green-400 mt-0.5">✓</div>
                    <div class="text-gray-300">
                      <strong class="text-white">fieldNamesHash[]</strong>: Array of keccak256 hashes
                    </div>
                  </div>
                  <div class="flex items-start space-x-2">
                    <div class="text-green-400 mt-0.5">✓</div>
                    <div class="text-gray-300">
                      <strong class="text-white">Block Number</strong>: When event was emitted
                    </div>
                  </div>
                  <div class="bg-gray-900 rounded p-2 mt-3 font-mono text-xs text-gray-400">
                    // Compact: just 32 bytes per hash<br>
                    bytes32[] fieldNamesHash
                  </div>
                </div>
              </div>

              <!-- Off-Chain -->
              <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div class="flex items-center space-x-2 mb-3">
                  <div class="text-2xl">🌐</div>
                  <div class="font-bold text-purple-400">Off-Chain (Event Logs)</div>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-start space-x-2">
                    <div class="text-green-400 mt-0.5">✓</div>
                    <div class="text-gray-300">
                      <strong class="text-white">Full Field Names</strong>: Complete string arrays
                    </div>
                  </div>
                  <div class="flex items-start space-x-2">
                    <div class="text-green-400 mt-0.5">✓</div>
                    <div class="text-gray-300">
                      <strong class="text-white">Event Indexed by Hash</strong>: Fast getLogs queries
                    </div>
                  </div>
                  <div class="bg-gray-900 rounded p-2 mt-3 font-mono text-xs text-gray-400">
                    event OffchainStringArray(<br>
                    &nbsp;&nbsp;bytes32 indexed hash,<br>
                    &nbsp;&nbsp;string[][] values<br>
                    )
                  </div>
                </div>
              </div>
            </div>

            <!-- Flow Animation -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="font-semibold text-white mb-4 flex items-center justify-between">
                <span>Complete Flow: Define Tag → Retrieve Field Names</span>
                <button
                  @click="animateEventFlow"
                  class="btn btn-primary text-sm"
                  :disabled="isFlowAnimating"
                >
                  {{ isFlowAnimating ? 'Playing...' : '▶ Animate' }}
                </button>
              </div>

              <div class="space-y-3">
                <div
                  v-for="(step, i) in eventFlowSteps"
                  :key="i"
                  :class="[
                    'bg-gray-800/50 border rounded-lg p-3 transition-all duration-300',
                    currentFlowStep === i ? 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-700',
                    currentFlowStep > i ? 'opacity-50' : ''
                  ]"
                >
                  <div class="flex items-start space-x-3">
                    <div 
                      :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0',
                        currentFlowStep === i ? 'bg-blue-500 animate-pulse' : 'bg-gray-700'
                      ]"
                    >
                      {{ i + 1 }}
                    </div>
                    <div class="flex-1">
                      <div class="font-semibold text-white mb-1">{{ step.title }}</div>
                      <div class="text-sm text-gray-400 mb-2">{{ step.description }}</div>
                      <div v-if="step.code" class="code-block">
                        <code class="text-xs">{{ step.code }}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Benefits -->
            <div class="grid md:grid-cols-3 gap-3">
              <div class="bg-green-500/10 border border-green-500/30 rounded p-3">
                <div class="text-2xl mb-2">💰</div>
                <div class="font-semibold text-green-400 text-sm mb-1">Massive Gas Savings</div>
                <div class="text-xs text-gray-400">
                  Event logs are ~8x cheaper than contract storage
                </div>
              </div>
              <div class="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <div class="text-2xl mb-2">⚡</div>
                <div class="font-semibold text-blue-400 text-sm mb-1">Fast Retrieval</div>
                <div class="text-xs text-gray-400">
                  eth_getLogs with indexed hash is very efficient
                </div>
              </div>
              <div class="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                <div class="text-2xl mb-2">🔍</div>
                <div class="font-semibold text-purple-400 text-sm mb-1">Permanent Record</div>
                <div class="text-xs text-gray-400">
                  Events are immutable and queryable forever
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 5: SDK Decoding Process -->
      <div v-if="activeTab === 'decoding'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-2xl font-bold text-white">🔓 SDK Decoding Process</h2>
          </div>
          <div class="card-body space-y-6">
            <p class="text-gray-400">
              The SDK reverses the encoding process to reconstruct human-readable tag data with proper field names.
            </p>

            <!-- Full Example -->
            <div class="bg-gray-800/50 rounded-lg p-4">
              <div class="text-sm font-semibold text-white mb-2">Complete Example: Decoding a Profile Tag</div>
              <div class="grid md:grid-cols-2 gap-4 text-xs">
                <div>
                  <div class="text-gray-400 mb-2">On-Chain Data:</div>
                  <div class="space-y-1 font-mono">
                    <div><span class="text-primary-400">abiType:</span> 0x06000303010106000303</div>
                    <div><span class="text-primary-400">value:</span> 0x000000...0456e...</div>
                    <div><span class="text-primary-400">fieldNamesHash[]:</span></div>
                    <div class="ml-3 text-gray-500">
                      [0xabc..., 0xdef...]
                    </div>
                  </div>
                </div>
                <div>
                  <div class="text-gray-400 mb-2">Final Result:</div>
                  <div class="code-block">
                    <code class="text-xs">
{<br>
&nbsp;&nbsp;name: "Alice",<br>
&nbsp;&nbsp;age: 30,<br>
&nbsp;&nbsp;verified: true,<br>
&nbsp;&nbsp;address: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;city: "NYC",<br>
&nbsp;&nbsp;&nbsp;&nbsp;country: "USA"<br>
&nbsp;&nbsp;}<br>
}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <!-- Decoding Steps -->
            <div class="space-y-4">
              <div
                v-for="(step, i) in decodingSteps"
                :key="i"
                :class="[
                  'bg-gray-800/50 border rounded-lg p-4 transition-all duration-300',
                  currentDecodingStep === i ? 'bg-green-500/10 border-green-500 shadow-lg shadow-green-500/20' : 'border-gray-700',
                  currentDecodingStep > i ? 'opacity-50' : ''
                ]"
              >
                <div class="flex items-start space-x-3">
                  <div 
                    :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0',
                      currentDecodingStep === i ? 'bg-green-500 animate-pulse' : 'bg-gray-700'
                    ]"
                  >
                    {{ i + 1 }}
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-white mb-2">{{ step.title }}</div>
                    <div class="text-sm text-gray-400 mb-3">{{ step.description }}</div>
                    
                    <div v-if="step.input" class="mb-2">
                      <div class="text-xs text-gray-500 mb-1">Input:</div>
                      <div class="code-block">
                        <code class="text-xs">{{ step.input }}</code>
                      </div>
                    </div>

                    <div v-if="step.output" class="mb-2">
                      <div class="text-xs text-gray-500 mb-1">Output:</div>
                      <div class="code-block">
                        <code class="text-xs">{{ step.output }}</code>
                      </div>
                    </div>

                    <div v-if="step.note" class="bg-yellow-500/10 border-l-2 border-yellow-500 pl-3 py-2">
                      <div class="text-xs text-yellow-400">💡 {{ step.note }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex space-x-3">
              <button
                @click="animateDecoding"
                class="btn btn-primary"
                :disabled="isDecodingAnimating"
              >
                {{ isDecodingAnimating ? 'Playing...' : '▶ Animate Full Process' }}
              </button>
              <button
                @click="currentDecodingStep = -1"
                class="btn btn-secondary"
                :disabled="currentDecodingStep === -1"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <!-- SDK Code References -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-xl font-bold text-white">📚 Relevant SDK Code</h2>
          </div>
          <div class="card-body space-y-3">
            <div v-for="ref in codeReferences" :key="ref.file" class="bg-gray-800 rounded p-3">
              <div class="flex items-center justify-between mb-2">
                <div class="font-mono text-sm text-primary-400">{{ ref.file }}</div>
                <div class="text-xs text-gray-500">{{ ref.location }}</div>
              </div>
              <div class="text-xs text-gray-400">{{ ref.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const activeTab = ref('problem')
const isAnimating = ref(false)
const currentEncodingStep = ref(-1)
const flatteningStep = ref(0)
const isTraversing = ref(false)
const currentTraversalNode = ref(-1)
const isFlowAnimating = ref(false)
const currentFlowStep = ref(-1)
const isDecodingAnimating = ref(false)
const currentDecodingStep = ref(-1)

const tabs = [
  { id: 'problem', name: '0. 问题与动机' },
  { id: 'why', name: '1. Why Custom Encoding?' },
  { id: 'encoding', name: '2. Encoding Rules' },
  { id: 'flattening', name: '3. Field Name Flattening' },
  { id: 'events', name: '4. Event Storage' },
  { id: 'decoding', name: '5. SDK Decoding' }
]

// Tab 1 Data
const fullAbiExample = {
  size: 44,
  gasCost: 40000 // 2 words × 20000 gas
}

const compactExample = {
  size: 7,
  gasCost: 20000 // 1 word
}

// Tab 2 Data - Encoding Examples
const encodingExamples = [
  {
    name: 'uint8',
    abiType: 'uint8',
    bytes: '0x0101',
    byteBreakdown: [
      { value: '01', label: 'uint flag', color: 'bg-blue-500/30 text-blue-300' },
      { value: '01', label: 'size: 1 byte', color: 'bg-green-500/30 text-green-300' }
    ],
    formula: '0x01 (uint) + 0x01 (8 bits / 8 = 1 byte)',
    description: 'Unsigned integer: flag byte + size in bytes'
  },
  {
    name: 'uint256',
    abiType: 'uint256',
    bytes: '0x0120',
    byteBreakdown: [
      { value: '01', label: 'uint flag', color: 'bg-blue-500/30 text-blue-300' },
      { value: '20', label: 'size: 32 bytes', color: 'bg-green-500/30 text-green-300' }
    ],
    formula: '0x01 (uint) + 0x20 (256 bits / 8 = 32 bytes)',
    description: '256-bit unsigned integer'
  },
  {
    name: 'bool',
    abiType: 'bool',
    bytes: '0x02',
    byteBreakdown: [
      { value: '02', label: 'bool flag', color: 'bg-purple-500/30 text-purple-300' }
    ],
    formula: '0x02 (bool)',
    description: 'Boolean type: single flag byte, no additional data'
  },
  {
    name: 'string',
    abiType: 'string',
    bytes: '0x03',
    byteBreakdown: [
      { value: '03', label: 'string flag', color: 'bg-yellow-500/30 text-yellow-300' }
    ],
    formula: '0x03 (string)',
    description: 'Dynamic string: single flag byte'
  },
  {
    name: 'address',
    abiType: 'address',
    bytes: '0x07',
    byteBreakdown: [
      { value: '07', label: 'address flag', color: 'bg-pink-500/30 text-pink-300' }
    ],
    formula: '0x07 (address)',
    description: 'Ethereum address: 20-byte value'
  },
  {
    name: 'string[]',
    abiType: 'string[]',
    bytes: '0x0403',
    byteBreakdown: [
      { value: '04', label: 'array flag', color: 'bg-cyan-500/30 text-cyan-300' },
      { value: '03', label: 'string element', color: 'bg-yellow-500/30 text-yellow-300' }
    ],
    formula: '0x04 (array) + element type bytes',
    description: 'Dynamic array of strings: array flag + element type'
  },
  {
    name: 'uint8[3]',
    abiType: 'uint8[3]',
    bytes: '0x0500030101',
    byteBreakdown: [
      { value: '05', label: 'fixed array', color: 'bg-cyan-500/30 text-cyan-300' },
      { value: '0003', label: 'length: 3', color: 'bg-green-500/30 text-green-300' },
      { value: '01', label: 'uint flag', color: 'bg-blue-500/30 text-blue-300' },
      { value: '01', label: 'size: 1 byte', color: 'bg-green-500/30 text-green-300' }
    ],
    formula: '0x05 (fixed array) + length (2 bytes) + element type',
    description: 'Fixed-size array: flag + length + element type'
  },
  {
    name: 'tuple(string,uint8)',
    abiType: 'tuple(string,uint8)',
    bytes: '0x06000203010101',
    byteBreakdown: [
      { value: '06', label: 'tuple flag', color: 'bg-red-500/30 text-red-300' },
      { value: '0002', label: 'fields: 2', color: 'bg-green-500/30 text-green-300' },
      { value: '03', label: 'string', color: 'bg-yellow-500/30 text-yellow-300' },
      { value: '01', label: 'uint flag', color: 'bg-blue-500/30 text-blue-300' },
      { value: '01', label: 'size: 1', color: 'bg-green-500/30 text-green-300' }
    ],
    formula: '0x06 (tuple) + field count (2 bytes) + field types...',
    description: 'Tuple type: flag + field count + concatenated field type bytes'
  }
]

// Tab 3 Data - Flattening
const traversalOrder = [
  { name: 'name', type: 'string', depth: 0 },
  { name: 'age', type: 'uint8', depth: 0 },
  { name: 'address', type: 'tuple', depth: 0 },
  { name: 'city', type: 'string', depth: 1 },
  { name: 'country', type: 'string', depth: 1 }
]

// Tab 4 Data - Event Flow
const eventFlowSteps = [
  {
    title: 'User Defines Tag Type',
    description: 'Contract receives tuple type with field names',
    code: 'defineTag("profile", tupleType, [["name", "age", "address"], ["city", "country"]])'
  },
  {
    title: 'Hash Field Names',
    description: 'Contract computes keccak256 hash of each field name array',
    code: 'hash0 = keccak256(abi.encode(["name", "age", "address"]))\nhash1 = keccak256(abi.encode(["city", "country"]))'
  },
  {
    title: 'Store Hashes On-Chain',
    description: 'Contract stores hash array in state (cheap: 32 bytes per hash)',
    code: 'fieldNamesHash = [hash0, hash1] // Stored in contract storage'
  },
  {
    title: 'Emit Event with Full Data',
    description: 'Contract emits event with indexed hash + full field names (off-chain)',
    code: 'emit OffchainStringArray(hash0, [["name", "age", "address"]])\nemit OffchainStringArray(hash1, [["city", "country"]])'
  },
  {
    title: 'SDK Retrieval',
    description: 'SDK fetches field name hashes from contract, then queries events by hash',
    code: 'logs = await provider.getLogs({\n  address: contract,\n  topics: [eventTopic, hash0]\n})'
  },
  {
    title: 'Reconstruct Field Names',
    description: 'SDK parses event logs to recover full field name arrays',
    code: 'fieldNames = parseEventLog(logs[0].data)\n// ["name", "age", "address"]'
  }
]

// Tab 5 Data - Decoding Steps
const decodingSteps = [
  {
    title: 'Fetch Raw Tag Data',
    description: 'Retrieve abiType bytes, encoded value, and fieldNamesHash array from contract',
    input: 'tokenId: 12345, tagName: "profile"',
    output: '{\n  abiType: "0x06000303010102060002030303",\n  value: "0x00000...",\n  fieldNamesHash: ["0xabc...", "0xdef..."]\n}'
  },
  {
    title: 'Parse Type Bytes → ABI String',
    description: 'Use TagTypeBuilder.parseTypeBytesToAbiString() to decode compact bytes',
    input: '0x06000303010102060002030303',
    output: 'tuple(string,uint8,bool,tuple(string,string))',
    note: 'This tells us the structure but not the field names yet'
  },
  {
    title: 'Fetch Field Names from Events',
    description: 'For each hash in fieldNamesHash[], query OffchainStringArray events',
    input: 'fieldNamesHash: ["0xabc...", "0xdef..."]',
    output: '[\n  ["name", "age", "verified", "address"],\n  ["city", "country"]\n]',
    note: 'eth_getLogs with indexed hash is fast and efficient'
  },
  {
    title: 'Decode Value with ethers.AbiCoder',
    description: 'Use ethers to decode the raw bytes according to ABI type string',
    input: 'abi.decode(["tuple(string,uint8,bool,tuple(string,string))"], value)',
    output: '[\n  ["Alice", 30, true, ["NYC", "USA"]]\n]',
    note: 'Result is a nested array structure'
  },
  {
    title: 'Apply Field Names (Pre-order)',
    description: 'Recursively walk the decoded value and apply field names in pre-order',
    input: 'Decoded array + field names',
    output: '{\n  name: "Alice",\n  age: 30,\n  verified: true,\n  address: {\n    city: "NYC",\n    country: "USA"\n  }\n}',
    note: 'Final human-readable object with proper field names!'
  }
]

const codeReferences = [
  {
    file: 'TagTypeBuilder.ts',
    location: 'olaresid/src/utils',
    description: 'Converts compact type bytes ↔ ABI strings (e.g., 0x0120 ↔ uint256)'
  },
  {
    file: 'TagTypeParser.ts',
    location: 'olaresid/src/utils',
    description: 'Decodes raw values and applies field names recursively'
  },
  {
    file: 'field-names-fetcher.ts',
    location: 'olaresid/src/domain',
    description: 'Batch fetches field names from OffchainStringArray events'
  },
  {
    file: 'Tag.sol',
    location: 'did-contracts/src/utils',
    description: 'On-chain compact encoding/decoding implementation'
  }
]

// Animation Functions
const animateEncoding = async () => {
  isAnimating.value = true
  currentEncodingStep.value = -1

  for (let i = 0; i < encodingExamples.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    currentEncodingStep.value = i
  }

  await new Promise(resolve => setTimeout(resolve, 500))
  isAnimating.value = false
}

const animateTraversal = async () => {
  isTraversing.value = true
  currentTraversalNode.value = -1

  for (let i = 0; i < traversalOrder.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 600))
    currentTraversalNode.value = i
  }

  await new Promise(resolve => setTimeout(resolve, 500))
  currentTraversalNode.value = -1
  isTraversing.value = false
  flatteningStep.value = 3
}

const animateEventFlow = async () => {
  isFlowAnimating.value = true
  currentFlowStep.value = -1

  for (let i = 0; i < eventFlowSteps.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 1200))
    currentFlowStep.value = i
  }

  await new Promise(resolve => setTimeout(resolve, 500))
  isFlowAnimating.value = false
}

const animateDecoding = async () => {
  isDecodingAnimating.value = true
  currentDecodingStep.value = -1

  for (let i = 0; i < decodingSteps.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 1500))
    currentDecodingStep.value = i
  }

  await new Promise(resolve => setTimeout(resolve, 500))
  isDecodingAnimating.value = false
}

onMounted(() => {
  flatteningStep.value = 1
})
</script>
