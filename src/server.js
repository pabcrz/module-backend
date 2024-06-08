const cors = require("cors"); // para poder hacer peticiones a otros servidores
const express = require("express");

const kodersRouter = require("./routes/koders.router");
const authRouter = require("./routes/auth.router");
const mentorsRouter = require("./routes/mentors.router");
const generationsRouter = require("./routes/generations.router");

const app = express(); // servidor

// middleware
app.use(cors());
app.use(express.json());

app.use("/koders", kodersRouter);
app.use("/mentors", mentorsRouter);
app.use("/auth", authRouter);
app.use("/generations", generationsRouter);

app.get("/", (request, response) => {
  response.json({
    message: "Koders APIv1",
  });
});

module.exports = app;
