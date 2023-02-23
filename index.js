require('dotenv').config();
const express = require('express')
const app = express()


const dotenv = require('dotenv')
dotenv.config()


//view engine
app.set('view engine', 'ejs')

//arquivos static
app.use(express.static('public'))


//body parser
app.use(express.urlencoded({extends: true}))
app.use(express.json())

//renderiza na tela
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(process.env.PORT, () => {
    console.log(`App rodando ${process.env.PORT}`)
})