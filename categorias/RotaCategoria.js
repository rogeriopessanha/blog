const express =  require('express')
const router = express.Router()
const Categoria = require('./Categoria')
const slugify = require('slugify')
const adminAuth = require('../middleware/adminAuth')


// Tela para criar nova categoria
router.get('/admin/categoria/novo', adminAuth, (req, res) => {
    res.render('admin/categoria/novo')
})


// Enviando dados para criar categoria
router.post ('/categoria/salvar', (req, res) => {
    var titulo = req.body.titulo
    if (titulo != undefined) {
        
        Categoria.create({
            titulo: titulo,
            slug: slugify(titulo)
        })
        .then(() => {
            res.redirect('/admin/categoria')
        })

    }else{
        res.redirect('/admin/categoria/novo')
    }
})

router.get('/admin/categoria', adminAuth, (req, res) => {

    Categoria.findAll()
    .then(categoria => {
        res.render('admin/categoria/index', {categoria: categoria})
    })

})

// Tela para deletar categoria
router.post('/categoria/delete', (req, res) => {
    var id = req.body.id

    if (id != undefined) {
        if (!isNaN(id)) {

            Categoria.destroy({
                where: {
                    id: id
                }
            }).then(() =>{
                res.redirect('/admin/categoria')
            })
            
        }else{ // se o id não for um numero
            res.redirect('/admin/categoria')
        }
    }else{ // se o id for null
        res.redirect('/admin/categoria')
    }
})

// Tela para editar categoria
router.get('/admin/categoria/editar/:id', adminAuth, (req, res) => {
    var id = req.params.id
    
    if (isNaN(id)) {
        res.redirect('/admin/categoria')
    }

    Categoria.findByPk(id)
    .then(categoria => {
        if (categoria != undefined) {
            
            res.render('admin/categoria/editar', {categoria: categoria})

        }else{
            res.redirect('/admin/categoria')
        }
    })
    .catch(erro => {
        res.redirect('/admin/categoria')
    })
})

// Atualizando categoria
router.post('/categoria/atualizar', (req, res) =>{
    var id = req.body.id
    var titulo = req.body.titulo

    Categoria.update({titulo: titulo, slug: slugify(titulo)}, {
        where: {
            id: id
        }
    })
    .then(() => {
        res.redirect('/admin/categoria')
    })
})

module.exports = router