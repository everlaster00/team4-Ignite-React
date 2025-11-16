// src/app/api/fireboard/posts/crud.js

import { prismaMain } from "@/lib/prismaMain";

// ------------------------------------------------------------------
// 게시글 CRUD
// ------------------------------------------------------------------

/**
 * 게시글의 조회수를 1 증가시킵니다. (원자적 연산)
 * @param {number} postId - 게시글 ID
 */
export async function incrementPostViews(postId) {
    try {
        await prismaMain.post.update({
            where: { id: postId },
            data: {
                views: {
                    increment: 1, // 조회수를 1 증가시킴
                },
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Post view increment failed for ID:", postId, error);
        return { success: false, error: error.message };
    }
}

// 게시글 생성 (CREATE)
export async function createPostInDB(data) {
    const post = await prismaMain.post.create({
        data: {
            title: data.title,
            content: data.content,
            anonym: data.anonym,
            anonyPass: data.anonyPass,
            category: data.category,
            status: "PUBLISHED",
            clientIp: data.clientIp,
            views: 0,
        },
        select: {
            id: true,
        },
    });
    return post;
}

// 게시글 수정 (UPDATE - 임시)
export async function updatePostInDB(postId, data) {
    return { id: postId };
}

/**
 * 게시글 ID로 게시글을 조회하고, 좋아요 카운트 및 현재 사용자의 좋아요 상태를 포함합니다.
 * @param {number} postId - 게시글 ID
 * @param {string | null} connectionId - 현재 비회원 사용자(Connection) ID
 * @returns {object | null} 포스트 객체와 좋아요 정보를 포함한 객체
 */
export async function getPostById(postId, connectionId = null) {
    // 1. Post 및 전체 좋아요 카운트 조회
    const postData = await prismaMain.post.findUnique({
        where: { id: postId },
        // 보안을 위해 anonyPass는 명시적으로 선택하지 않고, 필요한 필드만 선택합니다.
        select: {
            id: true,
            title: true,
            content: true,
            anonym: true,
            clientIp: true,
            category: true,
            createdAt: true, 
            updateAt: true,
            views: true,
            _count: {
                select: {
                    likes: true, // PostLike의 총 개수
                    comments: true, // Comment의 총 개수
                }
            },
        },
    });

    if (!postData) {
        return null;
    }
    
    // 2. 현재 사용자의 좋아요 상태 확인 (connectionId가 있을 경우에만)
    let isLiked = false;
    if (connectionId) {
        const likeStatus = await prismaMain.postLike.findUnique({
            where: {
                postId_anonymId: {
                    postId: postId,
                    anonymId: connectionId,
                },
            },
        });
        isLiked = !!likeStatus;
    }
    
    // 3. 결과 반환 (객체 구조를 플랫하게 만듭니다.)
    return {
        ...postData,
        isLiked: isLiked,
        likeCount: postData._count.likes,
        commentCount: postData._count.comments,
        _count: undefined, // 불필요한 필드는 제거합니다.
    };
}


// ------------------------------------------------------------------
// 좋아요 CRUD 로직 (PostLike 토글용) (신규 추가)
// ------------------------------------------------------------------

// 좋아요 상태 조회 (서버 액션에서 호출됨)
export async function getPostLikeStatus(postId, connectionId) {
    // PostLike 모델의 복합 유니크 키 @@unique([postId, anonymId])를 사용하여 조회
    const like = await prismaMain.postLike.findUnique({
        where: {
            postId_anonymId: {
                postId: postId,
                anonymId: connectionId, // Connection ID를 anonymId로 사용
            },
        },
    });
    return like;
}

// 헬퍼 함수: 게시글의 좋아요 카운트를 계산하여 반환
async function updatePostLikeCount(postId) {
    const likeCount = await prismaMain.postLike.count({
        where: { postId: postId },
    });
    return likeCount;
}

// 좋아요 기록 생성
export async function createPostLikeInDB(data) {
    // data: { postId, anonymId }
    await prismaMain.postLike.create({
        data: data,
    });
    
    // 새 좋아요 카운트를 조회해서 반환
    const newCount = await updatePostLikeCount(data.postId);
    return { success: true, newCount };
}

// 좋아요 기록 삭제
export async function deletePostLikeInDB(postId, connectionId) {
    // 복합 유니크 키를 사용하여 정확하게 한 건만 삭제
    await prismaMain.postLike.delete({
        where: {
            postId_anonymId: {
                postId: postId,
                anonymId: connectionId,
            },
        },
    });
    
    // 새 좋아요 카운트를 조회해서 반환
    const newCount = await updatePostLikeCount(postId);
    return { success: true, newCount };
}