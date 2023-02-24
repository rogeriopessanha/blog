const express =  require('express')
const router = express.Router()

router.get ('/artigos', (req, res) => {
    res.send('ROTA DE ARTIGO')
})

router.get('/admin/artigos/novo', (req, res) => {
    res.send('ROTA PARA CRIAR UM NOVA ARTIGO')
})

module.exports = router