const express =  require('express')
const router = express.Router()
const Categoria = require('../categorias/Categoria')
const Artigo = require('./Artigo')
const slugfy = require('slugify')

router.get ('/admin/artigo', (req, res) => {
    res.send('ROTA DE ARTIGO')
})

router.get('/admin/artigo/novo', (req, res) => {
    Categoria.findAll()
    .then(categoria => {
        res.render('admin/artigo/novo', {categoria: categoria})
    })
})

router.post('/artigo/salvar', (req, res) => {
    var titulo = req.body.titulo
    var assunto = req.body.assunto
    var categoria = req.body.categoria

    Artigo.create({
        titulo: titulo,
        slug: slugfy(titulo),
        body: assunto,
        categoriaId: categoria 
    })
    .then(() => {
        res.redirect('/admin/artigo')
    })
})

module.exports = router