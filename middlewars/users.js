const users = require("../models/user");
const bcrypt = require('bcrypt.js');

const findAllUsers = async (req, res, next) => {
    console.log('GET /users');
    req.usersArray = await user.find({});
    next();
}

const findUserById = async (req, res, next) => {
    console.log("GET /users/:id");
    try {
        req.user = await users.findById(req.params.id);
        next()
    } catch (err) {  
    res.status(404).send({message: 'User not found'})
    }
}

const checkEmptyNameAndEmail = async (req, res, next) => {
    if (!req.body.name || !req.body.email) {
        res.status(400).send({message: 'Введите имя и email'})
    } else {
        next();
    }
}

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({message: 'Введите имя,email и пароль'});
    } else {
        next();
    }
};

const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((user) => {
      return req.body.email === user.email;
    });
    if (isInArray) {
      res
        .status(400)
        .send({ message: "Пользователь с таким email уже существует" });
    } else {
      next();
    }
  };
  
const createUser = async (req, res, next) => {
    console.log("POST /users");
    try {
        console.log(req.body);
        req.user = await users.create(req.body);
        next();
    } catch (error) {
        res.status(400).send({message: 'Error creating user'})
    }
}

const updateUser = async (req, res, next) => { 
    console.log("PUT /users/:id");
    try {
    req.user = await users.findByIdAndUpdate(req. params.id, req. body); 
    next()
    } catch (err) {
    res.status(400).send({message: 'Error updating user'})
    }
}

const deleteUser = async (req, res, next) => {
    console.log("DELETE /users/:id");
    try {
      req.game = await games.findByIdAndDelete(req.params.id);
      next()
    } catch (error) {
      res.status(400).send({message: 'Error deleting user'})
    }
  };

  const hashPassword = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        next();
    } catch (error) {
        res.status(400).send({ message: "Ошибка хэширования пароля" });
    }
  }

module.exports = {
    findAllUsers, 
    findUserById, 
    createUser, 
    updateUser, 
    checkEmptyNameAndEmail, 
    deleteUser,
    checkEmptyNameAndEmail,
    checkEmptyNameAndEmailAndPassword,
    hashPassword
};
