import { NextResponse } from "next/server";
import { DEV_QUOTES } from "@/app/api/products/LogicNotFound404/random/dev-quotes";

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