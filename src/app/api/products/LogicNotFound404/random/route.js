// src/app/api/products/LogicNotFound404/random/route.js
import { NextResponse } from "next/server";
import { DEV_QUOTES } from "./dev-quotes";

export const runtime = 'nodejs';            // ← 상위 Edge 전파 차단
export const dynamic = 'force-dynamic'; 

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function GET() {
  const pick = DEV_QUOTES[Math.floor(Math.random() * DEV_QUOTES.length)];
  return Response.json({ quote: pick, at: new Date().toISOString() });
}