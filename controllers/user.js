//--Cryptage des mots de passes
const bcrypt = require('bcrypt') //--Fonction de hachage ou Package de chiffrement
const User = require('../schemas/user')
const jwt = require('jsonwebtoken') //--permet l'échange sécurisé de jetons entre plusieurs parties pour vérifier l’authenticité et l’intégrité des données
require('dotenv').config() //--Package de configuration des variables d’environnement

//--Connecter l'unique compte
exports.login = (req, res, next) => {
    User.findOne({ name: req.body.name })
        .then((user) => {
            //--Si l'utilisateur n'existe pas
            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'Utilisateur non trouvé !' })
            }
            //--Si l'utilisateur existe, avec bcrypt on compare le mot de pass envoyé par l'utillisateur et celui enregistré dans la base de donnée
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: 'Mot de passe incorrect !' })
                    }
                    //--Si le nom et le mot de passe son OK, on renvoit au frontend ce qu'il attend > L'userId et le token
                    res.status(200).json({
                        userId: user._id,
                        //--Création du token
                        token: jwt.sign(
                            //--Pour la fonction sign
                            //--Argument 1 : payload = Données que l'on encode si on veut en encoder
                            { userId: user._id },
                            //--Argumnt 2 : Clé secrète pour l'encodage
                            process.env.RANDOM_TOKEN_SECRET,
                            //--Argument 3 de configuration : Le token expirera au bout de 24h
                            { expiresIn: '24h' }
                        ),
                    })
                })
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}
