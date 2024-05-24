const games = require("../models/game")

const findAllGames = async (req, res, next) => {
    console.log('GET /games');
    req.gamesArray = await games.find({})
      .populate('categoties')
      .populate({
        path: 'users',
        select: '-password'
      });
    next();
}

const findGameById = async (req, res, next) => {
  try {
  req.game = await games.findById(req.params.id)
    .populate('categoties')
    .populate({
      path: 'users',
      select: '-password'
    });
  next();
  } catch (err) {
    res.status(404).send({message: 'Game not found'})
  }
}

const createGame = async (req, res, next) => {
    try {
        req.game = await games.create(req.body);
        next();
    } catch (err) {
        res.status(400).send({message: 'Error creating game'})
    }
}

const updateGame = async (req, res, next) => {
  try {
    req.game = await game.findByIdAndUpdate(req.params.id, req.body);
    next()
  } catch (err) {
    res.status(400).send({message: 'Error updating game'})
  }
}

const deleteGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndDelete(req.params.id);
    next()
  } catch (err) {
    res.status(400).send({message: 'Error deleting game'})
  }
}

module.exports = {findAllGames, createGame, findGameById, updateGame, deleteGame};