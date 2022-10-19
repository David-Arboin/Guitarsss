const mongoose = require('mongoose') //--Infrastructure de modélisation d’objet pour MongoDB dans Node.js

const mongooseErrors = require('mongoose-errors') //--Gestionnaire d'erreurs monggose

const postSchema = mongoose.Schema({
    imageUrl: { type: String, required: false }, //-- l'URL de l'image à téléchargée par l'utilisateur
    type: { type: String, required: true }, //-- Acoustique ou électrique* ou électro-acoustique*
    manualPreference: { type: String, required: true }, //-- Droitier ou gaucher*
    majeur: { type: String, required: true }, //-- Adulte ou enfant*
    marque: { type: String, required: true }, //--...*
    style: { type: String, required: true }, //-- Hard Rock, Jazz, etc…*
})

postSchema.plugin(mongooseErrors)
module.exports = mongoose.model('Post', postSchema)
