import gibson from '../assets/gibson.jpg'
import ibanez from '../assets/ibanez.png'
import lag from '../assets/lag.jpg'
import musicman from '../assets/musicman.jpg'
import yamaha from '../assets/yamaha.jpg'

export const guitaresList = [
    {
        id: 1,
        Marque: 'Gibson',
        Type: 'Electrique',
        Gamme: 'Pro',
        isBestSale: true,
        cover: gibson,
    },
    {
        id: 2,
        Marque: 'Lag',
        Type: 'Sèche',
        Gamme: 'Pro',
        isBestSale: true,
        cover: lag,
    },
    {
        id: 3,
        Marque: 'Ibanez',
        Type: 'Acoustique',
        Gamme: 'Pro',
        isBestSale: false,
        cover: ibanez,
    },
    {
        id: 4,
        Marque: 'Musicman',
        Type: 'Electrique/Acoustique',
        Gamme: 'Pro',
        isBestSale: true,
        cover: musicman,
    },
    {
        id: 5,
        Marque: 'Yamaha',
        Type: 'Electrique/Sèche',
        Gamme: 'Débutant',
        isBestSale: false,
        cover: yamaha,
    },
    {
        id: 6,
        Marque: 'Gibson',
        Type: 'Sèche/Acoustique',
        Gamme: 'Débutant',
        isBestSale: true,
        cover: gibson,
    },
    {
        id: '7',
        Marque: 'Lag',
        Type: 'Electrique/Enfant',
        Gamme: 'Amateur',
        isBestSale: false,
        cover: lag,
    },
    {
        id: 8,
        Marque: 'Ibanez',
        Type: 'Electrique/Adulte',
        Gamme: 'Amateur',
        isBestSale: true,
        cover: ibanez,
    },
    {
        id: 9,
        Marque: 'Musicman',
        Type: 'Sèche/Enfant',
        Gamme: 'Débutant',
        isBestSale: true,
        cover: musicman,
    },
    {
        id: 10,
        Marque: 'Yamaha',
        Type: 'Acoustique/Enfant',
        Gamme: 'Amateur',
        isBestSale: false,
        cover: yamaha,
    },
]
