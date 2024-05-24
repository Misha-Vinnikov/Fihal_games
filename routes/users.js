const userRouter = require('express').Router();

const {
    findAllUsers, 
    findUserById,
    createUser, 
    updateUser,
    deleteUser,
    checkIsUserExists,
    checkEmptyNameAndEmail,
    checkEmptyNameAndEmailAndPassword,
    hashPassword
 } = require('../middlewars/users');
const { 
    sendAllUsers,
    sendUserById,
    sendUserCreated, 
    sendUserUpdated, 
    sendUserDeleted
} = require('../controllers/users');

userRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.post(
    "/users",
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated
  );

userRouter.get("/users", findUserById, sendUserById);
userRouter.put(
    "/users/:id", 
    checkEmptyNameAndEmail,
    updateUser, 
    sendUserUpdated
);
userRouter.delete("/users/:id", deleteUser, sendUserDeleted);

module.exports = userRouter;
