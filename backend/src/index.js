const express = require("express");
const indexRouter = require("./v1/routes/routes"); // Importar las rutas de la API
const authenticateToken = require("./middleware/authMiddleware"); // Importar el middleware de autenticación
const app = express();

app.use(express.json());

// Middleware de autenticación global
app.use((req, res, next) => {
  // Excluye las rutas de autenticación
  if (req.path.startsWith("/api/v1/auth")) {
    return next();
  }
  // Aplica el middleware de autenticación en las demás rutas
  authenticateToken(req, res, next);
});

app.use("/api/v1", indexRouter); // Usar las rutas de la API con prefijo /api/v1

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

module.exports = app;
