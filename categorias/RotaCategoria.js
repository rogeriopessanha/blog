const express =  require('express')
const router = express.Router()

router.get ('/categorias', (req, res) => {
    res.send('ROTA DE CATEGORIAS')
})

router.get('/admin/categoria/novo', (req, res) => {
    res.render('admin/categoria/novo')
})

module.exports = router