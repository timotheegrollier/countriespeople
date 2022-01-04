const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Article = require('./models/Article');
require('dotenv').config()
const app = express()


mongoose.connect(`mongodb+srv://${process.env.DBUSER}@cluster0.zvv7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
});


app.use(express.static(path.join(__dirname, './client/build/')))
// app.get('*', (req, res,next) => {
//     res.sendFile(path.join(__dirname, './client/build/index.html'))
//     next()
// })

app.get('/articles', (req, res,next) => {
    Article.find()
    .then(articles=>res.status(200).json(articles))
    .catch(error=>res.status(400).json(error))
})

app.post('/articles',(req,res,next)=>{
    const article = new Article({...req.body})
    article.save()
    .then(()=>res.status(201).json({message:"Article crée"}))
    .catch(error=>res.status(400).json(error))
})



app.put('/articles/:id', (req, res, next) => {
    Article.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Article modifié" }))
        .catch(error => res.status(400).json(error))
})


app.delete('/articles/:id',(req,res)=>{
    Article.deleteOne({_id:req.params.id})
        .then(() => res.status(200).json({ message: "Article supprimé" }))
        .catch(error => res.status(400).json(error))
})

// A mettre en bas pour react

app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '/client/build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
    res.end
})





const PORT =   process.env.PORT;

app.listen(PORT,  () => {
    console.log(`Serveur lancé sur le port : ${PORT}`);
})

