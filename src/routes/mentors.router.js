const mentorsUseCases = require("../usecases/mentors.usecase");
const express = require("express");
const auth = require("../middlewares/auth.middleware");

const { authMentor } = auth;

const router = express.Router();

// Get /mentors
router.get("/", authMentor, async (request, response) => {
  try {
    const mentors = await mentorsUseCases.getAll();

    response.json({
      success: true,
      data: { mentors },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// Post /mentors
router.post("/", async (request, response) => {
  try {
    // mentorsUseCases.create() se le pasa la peticion del ususario, en este caso el nuevo mentor
    const mentorCreated = await mentorsUseCases.create(request.body);

    response.json({
      success: true,
      data: { mentor: mentorCreated },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// Get /mentors/:id
router.get("/:id", authMentor, async (request, response) => {
  try {
    const { id } = request.params;
    const mentor = await mentorsUseCases.getById(id);

    response.json({
      success: true,
      data: { mentor },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// Delete /mentors/:id
router.delete("/:id", authMentor, async (request, response) => {
  try {
    const { id } = request.params;
    const mentorDeleted = await mentorsUseCases.deleteById(id);

    response.json({
      success: true,
      data: { mentor: mentorDeleted },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// Patch /mentors/:id
router.patch("/:id", authMentor, async (request, response) => {
  try {
    const { id } = request.params;
    const mentorUpdated = await mentorsUseCases.updateById(id, request.body);

    response.json({
      success: true,
      data: { mentor: mentorUpdated },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
