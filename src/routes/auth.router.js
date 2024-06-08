const express = require("express");
const authUseCase = require("../usecases/auth.usecase");
const router = express.Router();

// POST /auth/login
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await authUseCase.loginKoder(email, password);

    response.json({
      succes: true,
      data: { token },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      error: error.message,
    });
  }
});

router.post("/loginMentor", async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await authUseCase.loginMentor(email, password);

    response.json({
      succes: true,
      data: { token },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      error: error.message,
    });
  }
});

module.exports = router;
