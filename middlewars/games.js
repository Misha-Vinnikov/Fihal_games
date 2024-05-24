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

const checkIsVoteRequest = async (req, res, next) => {
if (Object.keys(req.body).length === 1 && req.body.users) {
  req.isVoteRequest = true;
}
next();
};

const checkEmptyFields = async (req, res, next) => {
  if (req.isVoteRequest) {
    next();
    return;
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    res.status(400).send({ message: "Заполните все поля" });
  } else {
    next();
  }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
  if (req.isVoteRequest) {
    next();
    return;
  }
  if (!req.body.categories || req.body.categories.length === 0) {
    res.headers = { "Content-Type": "application/json" };
    res.status(400).send({ message: "Выберите хотя бы одну категорию" });
  } else {
    next();
  }
};

const checkIfUsersAreSafe = async (req, res, next) => {
  if (!req.body.users) {
    next();
    return;
  }
  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res
      .status(400)
      .send({ message: "Нельзя добавить или удалить больше одного пользователя за раз" });
  }
};

const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title;
  });
  if (isInArray) {
    res.status(400).send({ message: "Игра с таким названием уже существует" });
  } else {
    next();
  }
};

module.exports = {findAllGames, createGame, findGameById, updateGame, deleteGame, checkIsVoteRequest, checkEmptyFields, checkIfCategoriesAvaliable, checkIfUsersAreSafe, checkIsGameExists };