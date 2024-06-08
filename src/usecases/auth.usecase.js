const createError = require("http-errors");

const Koders = require("../models/koders.model");
const Mentors = require("../models/mentors.model");
const encrypt = require("../lib/encrypt");
const jwt = require("../lib/jwt");

async function loginKoder(email, password) {
  const koder = await Koders.findOne({ email: email });

  if (!koder) {
    throw createError(401, "Invalid data");
  }

  const isPasswordValid = await encrypt.compare(password, koder.password);

  if (!isPasswordValid) {
    throw createError(401, "Invalid data");
  }

  const token = jwt.sign({ id: koder._id });
  return token;
}

async function loginMentor(email, password) {
  const mentor = await Mentors.findOne({ email: email });

  if (!mentor) throw createError(401, "Invalid data");

  const isPasswordValid = await encrypt.compare(password, mentor.password);

  if (!isPasswordValid) throw createError(401, "Invalid data");

  const token = jwt.sign({ id: mentor._id });
  return token;
}

module.exports = {
  loginKoder,
  loginMentor,
};
