// server_actions/fireboard/postActions.js

"use server";

import * as bcrypt from "bcrypt";
import { headers, cookies } from "next/headers";
import { 
    createPostInDB, 
    getPostById, 
    getPostLikeStatus, 
    createPostLikeInDB, 
    deletePostLikeInDB,
    incrementPostViews
} from "./maindb/posts/crud"; 

function getClientIp(headersList) {
  return (
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    headersList.get("cf-connecting-ip") || "0.0.0.0"
  );
}

// 게시글 작성
export async function createPost(formData) {
  const headersList = headers();
  const clientIp = getClientIp(headersList);

  
  const { title, content, anonym, anonyPass, category } = Object.fromEntries(
    formData.entries()
  );
  
  if (!content || content.length < 5 || content.length > 5000) {
      return { 
          success: false, 
          error: "게시글 내용은 최소 5자, 최대 5000자까지 작성할 수 있습니다." 
      };
  }
  if (!title || !content || !anonym || !anonyPass || !category) {
    return { success: false, error: "모든 필드를 채워주세요!" };
  }

  try {
    const hashedPassword = await bcrypt.hash(anonyPass, 10);

    const dbData = {
      title,
      content,
      category,
      anonym,
      anonyPass: hashedPassword,
      clientIp: clientIp,
    };

    const result = await createPostInDB(dbData);

    if (result && result.id) {
      return {
        success: true,
        postId: result.id,
      };
    } else {
      return {
        success: false,
        error: "게시글 작성에 실패했습니다.",
      };
    }
  } catch (error) {
    console.error("Post creation error:", error);
    return { success: false, error: "서버 처리 중 오류가 발생했습니다." };
  }
}

// 게시글 수정 (임시 구현)
export async function updatePost(postId, formData) {
  return { success: false, error: "수정 기능은 아직 구현되지 않았어요." };
}


/**
 * 게시글에 좋아요를 토글(추가/취소)합니다.
 * @param {string} postId - 좋아요를 누를 게시글 ID (문자열로 받지만 내부에서 파싱)
 * @returns {object} 결과 객체 { success: boolean, isLiked: boolean, likeCount: number, error: string }
 */
export async function togglePostLike(postId) {
  const cookieStore = await cookies();
  // 비회원 식별자인 connection_id를 쿠키에서 가져옵니다.
  const connectionId = cookieStore.get("connection_id")?.value;

  if (!connectionId) {
    return { success: false, error: "식별 정보가 없습니다. 새로고침 후 다시 시도해 주세요.", isLiked: false, likeCount: 0, };
  }

  try {
    const postParse = parseInt(postId, 10);
    if (isNaN(postParse)) {
        return { success: false, error: "유효하지 않은 게시글 ID입니다.", isLiked: false, likeCount: 0, };
    }

    // 1. 현재 좋아요 상태 확인 (crud.js에 구현 예정)
    const existingLike = await getPostLikeStatus(postParse, connectionId);

    let result;
    let newIsLiked;

    if (existingLike) {
      // 2. 이미 좋아요를 눌렀다면 → 취소 (삭제)
      result = await deletePostLikeInDB(postParse, connectionId); // crud.js에 구현 예정
      newIsLiked = false;
    } else {
      // 2. 좋아요를 누르지 않았다면 → 추가 (생성)
      const dbData = {
        postId: postParse,
        anonymId: connectionId, // 비회원 좋아요는 Connection ID를 사용
      };
      result = await createPostLikeInDB(dbData); // crud.js에 구현 예정
      newIsLiked = true;
    }
    
    // 3. 결과 반환 (newCount는 crud 함수에서 계산되어 반환됩니다.)
    if (result && result.newCount !== undefined) {
        return { 
            success: true, 
            isLiked: newIsLiked, 
            likeCount: result.newCount, 
        };
    } else {
        return { success: false, error: "좋아요 처리 중 데이터 오류가 발생했습니다.", isLiked: !!existingLike, likeCount: 0, };
    }

  } catch (error) {
    console.error("Toggle Post Like Error:", error);
    return { success: false, error: "서버 처리 중 오류가 발생했습니다.", isLiked: false, likeCount: 0, };
  }
}


// 게시글 조회 (좋아요 상태 및 카운트 포함하도록 수정)
export async function getPost(postId , increaseView = true) {
  try {
    const cookieStore = await cookies(); // <-- cookies 임포트를 사용
    // 비회원 식별자를 가져옵니다.
    const connectionId = cookieStore.get("connection_id")?.value || null; 

    
    const postParse = parseInt(postId, 10);
    // getPostById 함수를 수정하여 connectionId를 전달합니다. (crud.js에 수정 예정)
    
    if (isNaN(postParse)) {
        return { success: false, error: "유효하지 않은 게시글 ID입니다." };
    }

    if (increaseView) {
        await incrementPostViews(postParse);
    }

    const post = await getPostById(postParse, connectionId); 
    
    if (post) {
      // getPostById는 이제 isLiked와 likeCount를 포함하여 반환합니다.
      return { success: true, post };
    } else {
      return { success: false, error: "게시글을 찾을 수 없습니다." };
    }
  } catch (error) {
    console.error("Get post error:", error);
    return { success: false, error: "서버 처리 중 오류가 발생했습니다." };
  }
}