const express = require('express')
const router = express.Router()
const Usuario = require('./Usuario')
const bcrypt = require('bcryptjs')
const adminAuth = require('../middleware/adminAuth')


// Tabela com lista de usuários
router.get('/admin/usuarios', adminAuth, (req, res) => {
    Usuario.findAll()
    .then(usuarios => {
        res.render('admin/usuarios/index', {usuarios: usuarios})
    })
})


// Criando novo usuário
router.get('/admin/usuarios/criar',  (req, res) => {
    res.render('admin/usuarios/criar')
})

// Enviando os dados para criar novo usuário
router.post('/usuarios/criar',  (req, res) => {
    var email = req.body.email
    var senha = req.body.senha

    Usuario.findOne({where:{email: email}})
    .then(usuario => {
        if (usuario == undefined) {
            
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

        }else{
            res.redirect('/admin/usuarios/criar')
        }
    })

})


// Tela de login
router.get('/login',  (req, res) => {
    res.render('admin/usuarios/login')
})


// Autenticação do usuário
router.post('/auth', (req, res) => {
    var email = req.body.email
    var senha = req.body.senha

    Usuario.findOne({where:{email: email}})
    .then(usuario => {
        if (usuario != undefined) {
            var correto = bcrypt.compareSync(senha, usuario.senha)

            if (correto) {
                req.session.usuario = {
                    id: usuario.id,
                    email: usuario.email
                }
                res.redirect('/admin/artigo')
            }else{
                res.redirect('/login')
            }

        }else{
            res.redirect('/login')
        }
    })
})


// Deslogar usuário
router.get('/deslogar', (req, res) => {
    req.session.usuario = undefined
    res.redirect('/login')
})

module.exports = router