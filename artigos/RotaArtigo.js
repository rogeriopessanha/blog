const express =  require('express')
const router = express.Router()
const Categoria = require('../categorias/Categoria')
const Artigo = require('./Artigo')
const slugfy = require('slugify')

router.get ('/admin/artigo', (req, res) => {
    Artigo.findAll({
        include: [{model: Categoria}]
    })
    .then(artigo => {
        res.render('admin/artigo/index', {artigo: artigo})
    })
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

router.post('/artigo/delete', (req, res) => {
    var id = req.body.id

    if (id != undefined) {
        if (!isNaN(id)) {

            Artigo.destroy({
                where: {
                    id: id
                }
            }).then(() =>{
                res.redirect('/admin/artigo')
            })
            
        }else{ // se o id não for um numero
            res.redirect('/admin/artigo')
        }
    }else{ // se o id for null
        res.redirect('/admin/artigo')
    }
})

module.exports = router