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
app.use(express.urlencoded({ extended: true }))
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

//renderiza na tela principal
app.get('/', (req, res) => {
    Artigo.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 2 //limite de artigos na tela principal
    })
        .then(artigo_home => {

            Categoria.findAll()
                .then(categoria_home => {
                    res.render('app', { artigos: artigo_home, categoria: categoria_home })
                })

        })
})


//renderiza o slug
app.get('/:slug', (req, res) => {
    var slug = req.params.slug
    Artigo.findOne({
        where: {
            slug: slug
        }
    })
        .then(artigo => {
            if (artigo != undefined) {
                Categoria.findAll()
                    .then(categoria => {
                        res.render('artigo', { artigo: artigo, categoria: categoria })
                    })
            } else {
                res.redirect('/')
            }
        })
        .catch(error => {
            res.redirect('/')
        })
})

app.get('/categoria/:slug', (req, res) => {
    var slug = req.params.slug
    Categoria.findOne({
        where: {
            slug: slug
        },
        include: [{model: Artigo}]
    })
    .then(categoria => {
        if (categoria != undefined) {
            Categoria.findAll().then(categorias => {
                res.render('app', {artigos: categoria.artigos, categoria: categorias})
            })
        }else{
            res.redirect('/')
        }
    })
    .catch(error => {
        res.redirect('/')
    })
})

app.listen(process.env.PORT, () => {
    console.log(`App rodando ${process.env.PORT}`)
})