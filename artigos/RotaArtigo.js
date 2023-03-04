const express =  require('express')
const router = express.Router()
const Categoria = require('../categorias/Categoria')
const Artigo = require('./Artigo')
const slugfy = require('slugify')
const adminAuth = require('../middleware/adminAuth')

router.get ('/admin/artigo', adminAuth, (req, res) => {
    Artigo.findAll({
        include: [{model: Categoria}],
        order: [['id', 'DESC']]
    })
    .then(artigo => {
        res.render('admin/artigo/index', {artigo: artigo})
    })
})

router.get('/admin/artigo/novo', adminAuth, (req, res) => {
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

router.get('/admin/artigo/editar/:id', adminAuth, (req, res) =>{
    var id = req.params.id
    Artigo.findByPk(id)
    .then(artigo => {
        if (artigo != undefined) {

            Categoria.findAll()
            .then(categoria => {
                res.render('admin/artigo/editar', {categoria: categoria, artigo: artigo})
            })
        }else{
            res.redirect('/')
        }
    })
    .catch(error => {
        res;redirect('/')
    })
})

router.post('/artigo/atualizar', (req, res) => {
    var id = req.body.id
    var titulo = req.body.titulo
    var assunto = req.body.assunto
    var categoria = req.body.categoria

    Artigo.update({titulo: titulo, body: assunto, categoriaId: categoria, slug: slugfy(titulo)}, {
        where: {
            id: id
        }
    })
    .then(() => {
        res.redirect('/admin/artigo')
    })
    .catch(error => {
        res.redirect('/')
    })
})

router.get('/admin/artigo/pagina/:num', (req, res) => {
    var pagina = req.params.num
    var offset = 0

    if (isNaN(pagina) || pagina == 1) {
        offset = 0
    }else{
        offset =  (parseInt(pagina) - 1) * 4
    }


    Artigo.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    })
    .then(artigo => {

        var proximo
        if (offset + 4 >= artigo.count) {
            proximo = false
        }else{
            proximo = true
        }

        var resultado = {
            pagina: parseInt(pagina),
            proximo: proximo,
            artigo: artigo,
        }

        Categoria.findAll()
        .then(categoria => {
            res.render('admin/artigo/pagina', {resultado: resultado, categoria: categoria})
        })

    })
})




module.exports = router