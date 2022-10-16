const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth') //--Middleware d'authentification
const multer = require('../middleware/multer-config') //--Middleware de gestion des fichiers

const postsCtrl = require('../controllers/posts')

//*****Routes des posts
//--Ajouter un nouveau post
router.post('/', auth, multer, postsCtrl.createPost) //--multer doit être après auth pour éviter l'enregistrement d'un fichier sans authentification

//--Mettre à jour un Post existant
router.put('/:id', auth, multer, postsCtrl.modifyPost)

//--Suppression d'un Post
router.delete('/:id', auth, postsCtrl.deletePost)

//--Récupération d'un Post spécifique
router.get('/:id', auth, postsCtrl.getOnePost)

//--Route GET qui renvoie toutes les Posts
router.get('/', postsCtrl.getAllPosts)

module.exports = router
