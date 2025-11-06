//src/app/api/auth/identify.js
import { prismaMain } from "@/lib/prismaMain";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secsecsecey-key-my';
const GUEST_COOKIE_NAME = 'auth_token_guest';

function issueNewToken(connectionId) {
  console.log("신규 토큰 발급 후 쿠키 갱신");
  const token = jwt.sign({ connectionId: connectionId }, JWT_SECRET, {
    expiresIn: '30m'
  });
  const response = NextResponse.json({ message: 'Identity established', connectionId: connectionId});
  
  response.cookies.set(GUEST_COOKIE_NAME, token, {
    httpOnly : true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
  return response;
}
  
const updateConnectionActivity = async ( connectionId ) => {
  console.log("db조회 시도")
  await prismaMain.connection.update({
    where: { id: connectionId },
    data: {}    //조회가 아닌 업데이트 형식으로 하여 updateAt이 갱신되도록
  });;
}

export async function GET( request ) {
  console.log("검문소 GET 실행")
  const token = request.cookies.get(GUEST_COOKIE_NAME)?.value;

  let connectionId = null;

  if (token) {
    try {
      const decoded = jwt.verify(token,JWT_SECRET);
      connectionId = decoded.connectionId;

      const existingConnection = await prismaMain.connection.findUnique({
        where: {id: connectionId}
      });

      if (existingConnection) {
        await updateConnectionActivity(connectionId);

        return issueNewToken(connectionId);
      }

      connectionId = null;

    } catch (error) {
      console.error("jwt 검증 실패:token",token,error);
    }
  }

  const ipAddress = request.headers.get('x-forwarded-for') || request.ip || '0.0.0.0';

let newConnectionId;

    try {
        await prismaMain.$transaction(async (tx) => {
            const connectionId = uuidv4(); 
            
            await tx.connection.create({
                data: {
                    id: connectionId,
                    ipAddress: ipAddress,
                },
            });
            
            newConnectionId = connectionId; 
        });

        if (newConnectionId) {

          return issueNewToken(newConnectionId);

        } 
        
        throw new Error("Transaction completed but ID not set.");

    } catch (error) {
        console.error("Connection 등록 최종 실패:", ipAddress, error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    };
};

