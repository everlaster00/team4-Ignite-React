"use server";

import * as bcrypt from "bcrypt";
import { headers, cookies } from "next/headers";
import { revalidatePath } from "next/cache"; // 캐시 갱신을 위해 임포트

import {
  createCommentInDB,
  getCommentsByPostId,
  verifyCommentPassword, // 삭제 시 비밀번호 검증용
  deleteCommentInDB,
  getCommentLikeStatus, 
  createCommentLikeInDB,
  deleteCommentLikeInDB,
} from "./maindb/comments/commentsCrud";

// IP 추출 헬퍼 함수 (postActions.js에서 재활용)
function getClientIp(headersList) {
  return (
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    headersList.get("cf-connecting-ip") ||
    "0.0.0.0"
  );
}

// ------------------------------------------------------------------
// IP 마스킹 헬퍼 함수 (최소화 - 118.223. 형태로 축약)
// ------------------------------------------------------------------

/**
 * IP 주소의 앞 두 옥텟만 표시하고 나머지는 생략합니다. (예: 118.223.)
 * IPv6 로컬호스트 주소 (::1)는 그대로 반환합니다.
 * @param {string} ip - 클라이언트 IP 주소
 * @returns {string} 축약된 IP 주소
 */
function maskIp(ip) {
    if (!ip) return '0.0.0.0';
    
    // IPv6 로컬호스트 주소 (::1)는 그대로 반환합니다.
    if (ip === '::1') {
        return ip; 
    }
    
    // IPv4 주소 축약 로직: 앞 두 옥텟만 반환 + 마침표
    const parts = ip.split('.');
    
    if (parts.length === 4) {
        // 예: 118.223.100.50 -> 118.223.
        return `${parts[0]}.${parts[1]}.`;
    }
    
    // 그 외 형식은 원본 IP를 반환
    return ip;
}

// ------------------------------------------------------------------
// 땔감 (Comment) 액션
// ------------------------------------------------------------------

/**
 * 새로운 땔감 (댓글)을 던집니다. (CREATE)
 * @param {string} postId - 게시글 ID (문자열)
 * @param {FormData} formData - 폼 데이터
 * @returns {object} 결과 객체 { success: boolean, comment?: object, error?: string }
 */
export async function createComment(postId, formData) {
  const headersList = headers();
  const clientIp = getClientIp(headersList);

  const { content, anonym, anonyPass } = Object.fromEntries(formData.entries());

  const postParse = parseInt(postId, 10);

  if (isNaN(postParse)) {
    return { success: false, error: "유효하지 않은 게시글 ID입니다." };
  }

  if (!content || !anonym || !anonyPass) {
    return {
      success: false,
      error: "내용, 닉네임, 비밀번호를 모두 채워주세요!",
    };
  }

  const contentString = String(content).trim();
  const anonymString = String(anonym).trim();
  const anonyPassString = String(anonyPass).trim();

  // 최소 글자 수 조건을 2자로 유지합니다.
  if (contentString.length < 2 || contentString.length > 500) {
    return {
      success: false,
      error: "땔감 내용은 최소 2자, 최대 500자까지 작성할 수 있습니다.",
    };
  }

  try {
    // 1. 비밀번호 해싱 (Action Layer 책임)
    const hashedPassword = await bcrypt.hash(anonyPassString, 10);

    // 2. DB 데이터 준비
    const dbData = {
      postId: postParse,
      content: contentString,
      anonym: anonymString,
      anonyPass: hashedPassword,
      clientIp: clientIp,
    };

    // 3. DB에 땔감 생성
    const result = await createCommentInDB(dbData);

    if (result.success && result.comment) {
      // 4. 성공 시 해당 게시글 상세 페이지 캐시 갱신
      revalidatePath(`/fire_board/${postId}`);

      return {
        success: true,
        comment: result.comment,
      };
    } else {
      return { success: false, error: "땔감 던지기에 실패했습니다." };
    }
  } catch (error) {
    console.error("Comment creation error:", error);
    return { success: false, error: "서버 처리 중 오류가 발생했습니다." };
  }
}

/**
 * 특정 게시글의 땔감 (댓글) 목록을 조회합니다. (READ)
 * @param {string} postId - 게시글 ID (문자열)
 * @returns {object} 결과 객체 { success: boolean, comments: Array<object>, error?: string }
 */
export async function getComments(postId) {
  try {
    const postParse = parseInt(postId, 10);

    if (isNaN(postParse)) {
      return {
        success: false,
        comments: [],
        error: "유효하지 않은 게시글 ID입니다.",
      };
    }

    // ✅ [유지] connectionId (현재 사용자 식별자)는 좋아요 상태 확인용으로 쿠키에서 읽어옵니다.
    const cookieStore = await cookies();
    const connectionId = cookieStore.get("connection_id")?.value || null;

    // CRUD 함수를 통해 DB에서 땔감 목록 조회
    // ✅ [유지] connectionId를 DB 조회 함수에 전달합니다. (isLiked 상태 확인용)
    const comments = await getCommentsByPostId(postParse, connectionId);

    // 🚨 보안 주의: 클라이언트 IP 마스킹 (프론트 엔드에 전달하기 전)
    const maskedComments = comments.map((comment) => ({
      ...comment,
      // IP 마스킹 헬퍼 함수를 사용하여 '118.223.' 형태로 축약합니다.
      clientIp: maskIp(comment.clientIp),
    }));

    return { success: true, comments: maskedComments };
  } catch (error) {
    console.error("Get comments error:", error);
    return {
      success: false,
      comments: [],
      error: "땔감 목록 조회 중 오류가 발생했습니다.",
    };
  }
}

/**
 * 땔감 (댓글)을 삭제합니다. (DELETE)
 * @param {number} commentId - 땔감 ID
 * @param {FormData} formData - 폼 데이터 (비밀번호 포함)
 * @returns {object} 결과 객체 { success: boolean, error?: string }
 */
export async function deleteComment(commentId, formData) {
  const anonyPass = formData.get("anonyPass");

  if (!anonyPass) {
    return { success: false, error: "비밀번호를 입력해야 삭제할 수 있습니다." };
  }

  try {
    // 1. 비밀번호 검증
    const { success: isPasswordValid, error: verifyError } =
      await verifyCommentPassword(commentId, String(anonyPass));

    if (!isPasswordValid) {
      return { success: false, error: verifyError };
    }

    // 2. 비밀번호 확인 후 삭제
    const result = await deleteCommentInDB(commentId);

    if (result.success) {
      // 성공 시 게시글 상세 페이지 캐시 갱신은 클라이언트에서 `router.refresh()`로 처리하도록 유지
      return { success: true };
    } else {
      return { success: false, error: "땔감 치우기에 실패했습니다." };
    }
  } catch (error) {
    console.error("Comment deletion error:", error);
    return { success: false, error: "서버 처리 중 오류가 발생했습니다." };
  }
}


// ------------------------------------------------------------------
// ⭐ [신규 추가] 댓글 좋아요 액션 (TOGGLE)
// ------------------------------------------------------------------

/**
 * 댓글 좋아요 상태를 토글합니다. (비회원 전용)
 * @param {number} commentId - 댓글 ID (number)
 * @param {string} postId - 게시글 ID (string, 캐시 갱신용)
 * @returns {object} 결과 객체 { success: boolean, isLiked: boolean, likeCount: number, error?: string }
 */
export async function toggleCommentLike(commentId, postId) {

  try {
    const cookieStore = cookies();
    // 비회원 식별자(Connection ID)를 가져옵니다. (좋아요 로직에선 필수)
    const connectionId = cookieStore.get("connection_id")?.value || null;

    if (!connectionId) {
      // ✅ [유지] anonymId가 없으면 좋아요 거부 (유니크 제약 조건 논리 반영)
      return {
        success: false,
        error: "좋아요를 누르려면 식별자(Connection ID)가 필요합니다.",
        isLiked: false,
        likeCount: 0,
      };
    }
    
    const commentIdNumber = parseInt(commentId, 10);
    if (isNaN(commentIdNumber)) {
      return { success: false, error: "유효하지 않은 댓글 ID입니다.", isLiked: false, likeCount: 0, };
    }

    // 1. 현재 좋아요 상태 확인
    const existingLike = await getCommentLikeStatus(commentIdNumber, connectionId);

    let result;
    let newIsLiked;

    if (existingLike) {
      // 2-A. 좋아요가 있으면: 삭제 (좋아요 취소)
      result = await deleteCommentLikeInDB(commentIdNumber, connectionId);
      newIsLiked = false;
    } else {
      // 2-B. 좋아요가 없으면: 생성 (좋아요 누름)
      const data = {
        commentId: commentIdNumber,
        anonymId: connectionId,
      };
      result = await createCommentLikeInDB(data);
      newIsLiked = true;
    }

    // 3. 결과 반환 및 캐시 갱신
    if (result && result.newCount !== undefined) {
      // 댓글 목록이 포함된 게시글 상세 페이지의 캐시를 갱신합니다.
      revalidatePath(`/fire_board/${postId}`);

      return {
        success: true,
        isLiked: newIsLiked,
        likeCount: result.newCount,
      };
    } else {
      // 실패 시 (에러 메시지나 중복 좋아요 처리)
      return {
        success: false,
        error: result.error || "좋아요 처리 중 데이터 오류가 발생했습니다.",
        isLiked: !!existingLike, // 낙관적 업데이트 실패 시 롤백될 상태
        likeCount: result.newCount ?? 0, // 롤백될 카운트
      };
    }
  } catch (error) {
    console.error("Toggle Comment Like Error:", error);
    return {
      success: false,
      error: "서버 처리 중 오류가 발생했습니다.",
      isLiked: false,
      likeCount: 0,
    };
  }
}