import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/storage/erc7201',
      name: 'erc7201',
      component: () => import('../views/ERC7201View.vue'),
    },
    {
      path: '/storage/namespaces',
      name: 'namespaces',
      component: () => import('../views/NamespacesView.vue'),
    },
    {
      path: '/memory/basics',
      name: 'memory-basics',
      component: () => import('../views/MemoryBasicsView.vue'),
    },
    {
      path: '/memory/domainutils',
      name: 'domainutils',
      component: () => import('../views/DomainUtilsView.vue'),
    },
    {
      path: '/solana/account-model',
      name: 'solana-account-model',
      component: () => import('../views/solana/SolanaAccountModelView.vue'),
    },
    {
      path: '/solana/pda-seeds',
      name: 'solana-pda',
      component: () => import('../views/solana/SolanaPDAView.vue'),
    },
    {
      path: '/solana/anchor-structures',
      name: 'solana-anchor',
      component: () => import('../views/solana/SolanaAnchorView.vue'),
    },
    {
      path: '/solana/cpi',
      name: 'solana-cpi',
      component: () => import('../views/solana/SolanaCPIView.vue'),
    },
    {
      path: '/solana/transactions',
      name: 'solana-transactions',
      component: () => import('../views/solana/SolanaTransactionsView.vue'),
    },
    {
      path: '/solana/evm-comparison',
      name: 'solana-evm-comparison',
      component: () => import('../views/solana/SolanaEvmComparisonView.vue'),
    },
    {
      path: '/evm/tag-abi-encoding',
      name: 'tag-abi-encoding',
      component: () => import('../views/TagAbiEncodingView.vue'),
    },
    {
      path: '/math/staking-rewards',
      name: 'staking-rewards',
      component: () => import('../views/StakingRewardsView.vue'),
    },
  ],
})

export default router
