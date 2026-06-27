import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await authService.loginAdmin(req.body);
    
    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};