const Sequelize = require('sequelize')
const connection = require('../database/db')

const Categoria = connection.define('categorias', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Categoria.sync({force: true})

module.exports = Categoria