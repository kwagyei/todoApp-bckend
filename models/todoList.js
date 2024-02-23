module.exports = (sequelize, DataTypes) => {

    const todoList = sequelize.define("todoList", {

        todoTask: {
            type: DataTypes.STRING,
            allowNull: false
        },

        todoDate: {
            type: DataTypes.STRING,
            allowNull: false
        },

    })
    return todoList

}