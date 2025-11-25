import jwt from 'jsonwebtoken';

// Middleware to verify Authorization: Bearer <token>
export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  try {
    // Verify token and attach decoded payload to req.user
    const decoded = jwt.verify(token, secret, { clockTolerance: 60 });
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
