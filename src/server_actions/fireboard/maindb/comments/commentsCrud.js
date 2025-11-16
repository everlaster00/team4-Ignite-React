// src/server_actions/fireboard/maindb/comments/commentsCrud.js

import { prismaMain } from "@/lib/prismaMain";
import * as bcrypt from "bcrypt";

// ------------------------------------------------------------------
// 땔감 (Comment) CRUD
// ------------------------------------------------------------------

/**
 * 새로운 땔감을 DB에 생성합니다. (CREATE)
 * @param {object} data - { postId, content, anonym, anonyPass (Hashed), clientIp, anonymId }
 */
export async function createCommentInDB(data) {
  try {
    const comment = await prismaMain.comment.create({
      data: {
        postId: data.postId,
        content: data.content,
        anonym: data.anonym,
        anonyPass: data.anonyPass, // 해시된 비밀번호
        clientIp: data.clientIp,
        // ❌ [롤백] 댓글 작성자의 connection ID (anonymId)를 저장하는 로직 제거.
        // Comment 모델의 수정/삭제 권한은 anonyPass만 사용하기 때문입니다.
        // anonymId: data.anonymId, 
      },
      select: {
        id: true,
        content: true,
        anonym: true,
        createdAt: true,
        clientIp: true,
      },
    });
    return { success: true, comment };
  } catch (error) {
    console.error("DB Comment Creation Error:", error);
    return { success: false, error: "댓글 생성 중 DB 오류" };
  }
}

/**
 * 특정 게시글의 땔감 목록을 조회합니다. (READ)
 * @param {number} postId - 게시글 ID
 * @param {string | null} connectionId - 현재 사용자의 Connection ID (좋아요 상태 확인용)
 */
export async function getCommentsByPostId(postId, connectionId) {
  // 최신 댓글이 아래로 오도록 createdAt: 'asc' 정렬 (일반적인 댓글 UI)
  const comments = await prismaMain.comment.findMany({
    where: { postId: postId },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      content: true,
      anonym: true,
      clientIp: true,
      createdAt: true,
      // ✅ [유지] 좋아요 개수 (_count)를 함께 조회
      _count: {
        select: {
          likes: true,
        },
      },
      // ✅ [유지] 현재 사용자의 좋아요 상태를 조회 (isLiked 계산용)
      likes: connectionId
        ? {
            where: {
              anonymId: connectionId,
            },
            select: {
              id: true, // 존재 여부만 확인하기 위해 최소 필드 선택
            },
          }
        : false, // connectionId가 없으면 좋아요 기록을 조회할 필요 없음
      // anonyPass, updateAt 등은 보안을 위해 제외
    },
  });

  // 좋아요 카운트와 isLiked 상태를 플랫하게 만들어서 반환
  return comments.map((comment) => {
    // ✅ [유지] isLiked 상태 계산: likes 배열에 요소가 있으면 true
    const isLiked = connectionId
      ? comment.likes && comment.likes.length > 0
      : false;

    return {
      ...comment,
      likeCount: comment._count.likes,
      isLiked: isLiked, // isLiked 상태 추가
      _count: undefined, // 불필요한 필드 제거
      likes: undefined, // 좋아요 기록 객체 제거 (보안)
    };
  });
}

/**
 * 땔감 삭제 전, 비밀번호를 검증합니다. (VALIDATE)
 * @param {number} commentId - 땔감 ID
 * @param {string} anonyPass - 사용자가 입력한 평문 비밀번호
 */
export async function verifyCommentPassword(commentId, anonyPass) {
  const comment = await prismaMain.comment.findUnique({
    where: { id: commentId },
    select: { anonyPass: true },
  });

  if (!comment || !comment.anonyPass) {
    return { success: false, error: "해당 땔감을 찾을 수 없습니다." };
  }

  // bcrypt로 저장된 해시 비밀번호와 입력된 비밀번호 비교
  const isValid = await bcrypt.compare(anonyPass, comment.anonyPass);

  if (!isValid) {
    return { success: false, error: "비밀번호가 일치하지 않습니다." };
  }

  return { success: true };
}

/**
 * 땔감을 DB에서 삭제합니다. (DELETE)
 * @param {number} commentId - 땔감 ID
 */
export async function deleteCommentInDB(commentId) {
  try {
    await prismaMain.comment.delete({
      where: { id: commentId },
    });
    return { success: true };
  } catch (error) {
    console.error("DB Comment Deletion Error:", error);
    return { success: false, error: "댓글 삭제 중 DB 오류" };
  }
}

// ------------------------------------------------------------------
// 좋아요 CRUD 로직 (CommentLike 토글용) (신규 추가)
// ------------------------------------------------------------------

/**
 * 헬퍼 함수: 특정 댓글의 현재 좋아요 카운트를 계산하여 반환합니다.
 * @param {number} commentId - 댓글 ID
 * @returns {number} 좋아요 개수
 */
async function getCurrentCommentLikeCount(commentId) {
  return prismaMain.commentLike.count({
    where: { commentId: commentId },
  });
}

/**
 * 특정 댓글에 대해 비회원 식별자(connectionId)로 좋아요 상태를 조회합니다.
 * @param {number} commentId - 댓글 ID
 * @param {string} connectionId - Connection ID (비회원 식별자)
 * @returns {object | null} 좋아요 기록 객체 또는 null
 */
export async function getCommentLikeStatus(commentId, connectionId) {
  const like = await prismaMain.commentLike.findUnique({
    where: {
      // 복합 유니크 키를 사용합니다.
      commentId_anonymId: {
        commentId: commentId,
        anonymId: connectionId, // Connection ID를 anonymId로 사용
      },
    },
  });
  return like;
}

/**
 * 댓글 좋아요 기록을 생성하고, 새 카운트를 반환합니다. (CREATE LIKE)
 * @param {object} data - { commentId, anonymId }
 * @returns {object} { success: boolean, newCount: number, error?: string }
 */
export async function createCommentLikeInDB(data) {
  try {
    await prismaMain.commentLike.create({
      data: data,
    });

    // 새 좋아요 카운트를 조회해서 반환
    const newCount = await getCurrentCommentLikeCount(data.commentId);
    return { success: true, newCount };
  } catch (error) {
    // P2002: Unique constraint violation (중복 좋아요) 처리
    if (error.code === "P2002") {
      console.warn(`[CommentLike] 중복 좋아요 시도: 댓글 ID ${data.commentId}`);
      // 이 경우, 기존 카운트를 반환하여 UI 롤백 방지
      const newCount = await getCurrentCommentLikeCount(data.commentId);
      return { success: false, error: "이미 좋아요를 누르셨습니다.", newCount };
    }
    console.error("DB Comment Like Creation Error:", error);
    return { success: false, error: "좋아요 기록 중 DB 오류", newCount: 0 };
  }
}

/**
 * 댓글 좋아요 기록을 삭제하고, 새 카운트를 반환합니다. (DELETE LIKE)
 * @param {number} commentId - 댓글 ID
 * @param {string} connectionId - Connection ID (비회원 식별자)
 * @returns {object} { success: boolean, newCount: number, error?: string }
 */
export async function deleteCommentLikeInDB(commentId, connectionId) {
  try {
    // 복합 유니크 키를 사용하여 정확하게 한 건만 삭제
    await prismaMain.commentLike.delete({
      where: {
        commentId_anonymId: {
          commentId: commentId,
          anonymId: connectionId,
        },
      },
    });

    // 새 좋아요 카운트를 조회해서 반환
    const newCount = await getCurrentCommentLikeCount(commentId);
    return { success: true, newCount };
  } catch (error) {
    // P2025: Record to delete does not exist (삭제할 기록이 없음) 처리
    if (error.code === "P2025") {
      console.warn(`[CommentLike] 좋아요 삭제 기록 없음: 댓글 ID ${commentId}`);
      const newCount = await getCurrentCommentLikeCount(commentId);
      return {
        success: false,
        error: "좋아요 기록이 존재하지 않습니다.",
        newCount,
      };
    }
    console.error("DB Comment Like Deletion Error:", error);
    return { success: false, error: "좋아요 삭제 중 DB 오류", newCount: 0 };
  }
}