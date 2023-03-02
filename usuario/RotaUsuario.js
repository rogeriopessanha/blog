const express = require('express')
const router = express.Router()
const Usuario = require('./Usuario')
const bcrypt = require('bcryptjs')

router.get('/admin/usuarios', (req, res) => {
    Usuario.findAll()
    .then(usuarios => {
        res.render('admin/usuarios/index', {usuarios: usuarios})
    })
})

router.get('/admin/usuarios/criar', (req, res) => {
    res.render('admin/usuarios/criar')
})

router.post('/usuarios/criar', (req, res) => {
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

   
    // sempre testar usando o res.json
    // var email = req.body.email
    // var senha = req.body.senha
    // res.json({email, senha})
})

router.get('/login', (req, res) => {
    res.render('admin/usuarios/login')
})

router.post('/auth', (req, res) => {
    var email = req.body.email
    var senha = req.body.senha

    Usuario.findOne({where:{email: email}})
    .then(usuario => {
        if (usuario != undefined) {
            var correto = bcrypt.compareSync(senha, usuario.senha)

            if (correto) {
                req.session.uruario = {
                    id: usuario.id,
                    email: usuario.email
                }
                res.json(req.session.uruario)
            }else{
                res.redirect('/login')
            }

        }else{
            res.redirect('/login')
        }
    })
})

module.exports = router