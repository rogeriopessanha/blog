require('dotenv').config();
const express = require('express')
const app = express()
const connection = require('./database/db')

const rotaCategoria = require('./categorias/RotaCategoria')
const rotaArtigos = require('./artigos/RotaArtigo')

const Artigo = require('./artigos/Artigo')
const Categoria = require('./categorias/Categoria')


const dotenv = require('dotenv')
dotenv.config()


//view engine
app.set('view engine', 'ejs')

//arquivos static
app.use(express.static('public'))


//body parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//database
connection.authenticate()
.then(() => {
    console.log('conectado com o banco de dados')
}).catch((error) => {
    console.log(error)
})

app.use('/', rotaCategoria)
app.use('/', rotaArtigos)

//renderiza na tela
app.get('/', (req, res) => {
    Artigo.findAll().then(artigo => {
        res.render('index', {artigo: artigo})
    })
})

app.listen(process.env.PORT, () => {
    console.log(`App rodando ${process.env.PORT}`)
})