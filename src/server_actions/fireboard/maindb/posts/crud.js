// src/app/api/fireboard/posts/crud.js

import { prismaMain } from "@/lib/prismaMain";

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

// 게시글 읽기

export async function getPostById(postId) {
    const post = await prismaMain.post.findUnique({
        where: { id: postId },
        omit: {
            anonyPass: false,
        },
    });
    return post;
}