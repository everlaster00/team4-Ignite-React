//src/lib/auth/connection.js
import { prismaMain } from "@/lib/prismaMain";

export async function createAnonymousConnection(id,ipAddress) {

  const newConnection = await prismaMain.cnnection.create({
    data: {
      id: id,
      ipAddress: ipAddress,
    }
  });

  return newConnection;
}

export async function findConnectionById(id) {

  const connection = await prismaMain.connection.findUnique({
    where: {
      id: id,
    }
  });

  return connection;
}