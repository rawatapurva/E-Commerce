const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('authorization') || req.header('x-auth-token');
  if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user._id }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
