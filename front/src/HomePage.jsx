import { useContext, useEffect, useState } from 'react'
import React from 'react'
import './styles/HomePage.css'
import Banner from './components/Banner'
import './styles/LoadingSpinner.css'

import Work from './components/Work'
/* import Footer from './components/Footer' */
import FiltersAndResults from './components/FiltersAndResults'
import DataIsNull from './components/DataIsNull'
import { TokenContext } from './App'
import { DataContext } from './App'

export default function HomePage(params) {
    const production =
    'https://guitarsss.herokuapp.com/guitarsss/posts/'
    const developpement = 'http://localhost:8000/guitarsss/posts/'
    const [isLoading, setIsLoading] = useState(true)
    const [dataNull, setDataNull] = useState(false)
    let Marques = []
    let Styles = []
    let Types = []
    let ManualPreference = ['Droitier', 'Gaucher']
    let Size = ['Enfant', 'Adulte']

    let [token, setToken] = useContext(TokenContext)
    let [data, setData] = useContext(DataContext)

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
        setIsLoading(true)
        fetch(
            process.env.REACT_APP_ENVIRONMENT === 'production' ? production : developpement
            , requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                setIsLoading(false)
                if (data.length === 0 || data === []) {
                    setDataNull(true)
                }
            })
            .catch(function (error) {
                setIsLoading(false)
                setDataNull(true)
            })
    }, [])

    if (data) {
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

        Types = data.reduce((unique, item) => {
            return unique.includes(item.type) ? unique : [...unique, item.type]
        }, [])
    }

    return isLoading ? (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    ) : (
        <div className="home-page">
            <Banner />
            {token ? (
                <Work
                    Marques={Marques}
                    Styles={Styles}
                    Types={Types}
                    ManualPreference={ManualPreference}
                    Size={Size}
                />
            ) : (
                ''
            )}
            {dataNull ? (
                <DataIsNull />
            ) : (
                <FiltersAndResults
                    Data={data}
                    Marques={Marques}
                    Styles={Styles}
                    Types={Types}
                    ManualPreference={ManualPreference}
                    Size={Size}
                />
            )}
            {/*      <Footer /> */}
        </div>
    )
}
