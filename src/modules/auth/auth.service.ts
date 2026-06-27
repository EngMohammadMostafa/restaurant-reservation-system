import { LoginInput } from './auth.schema';
import { AppError } from '../../shared/utils/app-error';
import { generateToken } from '../../shared/utils/generate-token';

export class AuthService {
  public async loginAdmin(input: LoginInput): Promise<{ token: string }> {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // التحقق من تطابق البيانات مع ملف الـ .env
    if (input.username !== adminUsername || input.password !== adminPassword) {
      throw new AppError('Invalid username or password', 401);
    }

    // توليد التوكن
    const token = generateToken({ username: input.username });

    return { token };
  }
}