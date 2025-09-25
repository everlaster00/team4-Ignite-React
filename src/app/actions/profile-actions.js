'use server';

import fs from 'fs/promises';
import path from 'path';

export async function updateProfile(formData) {
  const name = formData.get('name');
  const bio = formData.get('bio');
  const avatar = formData.get('avatar');

  if (avatar && avatar.size > 0) {
    console.log('업로드된 파일: ', {
      name: avatar.name,
      size: avatar.size,
      type: avatar.type,
    });

    if (avatar.size > 20 * 1024 * 1024) {
      // 20MB
      console.log('파일은 최대 20MB까지 업로드할 수 있습니다.');
      return {
        error: '파일은 최대 20MB까지 업로드할 수 있습니다.',
      };
    }

    if (!avatar.type.startsWith('image/')) {
      console.log('이미지 파일만 업로드 가능합니다.');
      return {
        error: '파일은 최대 20MB까지 업로드할 수 있습니다.',
      };
    }

    // 실제로 여기서 파일을 저장
    // 1. 내 컴퓨터 스토리지 저장 (Vercel, Firebase 같은 플랫폼에서는 사용 불가능)
    // 2. AWS S3 같은 외부 스토리지 서비스 사용

    const filename = Date.now() + '_' + avatar.name;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const arrayBuffer = await avatar.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fullPath = path.join(uploadDir, filename);
    await fs.writeFile(fullPath, buffer);

    console.log('프로필 업데이트에 성공했습니다.');
    console.log('프로필 이미지 경로: ', `/uploads/${filename}`);
    return {
      success: true,
      message: '프로필 업데이트에 성공했습니다.',
    };
  }
}
