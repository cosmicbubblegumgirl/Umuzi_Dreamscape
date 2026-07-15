import { cookies } from "next/headers";
import {
  createSession,
  deleteSession,
  getUserBySessionToken,
  type UserRecord,
} from "./database";

const sessionCookie = "dreamscape_session";

export async function currentUser(): Promise<UserRecord | null> {
  const cookieStore = await cookies();
  return getUserBySessionToken(cookieStore.get(sessionCookie)?.value);
}

export async function signInUser(userId: string) {
  const { token, expires } = createSession(userId);
  const cookieStore = await cookies();

  cookieStore.set(sessionCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function signOutUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie)?.value;
  deleteSession(token);
  cookieStore.delete(sessionCookie);
}
