// Solana 账户结构
export interface SolanaAccount {
  address: string
  owner: string
  lamports: number
  data: Uint8Array | null
  executable: boolean
  rentEpoch?: number
}

// PDA 计算结果
export interface PDACalculation {
  seeds: Array<SeedInput>
  programId: string
  pda: string
  bump: number
}

// Seeds 输入类型
export interface SeedInput {
  type: 'string' | 'bytes' | 'pubkey' | 'u64' | 'u32'
  value: string
  label?: string
}

// Anchor 账户类型
export interface AnchorAccount {
  name: string
  type: string
  description?: string
  constraints?: string[]
}

// 账户大小计算
export interface AccountSize {
  discriminator: number // 固定 8 字节
  fields: Array<{
    name: string
    type: string
    size: number
  }>
  totalSize: number
}

// EVM vs Solana 对比项
export interface ComparisonItem {
  feature: string
  evm: string
  solana: string
  details?: string
}

// Escrow 账户示例（从 Otmoic 合约）
export interface EscrowAccount {
  from: string // Pubkey
  to: string // Pubkey
  tokenProgram: string // Pubkey
  mint: string // Pubkey
  source: string // Pubkey
  escrowAta: string // Pubkey
  solAmount: number // u64
  tokenAmount: number // u64
  solFee: number // u64
  tokenFee: number // u64
  lock: {
    hash: Uint8Array // [u8; 32]
    agreementReachedTime: number // i64
    expectedSingleStepTime: number // i64
    tolerantSingleStepTime: number // i64
    earliestRefundTime: number // i64
  }
  isOut: boolean
}
