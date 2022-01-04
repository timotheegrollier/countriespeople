const mongoose = require('mongoose')


const articleSchema = mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
})

module.exports = mongoose.model('article', articleSchema)