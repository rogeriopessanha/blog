const express =  require('express')
const router = express.Router()
const Categoria = require('./Categoria')
const slugify = require('slugify')

router.get('/admin/categoria/novo', (req, res) => {
    res.render('admin/categoria/novo')
})

router.post ('/categoria/salvar', (req, res) => {
    var titulo = req.body.titulo
    if (titulo != undefined) {
        
        Categoria.create({
            titulo: titulo,
            slug: slugify(titulo)
        })
        .then(() => {
            res.redirect('/')
        })

    }else{
        res.redirect('/admin/categoria/novo')
    }
})

router.get('/admin/categoria', (req, res) => {

    Categoria.findAll().then(categoria => {
        res.render('admin/categoria/index', {categoria: categoria})
    })

})

module.exports = router