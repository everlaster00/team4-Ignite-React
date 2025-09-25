import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';

export async function POST(request) {
  const headersList = await headers();

  return NextResponse.json({
    authorization: headersList.get('authorization'),
  });
}
