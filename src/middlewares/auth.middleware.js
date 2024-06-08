const createError = require("http-errors");
const kodersUseCase = require("../usecases/koders.usecase");
const mentorsUseCase = require("../usecases/mentors.usecase");
const jwt = require("../lib/jwt");

async function authKoder(request, response, next) {
  try {
    const token = request.headers.authorization;

    if (!token) {
      throw createError(401, "JWT is required");
    }

    const payload = jwt.verify(token);

    const user = await kodersUseCase.getById(payload.id);

    // esto es lo que manda el middleware a los siguientes middlewares o endpoints
    request.user = user;
    next();
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
}

async function authMentor(request, response, next) {
  try {
    const token = request.headers.authorization;

    if (!token) {
      throw createError(401, "JWT is required");
    }

    const payload = jwt.verify(token);

    const user = await mentorsUseCase.getById(payload.id);

    // esto es lo que manda el middleware a los siguientes middlewares o endpoints
    request.user = user;
    next();
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = { authKoder, authMentor };
