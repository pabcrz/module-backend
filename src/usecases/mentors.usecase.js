const createError = require("http-errors");
const Mentors = require("../models/mentors.model");
const encrypt = require("../lib/encrypt");

async function create(mentorData) {
  const mentorFound = await Mentors.findOne({ email: mentorData.email });
  if (mentorFound) throw new createError(409, "Email alreay in use");

  mentorData.password = await encrypt.encrypt(mentorData.password);

  const newMentor = await Mentors.create(mentorData);
  return newMentor;
}

async function getAll() {
  const allMentors = await Mentors.find();
  return allMentors;
}

async function getById(id) {
  const mentor = await Mentors.findById(id);
  return mentor;
}

async function deleteById(id) {
  const mentorDeleted = await Mentors.findByIdAndDelete(id);
  return mentorDeleted;
}

async function updateById(id, newMentorData) {
  // para que regrese el mentor despues de actualizarse se usa {new: true}
  const mentorUpdated = await Mentors.findByIdAndUpdate(id, newMentorData, {
    new: true,
  });
  return mentorUpdated;
}

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
