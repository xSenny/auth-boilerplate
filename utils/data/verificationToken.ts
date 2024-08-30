import db from "@/lib/database";
import { EmailVerification } from "@/lib/database/models/email-verification.model";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await EmailVerification.findOne({
      email,
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await EmailVerification.findOne({
      token,
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
