const Sequelize = require('sequelize')
const connection = require('../database/db')
const Categoria = require('../categorias/Categoria')

const Artigo = connection.define('artigos', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//1 para N
Categoria.hasMany(Artigo) //Uma categoria tem muitos artigos

//1 para 1
Artigo.belongsTo(Categoria) //Um artigo pertence a uma categoria

// Artigo.sync({force: true})

module.exports = Artigo