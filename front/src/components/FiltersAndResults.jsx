/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import '../styles/FiltersAndResults.css'
import GuitarList from './GuitarList'

export default function FiltersAndResults(props) {
    let guitarList = props.Data
    let [guitarSelect, setGuitarSelect] = useState([])

    //--Gestion du background au click sur les buttons
    const [isActiveStyles, setIsActiveStyles] = useState(false)
    const [isActiveMarques, setIsActiveMarques] = useState(false)
    const [isActiveTypes, setIsActiveTypes] = useState(false)

    //--Gestion de l'affichage si seulement une section de filtre est utilisés (ex : Un ou plusieurs Styles)
    const [selectionMarques, setSelectionMarques] = useState([])
    const [selectionStyles, setSelectionStyles] = useState([])
    const [selectionTypes, setSelectionTypes] = useState([])

    //--Gestion des sélections dans plusieurs filtres
    const [activeStyles, setActiveStyles] = useState([])
    const [activeMarques, setActiveMarques] = useState([])
    const [activeTypes, setActiveTypes] = useState([])

    const [selection, setSelection] = useState([])
    /*     const [titleFilter, setTitleFilter] = useState([]) */

    const [searchText, setSearchText] = useState([])


    console.log(searchText)

    const handleClick = async (e) => {
        e.preventDefault()

        //--Gestion des styles des filtres
        let styleHandle = e.currentTarget.style

        if (e.currentTarget.className.includes('styles')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'rgb(32, 190, 190)'
                styleHandle.color = 'white'
            }
        }

        if (e.currentTarget.className.includes('marques')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'rgb(84, 93, 93)'
                styleHandle.color = 'white'
            }
        }

        if (e.currentTarget.className.includes('types')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'red'
                styleHandle.color = 'white'
            }
        }

        //--Gestione des filtres

        let nameFiltres = ['style', 'marque', 'type']

        console.log(e.currentTarget.id)

        if (!searchText.includes(e.currentTarget.id)) {
            searchText.push(e.currentTarget.id)
        } else if (searchText.includes(e.currentTarget.id)) {
            const newSearchText = searchText.filter(function (f) {
                return f !== e.currentTarget.id
            })
            setSearchText(newSearchText)
        }

        if (
            searchText !== undefined &&
            searchText !== '' &&
            searchText != null
        ) {
            guitarSelect = guitarList.filter((item) => {
                let allFilterAreComplete = 0
                return nameFiltres.some((searchInFilter) => {
                    console.log(searchText);
                    for (let i=0; i < searchText.length; i++){
                        if (item[searchInFilter].includes(searchText[i])) {
                            allFilterAreComplete++
                        }
                    } 
                    if (allFilterAreComplete === searchText.length) {
                        return item
                    }
                })
            })
        }
        setGuitarSelect(guitarSelect)
    }

    /*     const handleClickStyles = async (el) => {
        el.preventDefault()

        //--Tableau des styles sélectionnés pour gérer plusieurs filtres
        if (!activeStyles.includes(el.currentTarget.id)) {
            activeStyles.push(el.currentTarget.id)
        } else {
            const newActiveStyles = activeStyles.filter(function (f) {
                return f !== el.currentTarget.id
            })
            setActiveStyles(newActiveStyles)
        }

        if (selectionStyles.length === 0) {
            setSelectionStyles(
                ...selectionStyles,
                guitarList.filter(
                    (element) => element.style === el.currentTarget.id
                )
            )
        } else if (
            selectionStyles.length !== 0 &&
            !selectionStyles.some(
                (element) => element.style === el.currentTarget.id
            )
        ) {
            setSelectionStyles(
                selectionStyles.concat(
                    guitarList.filter(
                        (element) => element.style === el.currentTarget.id
                    )
                )
            )
        } else if (
            selectionStyles.length !== 0 &&
            selectionStyles.some(
                (element) => element.style === el.currentTarget.id
            )
        ) {
            setSelectionStyles(
                selectionStyles.filter(function (item) {
                    return item.style !== el.currentTarget.id
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

    const handleClickMarques = async (e) => {
        e.preventDefault()

        //--Tableau des marques sélectionnés pour gérer plusieurs filtres
        if (!activeMarques.includes(e.currentTarget.id)) {
            activeMarques.push(e.currentTarget.id)
        } else {
            const newActiveMarques = activeMarques.filter(function (f) {
                return f !== e.currentTarget.id
            })
            setActiveMarques(newActiveMarques)
        }

        if (selectionMarques.length === 0) {
            setSelectionMarques(
                ...selectionMarques,
                guitarList.filter(
                    (element) => element.marque === e.currentTarget.id
                )
            )
        } else if (
            selectionMarques.length !== 0 &&
            !selectionMarques.some(
                (element) => element.marque === e.currentTarget.id
            )
        ) {
            setSelectionMarques(
                selectionMarques.concat(
                    guitarList.filter(
                        (element) => element.marque === e.currentTarget.id
                    )
                )
            )
        } else if (
            selectionMarques.length !== 0 &&
            selectionMarques.some(
                (element) => element.marque === e.currentTarget.id
            )
        ) {
            setSelectionMarques(
                selectionMarques.filter(function (item) {
                    return item.marque !== e.currentTarget.id
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

    const handleClickTypes = async (el) => {
        el.preventDefault()

        //--Tableau des marques sélectionnés pour gérer plusieurs filtres
        if (!activeTypes.includes(el.currentTarget.id)) {
            activeTypes.push(el.currentTarget.id)
        } else {
            const newActiveTypes = activeTypes.filter(function (f) {
                return f !== el.currentTarget.id
            })
            setActiveTypes(newActiveTypes)
        }

        if (selectionTypes.length === 0) {
            setSelectionTypes(
                ...selectionTypes,
                guitarList.filter(
                    (element) => element.type === el.currentTarget.id
                )
            )
        } else if (
            selectionTypes.length !== 0 &&
            !selectionTypes.some(
                (element) => element.type === el.currentTarget.id
            )
        ) {
            setSelectionTypes(
                selectionTypes.concat(
                    guitarList.filter(
                        (element) => element.type === el.currentTarget.id
                    )
                )
            )
        } else if (
            selectionTypes.length !== 0 &&
            selectionTypes.some(
                (element) => element.type === el.currentTarget.id
            )
        ) {
            setSelectionTypes(
                selectionTypes.filter(function (item) {
                    return item.type !== el.currentTarget.id
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
    //--Si seulement des styles sont séléctionnés
    if (
        selectionStyles.length > 0 &&
        selectionMarques.length === 0 &&
        selectionTypes.length === 0
    ) {
        guitarSelect = [...selectionStyles].filter(
            (val, id, array) => array.indexOf(val) === id
        )
    } //--Si seulement des marques sont séléctionnés
    else if (
        selectionStyles.length === 0 &&
        selectionMarques.length > 0 &&
        selectionTypes.length === 0
    ) {
        guitarSelect = [...selectionMarques].filter(
            (val, id, array) => array.indexOf(val) === id
        )
    }
    //--Si seulement des types sont séléctionnés
    else if (
        selectionStyles.length === 0 &&
        selectionMarques.length === 0 &&
        selectionTypes.length > 0
    ) {
        guitarSelect = [...selectionTypes].filter(
            (val, id, array) => array.indexOf(val) === id
        )
    } //--Si un ou plusieurs styles ET marques sont séléctionnés
    else if (
        activeStyles.length > 0 &&
        activeMarques.length > 0 &&
        activeTypes.length === 0
    ) {
        console.log(activeStyles)
        console.log(activeMarques)
    } else {
        guitarSelect = guitarList
    } */

    if (searchText.length === 0) {
        guitarSelect = guitarList
    }
    console.log(guitarSelect)
    let key = 0
    return (
        <>
            <div className="display-options">
                <div id="styles" className="display-buttons-styles">
                    Styles
                    {props.Styles.map((el) => (
                        <button
                            id={el}
                            className="style-button-styles"
                            name={el}
                            value={el}
                            title="styles"
                            key={'Styles' + key++}
                            style={{
                                backgroundColor: isActiveStyles
                                    ? 'rgb(32, 190, 190)'
                                    : '',
                                color: isActiveStyles ? 'white' : '',
                            }}
                            onClick={handleClick}
                        >
                            {el}
                        </button>
                    ))}
                </div>

                <div className="display-buttons-marques">
                    Marques
                    {props.Marques.map((e) => (
                        <button
                            id={e}
                            className="style-button-marques"
                            name={e}
                            value={e}
                            title="marques"
                            key={'Marques' + key++}
                            style={{
                                backgroundColor: isActiveMarques
                                    ? 'rgb(84, 93, 93)'
                                    : '',
                                color: isActiveMarques ? 'white' : '',
                            }}
                            onClick={handleClick}
                        >
                            {e}
                        </button>
                    ))}
                </div>

                <div className="display-buttons-types">
                    Types
                    {props.Types.map((e) => (
                        <button
                            id={e}
                            className="style-button-types"
                            name={e}
                            value={e}
                            key={'Types' + key++}
                            title="types"
                            style={{
                                backgroundColor: isActiveTypes
                                    ? 'rgb(84, 93, 93)'
                                    : '',
                                color: isActiveTypes ? 'white' : '',
                            }}
                            onClick={handleClick}
                        >
                            {e}
                        </button>
                    ))}
                </div>
            </div>

            <div className="display-guitars">
                {guitarSelect.map(
                    ({
                        _id,
                        style,
                        marque,
                        type,
                        imageUrl,
                        majeur,
                        manualPreference,
                    }) => (
                        <GuitarList
                            id={_id}
                            key={'List' + _id}
                            style={style}
                            marque={marque}
                            type={type}
                            majeur={majeur}
                            manualPreference={manualPreference}
                            imageUrl={imageUrl}
                            token
                        />
                    )
                )}
            </div>
        </>
    )
}
