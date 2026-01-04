import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CONFIRM_SUCCESS_PATH = "/?confirmed=1";
const CONFIRM_EXPIRED_PATH = "/?confirmed=0&reason=expired";
const CONFIRM_INVALID_PATH = "/?confirmed=0&reason=invalid";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL(CONFIRM_INVALID_PATH, url.origin));
  }

  const entry = await prisma.waitlistEmail.findUnique({
    where: { verifyToken: token },
  });

  if (!entry) {
    return NextResponse.redirect(new URL(CONFIRM_INVALID_PATH, url.origin));
  }

  if (entry.verifyTokenExpiresAt && entry.verifyTokenExpiresAt < new Date()) {
    return NextResponse.redirect(new URL(CONFIRM_EXPIRED_PATH, url.origin));
  }

  await prisma.waitlistEmail.update({
    where: { id: entry.id },
    data: {
      verifiedAt: new Date(),
      verifyToken: null,
      verifyTokenExpiresAt: null,
    },
  });

  return NextResponse.redirect(new URL(CONFIRM_SUCCESS_PATH, url.origin));
}
