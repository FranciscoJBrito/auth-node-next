const {
  registerUserService,
  loginUserService,
} = require("../services/authService");
const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    res
      .status(201)
      .json({ message: "Usuario registrado con éxito", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registrando el usuario", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await loginUserService(req.body);
    res
      .cookie("refreshToken", token.refreshToken, {
        httpOnly: token.HttpOnlyMode,
      })
      .cookie("accessToken", token.accessToken, {
        httpOnly: token.HttpOnlyMode,
      })
      .status(200)
      .json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error iniciando sesión", error: error.message });
  }
});

module.exports = router;
