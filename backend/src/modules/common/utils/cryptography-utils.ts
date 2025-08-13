import * as bcrypt from 'bcrypt';

export class CryptographyUtils {
  static async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }

  static async generateHash(plaintext: string, salt: string): Promise<string> {
    return await bcrypt.hash(plaintext, salt);
  }

  static async validateHash(
    plaintext: string,
    hash: string,
    salt: string,
  ): Promise<boolean> {
    const generatedHash: string = await bcrypt.hash(plaintext, salt);
    return generatedHash === hash;
  }
}
