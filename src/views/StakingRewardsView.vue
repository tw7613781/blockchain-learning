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
          <h1 class="text-xl font-bold text-white">Synthetix StakingRewards Model</h1>
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

      <!-- Tab 1: The Problem -->
      <div v-if="activeTab === 'problem'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-2xl font-bold text-white">🎯 质押奖励分配的难题</h2>
          </div>
          <div class="card-body space-y-6">
            <!-- Scenario -->
            <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-5">
              <div class="flex items-start space-x-4">
                <div class="text-3xl">💰</div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-white mb-3">场景：质押挖矿合约</h3>
                  <div class="space-y-3 text-gray-300">
                    <p>
                      假设你运营一个质押挖矿合约，用户可以质押代币赚取奖励：
                    </p>
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                      <div class="bg-gray-900 rounded p-3">
                        <div class="font-semibold text-green-400 mb-2">✅ 用户操作</div>
                        <div class="space-y-1 text-gray-400">
                          <div>• 随时质押代币</div>
                          <div>• 随时取出代币</div>
                          <div>• 随时领取奖励</div>
                          <div>• 质押量不同，时间不同</div>
                        </div>
                      </div>
                      <div class="bg-gray-900 rounded p-3">
                        <div class="font-semibold text-blue-400 mb-2">📊 合约规则</div>
                        <div class="space-y-1 text-gray-400">
                          <div>• 每周固定发放奖励（如 1000 代币）</div>
                          <div>• 按质押量比例分配</div>
                          <div>• 质押时间越长，奖励越多</div>
                          <div>• Gas 效率要高</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- The Naive Approach -->
            <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-5">
              <div class="flex items-start space-x-4">
                <div class="text-3xl">❌</div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-red-400 mb-3">朴素方案：遍历所有用户</h3>
                  <div class="space-y-4">
                    <div class="bg-gray-900 rounded-lg p-4">
                      <div class="text-sm text-gray-300 space-y-3">
                        <p class="font-semibold text-white">核心思路：按"代币×时间"的权重分配奖励</p>
                        <div class="space-y-2">
                          <div>
                            <strong class="text-primary-400">第一步</strong>：遍历所有用户，计算每个人的权重
                          </div>
                          <div class="ml-4 text-gray-400">
                            • 权重 = 质押金额 × 质押时长<br>
                            • 例如：Alice 质押 100 代币 10 天 = 1000 权重
                          </div>
                        </div>
                        <div class="space-y-2">
                          <div>
                            <strong class="text-purple-400">第二步</strong>：再次遍历所有用户，按权重比例分配奖励
                          </div>
                          <div class="ml-4 text-gray-400">
                            • 用户奖励 = 总奖励 × (用户权重 / 总权重)<br>
                            • 例如：Alice 权重占 40% → 得到 40% 的奖励
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="grid md:grid-cols-3 gap-3 text-sm">
                      <div class="bg-gray-900 rounded p-3 border-l-4 border-red-500">
                        <div class="font-semibold text-red-400 mb-1">Gas 超级爆炸 💥💥</div>
                        <div class="text-gray-400">需要遍历<strong class="text-white">两次</strong>！<br>10 用户 ≈ 400k gas<br>1000 用户 ≈ 40M gas<br>超出区块限制！</div>
                      </div>
                      <div class="bg-gray-900 rounded p-3 border-l-4 border-red-500">
                        <div class="font-semibold text-red-400 mb-1">逻辑复杂 ⏰</div>
                        <div class="text-gray-400">需要记录每个用户的质押时间，多次操作时难以处理。</div>
                      </div>
                      <div class="bg-gray-900 rounded p-3 border-l-4 border-red-500">
                        <div class="font-semibold text-red-400 mb-1">可被攻击 🎯</div>
                        <div class="text-gray-400">攻击者创建大量地址后，合约直接卡死。</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- The Challenge -->
            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5">
              <div class="flex items-start space-x-4">
                <div class="text-3xl">🤔</div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-yellow-400 mb-3">核心挑战</h3>
                  <div class="text-gray-300 space-y-2">
                    <div class="flex items-start space-x-2">
                      <span class="text-yellow-400 mt-1">•</span>
                      <div>如何在 <strong class="text-white">O(1) 复杂度</strong>内计算每个用户的奖励？</div>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-yellow-400 mt-1">•</span>
                      <div>如何处理用户在 <strong class="text-white">不同时间</strong> 质押不同金额？</div>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-yellow-400 mt-1">•</span>
                      <div>如何确保 <strong class="text-white">公平分配</strong>，按时间和金额加权？</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- The Solution Teaser -->
            <div class="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-5">
              <div class="flex items-start space-x-4">
                <div class="text-3xl">✨</div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-green-400 mb-3">Synthetix 的优雅解法</h3>
                  <div class="text-gray-300 space-y-3">
                    <p>
                      Synthetix 团队设计了一个巧妙的数学模型，通过维护两个关键变量：
                    </p>
                    <div class="grid md:grid-cols-2 gap-3 text-sm">
                      <div class="bg-gray-900 rounded p-3">
                        <div class="font-mono text-primary-400 mb-1">rewardPerTokenStored</div>
                        <div class="text-gray-400">全局累积的"每个代币应得的奖励"</div>
                      </div>
                      <div class="bg-gray-900 rounded p-3">
                        <div class="font-mono text-purple-400 mb-1">userRewardPerTokenPaid</div>
                        <div class="text-gray-400">用户上次领取/操作时的全局值</div>
                      </div>
                    </div>
                    <div class="bg-green-500/10 border-l-4 border-green-500 pl-4 py-2">
                      <div class="text-green-400 font-semibold">
                        核心思想：不记录每个用户的奖励，而是记录"差值"！
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex justify-end">
              <button
                @click="activeTab = 'math'"
                class="btn btn-primary flex items-center space-x-2"
              >
                <span>继续：数学原理</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: The Math -->
      <div v-if="activeTab === 'math'" class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-2xl font-bold text-white">📐 数学原理：差值的魔法</h2>
          </div>
          <div class="card-body space-y-6">
            <!-- Core Idea -->
            <div class="bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/50 rounded-lg p-6">
              <div class="flex items-start space-x-4">
                <div class="text-4xl">💡</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-white mb-3">核心思想</h3>
                  <div class="text-lg text-gray-300 space-y-3">
                    <p>
                      不记录每个用户的奖励，而是记录两个"<strong class="text-primary-400">快照</strong>"：
                    </p>
                    <div class="grid md:grid-cols-2 gap-4">
                      <div class="bg-gray-900 rounded-lg p-4">
                        <div class="text-primary-400 font-bold mb-2">全局快照</div>
                        <div class="text-sm text-gray-400">
                          从合约创建到现在，每 1 个代币总共赚了多少
                        </div>
                      </div>
                      <div class="bg-gray-900 rounded-lg p-4">
                        <div class="text-purple-400 font-bold mb-2">用户快照</div>
                        <div class="text-sm text-gray-400">
                          用户上次操作时，全局快照是多少
                        </div>
                      </div>
                    </div>
                    <div class="bg-green-500/10 border-l-4 border-green-500 pl-4 py-3 mt-4">
                      <div class="font-bold text-green-400 text-xl">
                        用户奖励 = 质押量 × (全局快照 - 用户快照)
                      </div>
                      <div class="text-sm text-gray-400 mt-2">
                        差值越大 = 质押时间越长 = 奖励越多！
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Three Key Variables -->
            <div class="bg-gray-800/50 rounded-lg p-5">
              <h3 class="text-xl font-bold text-white mb-4">三个关键变量（用大白话解释）</h3>
              <div class="space-y-4">
                <div class="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <div class="text-lg font-bold text-blue-400">全局累积值</div>
                      <div class="text-xs text-gray-500 font-mono">rewardPerTokenStored</div>
                    </div>
                    <div class="text-xs text-gray-500">全局变量</div>
                  </div>
                  <div class="text-sm text-gray-300 mb-3">
                    从合约创建到现在，<strong class="text-white">每 1 个质押代币</strong>总共应该赚多少奖励
                  </div>
                  <div class="bg-blue-500/10 rounded p-3 text-xs text-gray-400">
                    举例：如果这个值是 <code class="text-blue-400">0.5</code>，
                    意味着每个代币从一开始到现在累计赚了 0.5 个奖励
                  </div>
                </div>

                <div class="bg-gray-900 rounded-lg p-4 border-l-4 border-purple-500">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <div class="text-lg font-bold text-purple-400">用户快照值</div>
                      <div class="text-xs text-gray-500 font-mono">userRewardPerTokenPaid[用户]</div>
                    </div>
                    <div class="text-xs text-gray-500">每个用户一个</div>
                  </div>
                  <div class="text-sm text-gray-300 mb-3">
                    用户上次质押/取出/领取时，全局累积值是多少（<strong class="text-white">存个底</strong>）
                  </div>
                  <div class="bg-purple-500/10 rounded p-3 text-xs text-gray-400">
                    举例：Alice 质押时全局值是 <code class="text-purple-400">0.2</code>，
                    那就记下来 <code class="text-purple-400">0.2</code>
                  </div>
                </div>

                <div class="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <div class="text-lg font-bold text-green-400">已累积奖励</div>
                      <div class="text-xs text-gray-500 font-mono">rewards[用户]</div>
                    </div>
                    <div class="text-xs text-gray-500">每个用户一个</div>
                  </div>
                  <div class="text-sm text-gray-300">
                    用户已经赚到但还没领取的奖励（<strong class="text-white">存起来</strong>）
                  </div>
                </div>
              </div>
            </div>

            <!-- The Magic Formulas -->
            <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6">
              <h3 class="text-2xl font-bold text-white mb-4 flex items-center">
                <span class="text-3xl mr-3">✨</span>
                两个魔法公式
              </h3>
              
              <div class="space-y-6">
                <!-- Formula 1 -->
                <div class="bg-gray-900 rounded-lg p-5">
                  <div class="text-sm text-yellow-400 mb-3">📊 公式 1: 更新全局累积值</div>
                  <div class="bg-black rounded p-4 mb-4">
                    <div class="text-center">
                      <div class="text-sm text-gray-400 mb-2">每次有人操作时更新</div>
                      <div class="text-xl font-mono text-primary-400">
                        全局累积值 = 旧的全局累积值 + 每个代币新增的奖励
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-orange-500/10 border border-orange-500/30 rounded p-3 mb-4">
                    <div class="font-semibold text-orange-400 text-sm mb-2">⚡ "操作"具体指哪些？</div>
                    <div class="text-xs text-gray-300 space-y-1">
                      <div>• <strong class="text-white">质押 (stake)</strong>：用户存入代币</div>
                      <div>• <strong class="text-white">取出 (withdraw)</strong>：用户取出代币</div>
                      <div>• <strong class="text-white">领取奖励 (getReward)</strong>：用户领取奖励</div>
                      <div class="text-gray-400 mt-2">
                        💡 关键：任何一个用户的任何操作，都会先更新全局累积值！
                      </div>
                    </div>
                  </div>

                  <div class="space-y-3 text-sm">
                    <div class="bg-blue-500/10 rounded p-3">
                      <div class="font-semibold text-blue-400 mb-2">每个代币新增的奖励 = 这段时间的总奖励 / 总质押量</div>
                      <div class="text-gray-400 space-y-1 text-xs">
                        <div>• <strong class="text-white">这段时间的总奖励</strong> = 每秒发放奖励 × 过去了多少秒</div>
                        <div>• <strong class="text-white">总质押量</strong> = 现在所有人质押的代币加起来</div>
                      </div>
                    </div>
                    <div class="bg-yellow-500/10 border-l-4 border-yellow-500 pl-3 py-2">
                      <div class="text-xs text-yellow-400">
                        💡 <strong>关键理解</strong>：这里不看个人，只看"平均每个代币赚多少"
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Formula 2 -->
                <div class="bg-gray-900 rounded-lg p-5">
                  <div class="text-sm text-purple-400 mb-3">💰 公式 2: 计算用户奖励（这里有时间加权！）</div>
                  <div class="bg-black rounded p-4 mb-4">
                    <div class="text-center">
                      <div class="text-sm text-gray-400 mb-2">用户领取奖励时计算</div>
                      <div class="text-xl font-mono text-green-400">
                        用户奖励 = 质押量 × (全局累积值 - 用户快照值) + 已累积奖励
                      </div>
                    </div>
                  </div>
                  <div class="space-y-3 text-sm">
                    <div class="bg-green-500/10 rounded p-3">
                      <div class="font-semibold text-green-400 mb-2">差值 = 用户"错过"的奖励增长</div>
                      <div class="text-gray-400 space-y-1 text-xs">
                        <div>• 用户质押越早 → 快照值越小 → <strong class="text-white">差值越大</strong></div>
                        <div>• 差值越大 × 质押量 → <strong class="text-white">奖励越多</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- The KEY Insight: Time Weighting -->
            <div class="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-500/50 rounded-lg p-6">
              <div class="flex items-start space-x-4">
                <div class="text-4xl">🎯</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-white mb-4">关键问题：时间加权在哪里？</h3>
                  <div class="space-y-4 text-gray-300">
                    <div class="text-lg">
                      你的疑问非常好！计算全局累积值时，确实 <strong class="text-red-400">没有考虑个人的质押时间</strong>。
                    </div>
                    
                    <div class="bg-gray-900 rounded-lg p-4">
                      <div class="font-bold text-white mb-3">🤔 看起来的问题</div>
                      <div class="text-sm space-y-2">
                        <div>• 全局累积值每次增加 <code class="text-primary-400">(新增奖励 / 总质押量)</code></div>
                        <div>• 这个计算里没有看是谁质押的，也没有看质押了多久</div>
                        <div>• 那时间加权怎么实现的？🤨</div>
                      </div>
                    </div>

                    <div class="bg-green-500/10 border-2 border-green-500 rounded-lg p-4">
                      <div class="font-bold text-green-400 text-lg mb-3">✨ 巧妙之处：通过"差值"自动实现！</div>
                      <div class="space-y-3 text-sm">
                        <div class="bg-gray-900 rounded p-3">
                          <div class="text-white font-semibold mb-2">情况 1: 质押时间长的用户</div>
                          <div class="text-gray-400">
                            • Alice 在第 1 天质押，快照值 = <code class="text-purple-400">0.1</code><br>
                            • 第 10 天全局值 = <code class="text-primary-400">1.0</code><br>
                            • 差值 = <code class="text-green-400">1.0 - 0.1 = 0.9</code> ← <strong class="text-white">很大！</strong><br>
                            • 奖励 = 100 × <code class="text-green-400">0.9</code> = <strong class="text-green-400">90</strong>
                          </div>
                        </div>
                        <div class="bg-gray-900 rounded p-3">
                          <div class="text-white font-semibold mb-2">情况 2: 质押时间短的用户</div>
                          <div class="text-gray-400">
                            • Bob 在第 8 天质押，快照值 = <code class="text-purple-400">0.8</code><br>
                            • 第 10 天全局值 = <code class="text-primary-400">1.0</code><br>
                            • 差值 = <code class="text-yellow-400">1.0 - 0.8 = 0.2</code> ← <strong class="text-white">较小</strong><br>
                            • 奖励 = 100 × <code class="text-yellow-400">0.2</code> = <strong class="text-yellow-400">20</strong>
                          </div>
                        </div>
                        <div class="bg-yellow-500/10 border-l-4 border-yellow-500 pl-4 py-3 mt-3">
                          <div class="font-bold text-yellow-400 mb-2">💡 神奇的地方</div>
                          <div class="text-xs text-gray-300">
                            • 全局累积值一直在增长（每次操作都增加）<br>
                            • 用户快照值是固定的（质押时记下来就不变了）<br>
                            • 质押时间越长 → 快照值越老 → 差值越大 → 奖励越多！<br>
                            • <strong class="text-white">时间加权自动实现，不需要单独记录时间！</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Detailed Example -->
            <div class="bg-gray-800/50 rounded-lg p-5">
              <h3 class="text-xl font-bold text-white mb-4">🧮 完整示例：看懂整个流程</h3>
              
              <div class="space-y-4">
                <!-- Day 0 -->
                <div class="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
                  <div class="flex items-center justify-between mb-3">
                    <div class="font-bold text-white">第 0 天：初始状态</div>
                    <div class="text-xs text-gray-500">合约刚创建</div>
                  </div>
                  <div class="grid md:grid-cols-2 gap-3 text-sm">
                    <div class="space-y-1">
                      <div class="text-gray-400">总质押量: <span class="text-white font-mono">0</span></div>
                      <div class="text-gray-400">全局累积值: <span class="text-primary-400 font-mono">0</span></div>
                      <div class="text-gray-400">每天发放: <span class="text-green-400 font-mono">100 代币</span></div>
                    </div>
                  </div>
                </div>

                <!-- Alice Stakes -->
                <div class="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
                  <div class="flex items-center justify-between mb-3">
                    <div class="font-bold text-white">第 0 天：Alice 质押 100</div>
                    <div class="text-xs bg-blue-500/20 px-2 py-1 rounded text-blue-400">质押操作</div>
                  </div>
                  <div class="space-y-2 text-sm">
                    <div class="text-gray-400">
                      → 总质押量变为: <span class="text-white font-mono">100</span><br>
                      → Alice 快照值: <span class="text-purple-400 font-mono">0</span> (记下当前全局值)<br>
                      → Alice 质押量: <span class="text-white font-mono">100</span>
                    </div>
                  </div>
                </div>

                <!-- Day 5 -->
                <div class="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                  <div class="flex items-center justify-between mb-3">
                    <div class="font-bold text-white">第 5 天：Bob 质押 200</div>
                    <div class="text-xs bg-green-500/20 px-2 py-1 rounded text-green-400">质押操作</div>
                  </div>
                  <div class="space-y-3 text-sm">
                    <div class="bg-blue-500/10 rounded p-3">
                      <div class="text-blue-400 font-semibold mb-1">先更新全局累积值</div>
                      <div class="font-mono text-xs text-gray-300">
                        过去 5 天的总奖励 = 100 × 5 = 500<br>
                        每个代币新增 = 500 / 100 = 5<br>
                        全局累积值 = 0 + 5 = <span class="text-primary-400">5.0</span>
                      </div>
                    </div>
                    <div class="text-gray-400">
                      → 总质押量变为: <span class="text-white font-mono">300</span> (100 + 200)<br>
                      → Bob 快照值: <span class="text-purple-400 font-mono">5.0</span> (记下当前全局值)<br>
                      → Bob 质押量: <span class="text-white font-mono">200</span>
                    </div>
                  </div>
                </div>

                <!-- Day 10 -->
                <div class="bg-gray-900 rounded-lg p-4 border-l-4 border-yellow-500">
                  <div class="flex items-center justify-between mb-3">
                    <div class="font-bold text-white">第 10 天：Alice 和 Bob 都来领奖励</div>
                    <div class="text-xs bg-yellow-500/20 px-2 py-1 rounded text-yellow-400">领取操作</div>
                  </div>
                  <div class="space-y-3 text-sm">
                    <div class="bg-blue-500/10 rounded p-3">
                      <div class="text-blue-400 font-semibold mb-1">先更新全局累积值</div>
                      <div class="font-mono text-xs text-gray-300">
                        过去 5 天的总奖励 = 100 × 5 = 500<br>
                        每个代币新增 = 500 / 300 = 1.667<br>
                        全局累积值 = 5.0 + 1.667 = <span class="text-primary-400">6.667</span>
                      </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-3">
                      <div class="bg-green-500/10 rounded p-3">
                        <div class="font-semibold text-green-400 mb-2">Alice 的奖励</div>
                        <div class="font-mono text-xs text-gray-300">
                          差值 = 6.667 - 0 = <span class="text-yellow-400">6.667</span><br>
                          奖励 = 100 × 6.667 = <span class="text-green-400">666.7</span>
                        </div>
                        <div class="text-xs text-gray-400 mt-2">
                          ✓ 质押了 10 天，快照值很旧，差值大！
                        </div>
                      </div>

                      <div class="bg-green-500/10 rounded p-3">
                        <div class="font-semibold text-green-400 mb-2">Bob 的奖励</div>
                        <div class="font-mono text-xs text-gray-300">
                          差值 = 6.667 - 5.0 = <span class="text-yellow-400">1.667</span><br>
                          奖励 = 200 × 1.667 = <span class="text-green-400">333.4</span>
                        </div>
                        <div class="text-xs text-gray-400 mt-2">
                          ✓ 只质押了 5 天，快照值较新，差值小
                        </div>
                      </div>
                    </div>

                    <div class="bg-yellow-500/10 border-l-4 border-yellow-500 pl-3 py-2">
                      <div class="text-xs text-yellow-400">
                        ✓ 验证：666.7 + 333.4 = 1000，正好是 10 天的总奖励！<br>
                        ✓ Alice 虽然质押少，但时间长，所以奖励多！
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Why This Works -->
            <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
              <div class="flex items-start space-x-4">
                <div class="text-3xl">💡</div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-blue-400 mb-3">为什么这个设计如此优雅？</h3>
                  <div class="space-y-3 text-sm text-gray-300">
                    <div class="bg-gray-900 rounded p-4">
                      <div class="font-semibold text-white mb-2">1️⃣ O(1) 复杂度</div>
                      <div class="text-gray-400">
                        只在用户自己操作时更新他的状态，不需要遍历其他人。无论 10 个用户还是 10000 个用户，gas 消耗一样。
                      </div>
                    </div>

                    <div class="bg-gray-900 rounded p-4">
                      <div class="font-semibold text-white mb-2">2️⃣ 自动时间加权</div>
                      <div class="text-gray-400">
                        不需要单独记录质押时间。通过<strong class="text-white">"快照值"</strong>的差值，
                        天然实现了"质押越久、奖励越多"。
                      </div>
                    </div>

                    <div class="bg-gray-900 rounded p-4">
                      <div class="font-semibold text-white mb-2">3️⃣ 精确到秒</div>
                      <div class="text-gray-400">
                        每次操作都会更新全局累积值，确保奖励计算精确到最后一秒。没有任何奖励浪费或丢失。
                      </div>
                    </div>

                    <div class="bg-gray-900 rounded p-4">
                      <div class="font-semibold text-white mb-2">4️⃣ 完全公平</div>
                      <div class="text-gray-400">
                        数学保证：质押量 × 时间相同的用户，得到相同的奖励。不存在先来后到的优势。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex justify-start">
              <button
                @click="activeTab = 'problem'"
                class="btn btn-secondary"
              >
                ← 返回问题场景
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('problem')

const tabs = [
  { id: 'problem', name: '1. 问题场景' },
  { id: 'math', name: '2. 数学原理' }
]
</script>
