const express =  require('express')
const router = express.Router()

router.get ('/artigos', (req, res) => {
    res.send('ROTA DE ARTIGO')
})

router.get('/admin/artigo/novo', (req, res) => {
    res.render('admin/artigo/novo')
})

module.exports = router