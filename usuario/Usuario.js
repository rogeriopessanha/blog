const Sequelize = require('sequelize')
const connection = require('../database/db')

const Usuario = connection.define('usuarios', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Usuario.sync({force: true})

module.exports = Usuario