import { NextResponse } from "next/server";
import { ServerClient } from "postmark";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getBaseUrl(request: Request) {
  const envUrl = process.env.APP_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  return new URL(request.url).origin;
}

function getPostmarkClient() {
  const apiKey = process.env.POSTMARK_API_KEY;
  if (!apiKey) {
    throw new Error("POSTMARK_API_KEY is not set.");
  }
  return new ServerClient(apiKey);
}

function isLocalRequest(request: Request) {
  try {
    const url = new URL(request.url);
    return url.hostname === "localhost" || url.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let payload: { email?: string } = {};

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const email = payload.email?.trim().toLowerCase();

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const existing = await prisma.waitlistEmail.findUnique({
    where: { email },
  });

  if (existing?.verifiedAt) {
    return NextResponse.json({
      message:
        "You are already confirmed and on the waitlist. Thanks for joining!",
    });
  }

  const verifyToken = crypto.randomBytes(24).toString("hex");
  const verifyTokenExpiresAt = new Date(Date.now() + TOKEN_TTL_MS);
  const isTestData = existing?.isTestData ?? isLocalRequest(request);

  await prisma.waitlistEmail.upsert({
    where: { email },
    update: {
      verifyToken,
      verifyTokenExpiresAt,
      isTestData,
    },
    create: {
      email,
      verifyToken,
      verifyTokenExpiresAt,
      isTestData,
    },
  });

  const confirmUrl = `${getBaseUrl(request)}/api/waitlist/confirm?token=${verifyToken}`;
  const fromEmail = process.env.POSTMARK_FROM_EMAIL;

  if (!fromEmail) {
    return NextResponse.json(
      {
        message:
          "We received your email. Confirmation is pending until email sending is configured.",
      },
      { status: 202 },
    );
  }

  const postmark = getPostmarkClient();

  await postmark.sendEmail({
    From: fromEmail,
    To: email,
    Subject: "Confirm your email for The Evergreen Series",
    TextBody: `Welcome to The Evergreen Series waitlist!\n\nPlease confirm your email to secure your spot:\n${confirmUrl}\n\nIf you did not request this, you can ignore this email.`,
    HtmlBody: `<p>Welcome to <strong>The Evergreen Series</strong> waitlist!</p><p>Please confirm your email to secure your spot:</p><p><a href="${confirmUrl}">Confirm your email</a></p><p>If you did not request this, you can ignore this email.</p>`,
    MessageStream: process.env.POSTMARK_MESSAGE_STREAM,
  });

  return NextResponse.json({
    message:
      "Thanks for signing up! Check your inbox for a confirmation link to verify your email address.",
  });
}
