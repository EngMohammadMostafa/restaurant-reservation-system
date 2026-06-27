export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // تعني أن الخطأ متوقع (مثل مدخلات خاطئة وليس خطأ في الكود نفسه)

    Error.captureStackTrace(this, this.constructor);
  }
}