import { useContext, useEffect, useState } from 'react'
import React from 'react'
import './styles/HomePage.css'
import Banner from './components/Banner'
import './styles/LoadingSpinner.css'

import Work from './components/Work'
import Footer from './components/Footer'
import FiltersAndResults from './components/FiltersAndResults'
import { TokenContext } from './App'

export default function HomePage(params) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    let Marques = []
    let Styles = []
    
    let [token, setToken] = useContext(TokenContext)

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }
    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:8000/guitarsss/posts/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                setIsLoading(false)
            })
            .catch(function (error) {
                alert('OUPS ! Essayes encore')
            })
    }, [])

    if(data){
        Marques = data.reduce((unique, item) => {
            return unique.includes(item.marque)
                ? unique
                : [...unique, item.marque]
        }, [])

        Styles = data.reduce((unique, item) => {
            return unique.includes(item.style)
                ? unique
                : [...unique, item.style]
        }, [])
    }
    
    return isLoading ? (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    ) : (
        <div className="home-page">
            <Banner />
            {token ? <Work Marques={Marques} Styles={Styles} /> : ''}
            <FiltersAndResults data={data} Marques={Marques} Styles={Styles} />
            <Footer />
        </div>
    )
}
