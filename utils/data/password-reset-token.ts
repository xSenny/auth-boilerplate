import db from "@/lib/database";
import { PasswordResetToken } from "@/lib/database/models/password-reset-token.model";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await PasswordResetToken.findOne({
      token,
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await await PasswordResetToken.findOne({
      email,
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
