import { PrismaClient } from '@prisma/client'

/**
 * Cliente único. Em dev o hot reload recria o módulo a cada alteração;
 * sem o cache no globalThis isso abre uma conexão nova por reload até
 * estourar o limite do Neon.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
