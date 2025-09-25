export default function ContactPage() {
  async function handleSubmit(formData) {
    'use server';

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    console.log('서버에서 받은 데이터', {
      name,
      email,
      message,
    });
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">문의하기</h1>

      <form action={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="name" className="block mb-2">
            이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2">
            메시지
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          전송하기
        </button>
      </form>
    </div>
  );
}
