const express = require("express");
const generationUseCase = require("../usecases/generations.usecase");

const router = express.Router();

// GET /generations
router.get("/", async (request, response) => {
  try {
    const generations = await generationUseCase.getAll();
    response.json({
      success: true,
      data: { generations },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// GET /generations/:id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const generation = await generationUseCase.getById(id);
    response.json({
      success: true,
      data: { generation },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// POST /generations
router.post("/", async (request, response) => {
  try {
    const generationCreated = await generationUseCase.create(request.body);

    response.json({
      success: true,
      data: { generation: generationCreated },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// PATCH /generations/:id
router.patch("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const generationUpdated = await generationUseCase.updateById(
      id,
      request.body
    );

    response.json({
      success: true,
      data: { generation: generationUpdated },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE /generations/:id
router.delete("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const generationDeleted = generationUseCase.deleteById(id);

    response.json({
      success: true,
      data: { generation: generationDeleted },
    })
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
