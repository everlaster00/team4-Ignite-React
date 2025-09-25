import { updateProfile } from '../actions/profile-actions';

export default function ProfilePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">프로필 설정</h1>

      <form action={updateProfile} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-2">프로필 사진</label>
          <input name="avatar" type="file" accept="image/*" className="w-full" />
          <p className="text-sm text-gray-500 mt-1">최대 5MB, JPG/PNG 형식</p>
        </div>

        <div>
          <label className="block mb-2">이름</label>
          <input name="name" type="text" required className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="block mb-2">자기소개</label>
          <textarea
            name="bio"
            rows="3"
            className="w-full px-3 py-2 border rounded"
            placeholder="간단한 자기소개를 작성해주세요"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          프로필 업데이트
        </button>
      </form>
    </div>
  );
}
