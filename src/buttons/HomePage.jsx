/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import '../styles/LoadingSpinner.css'
import '../styles/HomePage.css'

import GuitarList from '../components/GuitarList'
import { guitarList } from '../datas/guitarList.js'

export default function HomePage() {
    const Marques = guitarList.reduce((unique, item) => {
        return unique.includes(item.Marque) ? unique : [...unique, item.Marque]
    }, [])

    const Styles = guitarList.reduce((unique, item) => {
        return unique.includes(item.Style) ? unique : [...unique, item.Style]
    }, [])
    //--Gestion du background au click sur les buttons
    const [isActiveStyles, setIsActiveStyles] = useState(false)
    const [isActiveMarques, setIsActiveMarques] = useState(false)

    const [selectionMarques, setSelectionMarques] = useState([])
    const [selectionStyles, setSelectionStyles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    let guitarSelect = []

    const handleClickMarques = async (e) => {
        e.preventDefault()

        if (selectionMarques.length === 0) {
            setSelectionMarques(
                ...selectionMarques,
                guitarList.filter(
                    (element) => element.Marque === e.currentTarget.id
                )
            )
        } else if (
            selectionMarques.length !== 0 &&
            !selectionMarques.some(
                (element) => element.Marque === e.currentTarget.id
            )
        ) {
            setSelectionMarques(
                selectionMarques.concat(
                    guitarList.filter(
                        (element) => element.Marque === e.currentTarget.id
                    )
                )
            )
        } else if (
            selectionMarques.length !== 0 &&
            selectionMarques.some(
                (element) => element.Marque === e.currentTarget.id
            )
        ) {
            setSelectionMarques(
                selectionMarques.filter(function (item) {
                    return item.Marque !== e.currentTarget.id
                })
            )
        }
        if (e.currentTarget.style.backgroundColor) {
            e.currentTarget.style.backgroundColor = null
            e.currentTarget.style.color = null
        } else {
            e.currentTarget.style.backgroundColor = 'rgb(84, 93, 93)'
            e.currentTarget.style.color = 'white'
        }
    }

    const handleClickStyles = async (el) => {
        el.preventDefault()

        if (selectionStyles.length === 0) {
            setSelectionStyles(
                ...selectionStyles,
                guitarList.filter(
                    (element) => element.Style === el.currentTarget.id
                )
            )
        } else if (
            selectionStyles.length !== 0 &&
            !selectionStyles.some(
                (element) => element.Style === el.currentTarget.id
            )
        ) {
            setSelectionStyles(
                selectionStyles.concat(
                    guitarList.filter(
                        (element) => element.Style === el.currentTarget.id
                    )
                )
            )
        } else if (
            selectionStyles.length !== 0 &&
            selectionStyles.some(
                (element) => element.Style === el.currentTarget.id
            )
        ) {
            setSelectionStyles(
                selectionStyles.filter(function (item) {
                    return item.Style !== el.currentTarget.id
                })
            )
        }
        if (el.currentTarget.style.backgroundColor) {
            el.currentTarget.style.backgroundColor = null
            el.currentTarget.style.color = null
        } else {
            el.currentTarget.style.backgroundColor = 'rgb(32, 190, 190)'
            el.currentTarget.style.color = 'white'
        }
    }

    //--Tableau de rendu final
    if (selectionStyles.length > 0 || selectionMarques.length > 0) {
        guitarSelect = [...selectionStyles, ...selectionMarques].filter(
            (val, id, array) => array.indexOf(val) == id
        )
    } else {
        guitarSelect = guitarList
    }

    useEffect(() => {
        if (!guitarSelect) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [guitarSelect])

    return isLoading ? (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    ) : (
        <>
            <div className="display-buttons-styles">
                Styles
                {Styles.map((el) => (
                    <button
                        id={el}
                        className="style-button-styles"
                        name={el}
                        value={el}
                        key={'Styles' + el}
                        style={{
                            backgroundColor: isActiveStyles ? 'rgb(32, 190, 190)' : '',
                            color: isActiveStyles ? 'white' : '',
                        }}
                        onClick={handleClickStyles}
                    >
                        {el}
                    </button>
                ))}
            </div>

            <div className="display-buttons-marques">
                Marques
                {Marques.map((e) => (
                    <button
                        id={e}
                        className="style-button-marques"
                        name={e}
                        value={e}
                        key={'Marques' + e}
                        style={{
                            backgroundColor: isActiveMarques ? 'rgb(84, 93, 93)' : '',
                            color: isActiveMarques ? 'white' : '',
                        }}
                        onClick={handleClickMarques}
                    >
                        {e}
                    </button>
                ))}
            </div>

            <div className="display-guitars">
                {guitarSelect.map(
                    ({ id, Style, Marque, Type, Gamme, isBestSale, cover }) => (
                        <GuitarList
                            id={id}
                            key={'List' + id}
                            Style={Style}
                            Marque={Marque}
                            Type={Type}
                            Gamme={Gamme}
                            isBestSale={isBestSale}
                            cover={cover}
                        />
                    )
                )}
            </div>
        </>
    )
}