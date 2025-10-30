import { NextResponse } from "next/server";
import { DEV_QUOTES } from "root/src/app/api/LogicNotFound404/random/dev-quotes";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function GET() {
  const q = pickRandom(DEV_QUOTES);
  return NextResponse.json({
    quote: q,
    at: new Date().toISOString(),
  });
}