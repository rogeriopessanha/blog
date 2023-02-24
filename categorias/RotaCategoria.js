const express =  require('express')
const router = express.Router()

router.get ('/categorias', (req, res) => {
    res.send('ROTA DE CATEGORIAS')
})

router.get('/admin/categorias/novo', (req, res) => {
    res.send('ROTA PARA CRIAR UMA NOVA CATEGORIA')
})

module.exports = router