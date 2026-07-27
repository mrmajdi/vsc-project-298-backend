// @vsc repo:vsc-project-298-backend file:src/middleware/errorHandler.ts task:b14-src-middleware-errorhandler-ts module:backend session:298
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const isDevelopment = process.env.NODE_ENV === 'development';

export default function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
): void {
	if (isDevelopment) {
		console.error(err);
	}

	res.setHeader('Content-Type', 'application/json');

	if (err instanceof ZodError) {
		const formatted = err.errors.map((e) => e.message);
		return res.status(400).json({
			error: 'خطای اعتبارسنجی',
			details: formatted,
		});
	}

	if (typeof err.status === 'number' && err.status >= 400 && err.status < 600) {
		return res.status(err.status).json({ error: err.message });
	}

	if (isDevelopment) {
		return res.status(500).json({
			error:
				err.message ?? 'خطای سرور داخلی',
			stack: err.stack,
		});
	}

	return res.status(500).json({ error: 'خطای سرور داخلی' });
}
