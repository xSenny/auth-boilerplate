"use server";
import { lucia } from "@/lib/auth";
import db from "@/lib/database";
import { EmailVerification } from "@/lib/database/models/email-verification.model";
import { User } from "@/lib/database/models/user.model";
import { getVerificationTokenByToken } from "@/utils/data/verificationToken";
import { cookies } from "next/headers";
import { getUserByEmail } from '@/utils/data/user';

export const newVerification = async (token: string) => {
  //   get the verification token by the token from db
  const existingToken = await getVerificationTokenByToken(token);

  //   if the token does not exist, return an error
  if (!existingToken) {
    return { error: "Token does not exists!" };
  }

  //   check if existing token is expired
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  //get the existing user by email
  const existingUser = await getUserByEmail(existingToken.email);

  //   if the user does not exist, return an error
  if (!existingUser) {
    return { error: "Email does not exists" };
  }

  //   if the user exists, update the user emailVerified field to the current date
  await User.updateOne({ email: existingToken.email }, { emailVerified: true });

  //   delete the verification token from the db
  await EmailVerification.findByIdAndDelete(existingToken._id);

  const session = await lucia.createSession(existingUser._id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return { success: "Email verified!" };
};
