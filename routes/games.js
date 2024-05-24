const gamesRouter = require('express').Router();

const { 
    findAllGames, 
    checkIsGameExists,
    checkIfCategoriesAvaliable,
    findGameById,
    createGame,
    checkIfUsersAreSafe,
    updateGame, 
    deleteGame,
    checkEmptyFields
} = require('../middlewars/games');
const { 
    sendAllGames,
    sendGameById,
    sendGameCreated, 
    sendGameUpdated, 
    sendGameDeleted
} = require('../controllers/games');
const { checkAuth } = require('../middlewars/auth');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.post(
    '/games',
    findAllGames,
    checkIsGameExists,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    checkAuth,
    createGame, 
    sendGameCreated
);
gamesRouter.get("/games/:id", findGameById,
    sendGameById);
gamesRouter.put(
    "/games/:id",
    findGameById,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    updateGame, 
    sendGameUpdated);
gamesRouter.delete('/games/:id', deleteGame, sendGameDeleted);

module.exports = gamesRouter;