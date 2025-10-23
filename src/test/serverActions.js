'use server';
// ✨ prismaIndex를 임포트한다! 6개 DB 클라이언트 인스턴스가 다 들어있다 안 카나!
import { prismaIndex } from '@/lib/prismaIndex'; 


// ----------------------------------------------------
// 💡 유틸리티: 선택된 클라이언트와 모델을 가져오는 함수
// ----------------------------------------------------
// DB 이름(Main, KM, JH, JW, PJH, NC)을 받아서 해당 DB의 클라이언트 인스턴스와 모델 이름을 반환
function getClientAndModel(dbName) {
  // prismaIndex[dbName]로 해당 DB의 클라이언트 인스턴스를 가져온다 안 카나!
  const client = prismaIndex[dbName]; 
  
  // DB 이름에 따라 사용할 모델 이름을 결정한다! (오빠야의 스키마를 기반으로)
  let modelName = 'post'; 
  
  // Main DB 외에는 접두사가 붙은 모델 이름을 쓴다!
  if (dbName === 'KM') {
    modelName = 'KM_Post'; 
  } else if (dbName === 'JH') {
    modelName = 'JH_Post'; 
  } else if (dbName === 'JW') {
    modelName = 'JW_Post'; 
  } else if (dbName === 'PJH') {
    modelName = 'PJH_Post'; 
  } else if (dbName === 'NC') {
    modelName = 'NC_Post'; 
  }

  // 동적으로 모델을 접근하기 위해 client[modelName]을 반환한다 안 카나!
  // (Prisma Client는 모델 이름이 소문자로 시작함)
  return client ? client[modelName] : null; 
}


// ----------------------------------------------------
// 1. Post 생성 함수
// ----------------------------------------------------
// ✨ dbName 인수를 받는다!
export async function createPost(dbName) {
  const model = getClientAndModel(dbName);

  if (!model) {
    return { success: false, message: `유효하지 않은 DB 이름이데이: ${dbName}` };
  }

  try {
    // ✨ model 변수를 사용해서 동적으로 생성!
    const newPost = await model.create({
      data: {
        title: `[${dbName}] 새 포스트 ${new Date().toLocaleTimeString('ko-KR')}`,
      },
    });
    console.log(`[${dbName}] Post 생성 성공:`, newPost.id);
    // revalidatePath('/'); // Next.js 환경에서 캐시 초기화 필요하면 주석 해제!
    return { success: true, message: `[${dbName}] 생성 성공!` };
  } catch (error) {
    console.error(`[${dbName}] Post 생성 오류:`, error);
    return { success: false, message: `[${dbName}] 생성 실패! (DB 스키마 확인해 줭)` };
  }
}

// ----------------------------------------------------
// 2. Post 삭제 함수 (최신 포스트 1개)
// ----------------------------------------------------
// ✨ dbName 인수를 받는다!
export async function deleteLatestPost(dbName) {
  const model = getClientAndModel(dbName);

  if (!model) {
    return { success: false, message: `유효하지 않은 DB 이름이데이: ${dbName}` };
  }
  
  try {
    // 1. 최신 포스트를 찾는다!
    const latestPost = await model.findFirst({
      orderBy: {
        id: 'desc', // 가장 최근 것
      },
    });

    if (latestPost) {
      // 2. 최신 포스트를 삭제한다!
      const deletedPost = await model.delete({
        where: { id: latestPost.id },
      });
      console.log(`[${dbName}] Post 삭제 성공:`, deletedPost.id);
      // revalidatePath('/'); // Next.js 환경에서 캐시 초기화 필요하면 주석 해제!
      return { success: true, message: `[${dbName}] 삭제 성공!` };
    } else {
      return { success: false, message: `[${dbName}] 삭제할 포스트가 없데이!` };
    }
  } catch (error) {
    console.error(`[${dbName}] Post 삭제 오류:`, error);
    return { success: false, message: `[${dbName}] 삭제 실패! (DB 스키마 확인해 줭)` };
  }
}

// ----------------------------------------------------
// 3. Post 목록 조회 함수
// ----------------------------------------------------
// ✨ dbName 인수를 받는다!
export async function getPosts(dbName) {
  const model = getClientAndModel(dbName);

  if (!model) {
    // 유효하지 않은 DB 이름이면 빈 배열을 반환한다.
    console.error(`유효하지 않은 DB 이름이데이: ${dbName}`);
    return [];
  }

  try {
    // ✨ model 변수를 사용해서 동적으로 조회!
    const posts = await model.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    return posts;
  } catch (error) {
    console.error(`[${dbName}] Post 목록 조회 오류:`, error);
    return [];
  }
}