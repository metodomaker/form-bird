import crypto from 'crypto'

export const randomHex = (size: number) =>
  crypto.randomBytes(size).toString('hex')
