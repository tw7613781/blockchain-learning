import type { SeedInput, AccountSize } from '../types/solana'

/**
 * 简化版 SHA256 (用于演示)
 * 生产环境应该使用 @solana/web3.js
 */
function simpleSha256(data: Uint8Array): Uint8Array {
  // 这是一个简化的模拟版本,仅用于教学演示
  // 实际应该使用真正的 SHA256 实现
  const result = new Uint8Array(32)
  for (let i = 0; i < 32; i++) {
    const dataIndex = i % data.length
    result[i] = (data[dataIndex] || 0) ^ (i * 7)
  }
  return result
}

/**
 * 计算 PDA (Program Derived Address)
 * 使用与 Solana 相同的算法
 */
export function findProgramAddress(
  seeds: Uint8Array[],
  programId: string
): { pda: string; bump: number } {
  // 这是一个简化版本，实际应该使用 @solana/web3.js
  // 但为了教学目的，我们展示核心逻辑
  
  const programIdBytes = base58ToBytes(programId)
  
  for (let bump = 255; bump >= 0; bump--) {
    const bumpArray = new Uint8Array([bump])
    const seedsWithBump = [...seeds, bumpArray]
    
    try {
      const hash = createProgramAddress(seedsWithBump, programIdBytes)
      if (hash) {
        return {
          pda: bytesToBase58(hash),
          bump
        }
      }
    } catch {
      continue
    }
  }
  
  throw new Error('Unable to find a viable program address bump seed')
}

/**
 * 创建程序地址
 */
function createProgramAddress(seeds: Uint8Array[], programId: Uint8Array): Uint8Array | null {
  const PDA_MARKER = new TextEncoder().encode('ProgramDerivedAddress')
  
  // 拼接所有 seeds + programId + marker
  const combined = new Uint8Array(
    seeds.reduce((acc, seed) => acc + seed.length, 0) +
    programId.length +
    PDA_MARKER.length
  )
  
  let offset = 0
  for (const seed of seeds) {
    combined.set(seed, offset)
    offset += seed.length
  }
  combined.set(programId, offset)
  offset += programId.length
  combined.set(PDA_MARKER, offset)
  
  const hash = simpleSha256(combined)
  
  // 检查是否在椭圆曲线上（简化版）
  if (isOnCurve(hash)) {
    return null
  }
  
  return hash
}

/**
 * 检查点是否在 Ed25519 曲线上（简化版）
 */
function isOnCurve(publicKey: Uint8Array): boolean {
  // 这是一个简化的检查
  // 实际的 Solana 实现更复杂
  return false
}

/**
 * Base58 编码
 */
export function bytesToBase58(bytes: Uint8Array): string {
  const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  
  if (bytes.length === 0) return ''
  
  let num = BigInt(0)
  for (const byte of bytes) {
    num = num * BigInt(256) + BigInt(byte)
  }
  
  let encoded = ''
  while (num > 0) {
    const remainder = Number(num % BigInt(58))
    encoded = ALPHABET[remainder] + encoded
    num = num / BigInt(58)
  }
  
  // 添加前导零
  for (const byte of bytes) {
    if (byte !== 0) break
    encoded = '1' + encoded
  }
  
  return encoded
}

/**
 * Base58 解码
 */
export function base58ToBytes(str: string): Uint8Array {
  const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  
  let num = BigInt(0)
  for (const char of str) {
    const index = ALPHABET.indexOf(char)
    if (index === -1) throw new Error('Invalid base58 character')
    num = num * BigInt(58) + BigInt(index)
  }
  
  const bytes: number[] = []
  while (num > 0) {
    bytes.unshift(Number(num % BigInt(256)))
    num = num / BigInt(256)
  }
  
  // 添加前导零
  for (const char of str) {
    if (char !== '1') break
    bytes.unshift(0)
  }
  
  return new Uint8Array(bytes)
}

/**
 * 将 seed 输入转换为字节数组
 */
export function seedToBytes(seed: SeedInput): Uint8Array {
  switch (seed.type) {
    case 'string':
      return new TextEncoder().encode(seed.value)
    
    case 'bytes':
      // 假设输入是十六进制字符串
      return hexToBytes(seed.value)
    
    case 'pubkey':
      return base58ToBytes(seed.value)
    
    case 'u64': {
      const value = BigInt(seed.value)
      const bytes = new Uint8Array(8)
      for (let i = 0; i < 8; i++) {
        bytes[i] = Number((value >> BigInt(i * 8)) & BigInt(0xff))
      }
      return bytes
    }
    
    case 'u32': {
      const value = Number(seed.value)
      const bytes = new Uint8Array(4)
      for (let i = 0; i < 4; i++) {
        bytes[i] = (value >> (i * 8)) & 0xff
      }
      return bytes
    }
    
    default:
      throw new Error(`Unknown seed type: ${seed.type}`)
  }
}

/**
 * 十六进制转字节数组
 */
function hexToBytes(hex: string): Uint8Array {
  const cleaned = hex.replace(/^0x/, '')
  const bytes = new Uint8Array(cleaned.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleaned.substr(i * 2, 2), 16)
  }
  return bytes
}

/**
 * 计算账户大小
 */
export function calculateAccountSize(fields: AccountSize['fields']): AccountSize {
  const discriminator = 8 // Anchor discriminator
  const totalSize = discriminator + fields.reduce((sum, field) => sum + field.size, 0)
  
  return {
    discriminator,
    fields,
    totalSize
  }
}

/**
 * 获取 Rust 类型的大小（字节）
 */
export function getRustTypeSize(rustType: string): number {
  const sizeMap: Record<string, number> = {
    'bool': 1,
    'u8': 1,
    'i8': 1,
    'u16': 2,
    'i16': 2,
    'u32': 4,
    'i32': 4,
    'u64': 8,
    'i64': 8,
    'u128': 16,
    'i128': 16,
    'Pubkey': 32,
    '[u8; 32]': 32,
  }
  
  return sizeMap[rustType] || 0
}

/**
 * 格式化 Lamports 为 SOL
 */
export function lamportsToSol(lamports: number): string {
  return (lamports / 1_000_000_000).toFixed(9)
}

/**
 * SOL 转 Lamports
 */
export function solToLamports(sol: number): number {
  return Math.floor(sol * 1_000_000_000)
}

/**
 * 简化的 PDA 计算（用于演示）
 */
export function calculatePDADemo(
  seeds: string[],
  programId: string = 'FAqaHQHgBFFX8fJB6fQUqNdc8zABV5pGVRdCt7fLLYVo' // Otmoic obridge program
): string {
  // 这是一个演示版本，实际计算需要完整的 Solana 库
  const seedsStr = seeds.join('-')
  const combined = new TextEncoder().encode(seedsStr + programId)
  const hash = simpleSha256(combined)
  return bytesToBase58(hash)
}
