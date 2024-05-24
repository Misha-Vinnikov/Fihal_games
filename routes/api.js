const authRouter = require('./auth');
const categoriesRouter = require('./categories');
const gamesRouter = require('./games');
const userRouter = require('./users');

const apiRouter = require('express').Router();

apiRouter.use('/api', gamesRouter);
apiRouter.use('/api', categoriesRouter);
apiRouter.use('/api', userRouter);
apiRouter.use('/api', authRouter);

module.exports = apiRouter;
