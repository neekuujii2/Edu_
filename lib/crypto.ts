import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateOtp(): string {
  return Math.random().toString(10).substring(2, 8);
}

export function isOtpValid(expiresAt: Date): boolean {
  return new Date() < new Date(expiresAt);
}
