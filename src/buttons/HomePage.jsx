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
console.log("Styles", Styles);
    //--Gestion du background au click sur les buttons
    const [isActiveStyles, setIsActiveStyles] = useState(false)
    const [isActiveMarques, setIsActiveMarques] = useState(false)

    const [selection, setSelection] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    let guitarSelect = []

    const handleClick = async (e) => {
        e.preventDefault()

        if (selection.length === 0) {
            setSelection(
                ...selection,
                guitarList.filter(
                    (element) => element.Marque === e.currentTarget.id
                )
            )
        } else if (
            selection.length !== 0 &&
            !selection.some((element) => element.Marque === e.currentTarget.id)
        ) {
            setSelection(
                selection.concat(
                    guitarList.filter(
                        (element) => element.Marque === e.currentTarget.id
                    )
                )
            )
        } else if (
            selection.length !== 0 &&
            selection.some((element) => element.Marque === e.currentTarget.id)
        ) {
            setSelection(
                selection.filter(function (item) {
                    return item.Marque !== e.currentTarget.id
                })
            )
        }
        if (e.currentTarget.style.backgroundColor) {
            e.currentTarget.style.backgroundColor = null
            e.currentTarget.style.color = null
        } else {
            e.currentTarget.style.backgroundColor = 'salmon'
            e.currentTarget.style.color = 'white'
        }
    }
    console.log('selection', selection)

    if (selection.length > 0) {
        guitarSelect = selection
    } else {
        guitarSelect = guitarList
    }

    useEffect(() => {
        if (!selection) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [selection])

    return isLoading ? (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    ) : (
        <>
            <div className="display-buttons-styles">
                Styles
                {Styles.map((e) => (
                    <button
                        id={e}
                        name={e}
                        value={e}
                        key={e}
                        style={{
                            backgroundColor: isActiveStyles ? 'blue' : '',
                            color: isActiveStyles ? 'white' : '',
                        }}
                        onClick={handleClick}
                    >
                        {e}
                    </button>
                ))}
            </div>

            <div className="display-buttons-marques">
                Marques
                {Marques.map((e) => (
                    <button
                        id={e}
                        name={e}
                        value={e}
                        key={e}
                        style={{
                            backgroundColor: isActiveMarques ? 'salmon' : '',
                            color: isActiveMarques ? 'white' : '',
                        }}
                        onClick={handleClick}
                    >
                        {e}
                    </button>
                ))}
            </div>

            <div className="displayGuitars">
                {guitarSelect.map(
                    ({ id, Style, Marque, Type, Gamme, isBestSale, cover }) => (
                        <GuitarList
                            id={id}
                            key={id}
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
