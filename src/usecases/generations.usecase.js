const createError = require("http-errors");
const Generations = require("../models/generations.model");

async function create(generation) {
  const generationFound = await Generations.findOne({
    number: generation.number,
    program: generation.program,
  });

  if (generationFound) throw new createError(409, "Generation already exists");
  return Generations.create(generation);
}

const getAll = async () => await Generations.find();

const getById = async (id) => await Generations.findById(id);

const deleteById = async (id) => await Generations.findByIdAndDelete(id);

const updateById = async (id, newGenerationData) =>
  await Generations.findByIdAndUpdate(id, newGenerationData, { new: true });

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
