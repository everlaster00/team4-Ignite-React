// src/lib/prismaIndex.js
import { prismaMain } from "./prismaMain";
import { prismaKM } from "./prismaKM";
import { prismaJH } from "./prismaJH";
import { prismaJW } from "./prismaJW";  
import { prismaPJH } from "./prismaPJH";
import { prismaNC } from "./prismaNC";

export const prismaIndex = {
  Main: prismaMain,
  KM: prismaKM,
  JH: prismaJH,
  JW: prismaJW,
  PJH: prismaPJH,
  NC: prismaNC,
};