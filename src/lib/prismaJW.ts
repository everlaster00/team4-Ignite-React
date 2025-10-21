// lib/prismaJW.ts
//1. `globalForPrismaJW` - 전역 객체에 Prisma 인스턴스 저장
//2. `??` (Nullish coalescing) - 이미 인스턴스가 있으면 재사용, 없으면 생성
//3. `log` 옵션 - 개발 중 실행되는 쿼리 확인 가능
//4. 프로덕션에서는 새 인스턴스 생성 (최적화)
import { PrismaClient } from '@/generated/prisma-client/jw';

const globalForPrismaJW = globalThis as unknown as {
  prismaJW: PrismaClient | undefined;
};

export const prismaJW =
  globalForPrismaJW.prismaJW ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrismaJW.prismaJW = prismaJW;
}
