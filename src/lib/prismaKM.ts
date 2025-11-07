// lib/prismaKM.ts
//1. `globalForPrismaKM` - 전역 객체에 Prisma 인스턴스 저장
//2. `??` (Nullish coalescing) - 이미 인스턴스가 있으면 재사용, 없으면 생성
//3. `log` 옵션 - 개발 중 실행되는 쿼리 확인 가능
//4. 프로덕션에서는 새 인스턴스 생성 (최적화)
import { PrismaClient } from '@/generated/prisma-client/km';

const globalForPrismaKM = globalThis as unknown as {
  prismaKM: PrismaClient | undefined;
};

export const prismaKM =
  globalForPrismaKM.prismaKM ??
  new PrismaClient({
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrismaKM.prismaKM = prismaKM;
}
