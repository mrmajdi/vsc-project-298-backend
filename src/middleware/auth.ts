// @vsc repo:vsc-project-298-backend file:src/middleware/auth.ts task:b14-src-middleware-auth-ts module:backend session:298
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'توکن احراز هویت گم شده یا فرمت نامعتبر است' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'توکن احراز هویت گم شده یا فرمت نامعتبر است' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('JWT verification failed:', err);
    }
    return res.status(401).json({ error: 'توکن نامعتبر یا منقضی شده است' });
  }
};
