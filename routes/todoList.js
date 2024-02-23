const express = require('express');
const router = express.Router();
const { todoList } = require("../models");


//SENDS TODO LIST FROM DB TO FRONTEND
router.get("/", async(req, res) => {
    const listOfTodos = await todoList.findAll(); //this is a sequelize function
    res.json(listOfTodos);
});

//ACCEPTS TODO ITEM FROM FRONTEND
router.post("/", async(req, res) => {

    const todoItem = req.body;
    await todoList.create(todoItem); // this is also a seqeulize function
    res.json(todoItem);

})

//DELETES A TODO ITEM
router.delete("/:id", async(req, res) => {
    const itemId = req.params.id;

    // Check if the todo item exists
    const existingTodo = await todoList.findByPk(itemId);

    if (!existingTodo) {
        return res.status(404).json({ error: 'Todo item not found' });
    }

    // Delete the todo item
    await todoList.destroy({ where: { id: itemId } });

    res.json(existingTodo);

});

//REPLACES A TODO ITEM WITH ANOTHER
router.put("/replace/:id", async(req, res) => {
    const itemId = req.params.id;
    const newItem = req.body; // Assuming the new item is sent in the request body

    const deletedTodo = await todoList.findByPk(itemId);


    if (!deletedTodo) {
        return res.status(404).json({ error: 'Todo item not found' });
    }

    // Delete the todo item
    await todoList.destroy({ where: { id: itemId } });

    await todoList.create(newItem);

    res.json(deletedTodo);
});


module.exports = router