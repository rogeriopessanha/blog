const express = require('express')
const router = express.Router()
const Usuario = require('./Usuario')
const bcrypt = require('bcryptjs')

router.get('/admin/usuarios', (req, res) => {
    res.send('listagem de usuarios')
})

router.get('/admin/usuarios/criar', (req, res) => {
    res.render('admin/usuarios/criar')
})

router.post('/usuarios/criar', (req, res) => {
    var email = req.body.email
    var senha = req.body.senha

    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(senha, salt)

    Usuario.create({
        email: email,
        senha: hash
    })
    .then(() => {
        res.redirect('/')
    })
    .catch((error) => {
        res.redirect('/')
    })



    // sempre testar usando o res.json
    // var email = req.body.email
    // var senha = req.body.senha
    // res.json({email, senha})
})

module.exports = router