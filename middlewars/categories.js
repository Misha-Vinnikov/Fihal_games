const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
    console.log('GET /games');
    req.gamesArray = await game.find({})
    next();
}

const findCategoryById = async (req, res, next) => {
    try {
        req.category = await categories.findById(req.params.id);
        next()
    } catch (err) {  
    res.status(404).send({message: 'Category not found'})
    }
}

const createCategory = async (req, res, next) => {
    try {
        req.category = await categories.create(req.body);
        next();
    } catch (err) {
        res.status(400).send({message: 'Error creating category'})
    }
}

const updateCategory = async (req, res, next) => { try {
    req. category = await categories.findByIdAndUpdate(req. params.id, req. body); next()
    }
    catch (err) {
    res.status(400).send({message: 'Error updating category'})
    }
}

const checkEmptyName = async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({message: 'Введите название категории'})
    } else {
        next();
    }
}

const deleteCategory = async (req, res, next) => {
    try {
      req.game = await games.findByIdAndDelete(req.params.id);
      next()
    } catch (err) {
      res.status(400).send({message: 'Error deleting category'})
    }
  }

module.exports = {findAllCategories, findCategoryById, createCategory, updateCategory, checkEmptyName, deleteCategory};