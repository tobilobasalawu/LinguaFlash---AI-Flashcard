import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccountDetails = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT
  );

  if (!serviceAccountDetails.project_id) {
    throw new Error("Error: Missing Firebase service account credentials");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountDetails),
  });
}

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let event;

  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const { id } = event.data;
  const eventType = event.type;

  if (eventType === "user.deleted") {
    admin
      .auth()
      .deleteUser(id)
      .catch((error) => console.error("Error deleting user:", error));
  }

  return new NextResponse("Webhook received", { status: 200 });
}
