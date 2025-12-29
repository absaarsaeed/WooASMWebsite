const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ detail: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get user from database
    const user = await req.db.collection('users').findOne(
      { id: decoded.user_id },
      { projection: { password_hash: 0, _id: 0 } }
    );
    
    if (!user) {
      return res.status(401).json({ detail: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ detail: 'Invalid or expired token' });
  }
};

const authenticateAdmin = (req, res, next) => {
  const adminToken = req.headers['x-admin-token'];
  
  if (!adminToken) {
    return res.status(401).json({ detail: 'Admin token required' });
  }
  
  try {
    const decoded = jwt.verify(adminToken, JWT_SECRET);
    
    if (decoded.type !== 'admin') {
      return res.status(403).json({ detail: 'Invalid admin token' });
    }
    
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ detail: 'Invalid or expired admin token' });
  }
};

module.exports = { authenticateToken, authenticateAdmin, JWT_SECRET };
