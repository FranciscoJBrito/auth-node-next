const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const accessToken = req.cookies['accessToken'];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken) return res.status(401).json({ message: 'Access token no proporcionado' });

  try {
    // Verifica el accessToken
    jwt.verify(accessToken, process.env.JWT_SECRET);
    next();
  } catch (err) {
    // Si el accessToken expiró, verifica el refreshToken
    if (err.name === "TokenExpiredError" && refreshToken) {
      try {
        const verifiedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);
        
        // Genera un nuevo accessToken
        const newAccessToken = jwt.sign(
          { id: verifiedRefresh.id, email: verifiedRefresh.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        // Envía el nuevo accessToken como cookie el cual reemplazara al anterior ya expirado
        res.cookie("accessToken", newAccessToken, {
          httpOnly: process.env.NODE_ENV === 'production' ? true : false
        });
        
        next();

      } catch (refreshError) {
        return res.status(403).json({ message: 'Refresh token inválido' });
      }
    } else {
      return res.status(403).json({ message: 'Access token inválido' });
    }
  }
};

module.exports = authenticateToken;
