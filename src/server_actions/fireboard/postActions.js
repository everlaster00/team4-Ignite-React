// server_actions/fireboard/postActions.js

"use server";

import * as bcrypt from "bcrypt";
import { headers } from "next/headers";
import { createPostInDB, getPostById } from "./maindb/posts/crud";

function getClientIp(headersList) {
  // 오빠야가 전에 만든 IP 추출 로직 그대로 사용!
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

// 게시글 조회
export async function getPost(postId) {
  try {
    const postParse = parseInt(postId, 10);
    const post = await getPostById(postParse);
    console.log("db에서 가져온 포스트:", post);
    if (post) {
      return { success: true, post };
    } else {
      return { success: false, error: "게시글을 찾을 수 없습니다." };
    }
  } catch (error) {
    console.error("Get post error:", error);
    return { success: false, error: "서버 처리 중 오류가 발생했습니다." };
  }
}
