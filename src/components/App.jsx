import React from 'react'
import '../styles/App.css'
import Banner from './Banner'
import Footer from './Footer'
import logo from '../assets/logo.png'
import HomePage from '../buttons/HomePage'

/* import Page from './page.jsx' */

export default function App(params) {
    console.log(params)
    const title = 'Guitarsss'

    return (
        <div>
            <Banner>
                <img
                    src={logo}
                    alt="Logo de l'application Guitarss"
                    className="guitarsss-logo"
                />
                <h1 className="guitarsss-title">{title}</h1>
                {/*                <p>Ici, consultez toutes les guitares que vous souhaitez</p> */}
            </Banner>

            <HomePage />
            <Footer />
        </div>
    )
}
