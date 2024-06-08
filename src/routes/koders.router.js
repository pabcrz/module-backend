const kodersUseCase = require("../usecases/koders.usecase");
const express = require("express");
const auth = require("../middlewares/auth.middleware");

const { authKoder } = auth;

const router = express.Router();

// GET /koders
router.get("/", authKoder, async (request, response) => {
  try {
    const koders = await kodersUseCase.getAll();

    response.json({
      success: true,
      data: { koders },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// POST /koders
router.post("/", async (request, response) => {
  try {
    // KoderUseCase.create() se le pasa la peticion del ususario, en este caso el nuevo koder
    const koderCreated = await kodersUseCase.create(request.body);

    response.json({
      success: true,
      data: { koder: koderCreated },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// GET /koders/:id
router.get("/:id", authKoder, async (request, response) => {
  try {
    const id = request.params.id;
    const koder = await kodersUseCase.getById(id);

    response.json({
      success: true,
      data: { koder },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE /koders/:id
router.delete("/:id", authKoder, async (request, response) => {
  try {
    const { id } = request.params;
    const koderDeleted = await kodersUseCase.deleteById(id);

    response.json({
      success: true,
      data: { koder: koderDeleted },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// PATCH /koders/:id
router.patch("/:id", authKoder, async (request, response) => {
  try {
    const { id } = request.params;
    const koderUpdated = await kodersUseCase.updateById(id, request.body);

    response.json({
      success: true,
      data: { koder: koderUpdated },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      erorr: error.message,
    });
  }
});

module.exports = router;
