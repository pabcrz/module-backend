const createError = require("http-errors");
const Koders = require("../models/koders.model");
const encrypt = require("../lib/encrypt");

async function create(koderData) {
  // validacion para verificar que no se duplique el correo
  // se usa la notacion de consulta de mongo
  const koderFound = await Koders.findOne({ email: koderData.email });
  // $OR: [{email: koderData.email}, {firstName: koderData.firstName},]
  if (koderFound) {
    throw new createError(409, "Email already in use");
  }

  koderData.password = await encrypt.encrypt(koderData.password);

  const newKoder = await Koders.create(koderData);
  return newKoder;
}

async function getAll() {
  const allKoders = await Koders.find().populate("generation");
  return allKoders;
}

async function getById(id) {
  const koder = await Koders.findById(id).populate("generation");
  return koder;
}

async function deleteById(id) {
  const koderDeleted = await Koders.findByIdAndDelete(id);
  return koderDeleted;
}

async function updateById(id, newKoderData) {
  // para que regrese el koder despues de actualizarse se usa {new: true}
  const updateKoder = await Koders.findByIdAndUpdate(id, newKoderData, {
    new: true,
  });
  return updateKoder;
}

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
