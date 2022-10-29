/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import '../styles/FiltersAndResults.css'
import GuitarList from './GuitarList'

export default function FiltersAndResults(props) {
    let guitarList = props.Data
    const [searchText, setSearchText] = useState([])

    let [guitarSelect, setGuitarSelect] = useState([])

    //--Gestion du background au click sur les buttons
    const [isActiveStyles, setIsActiveStyles] = useState(false)
    const [isActiveMarques, setIsActiveMarques] = useState(false)
    const [isActiveTypes, setIsActiveTypes] = useState(false)
    const [isActiveManualPreference, setIsActiveManualPreference] =
        useState(false)
    const [isActiveSize, setIsActiveSize] = useState(false)

    //--Gestion de l'affichage si seulement une section de filtre est utilisés (ex : Un ou plusieurs Styles)
    const [selectionMarques, setSelectionMarques] = useState([])
    const [selectionstyles, setSelectionstyles] = useState([])
    const [selectionTypes, setSelectionTypes] = useState([])
    const [selectionManualPreference, setSelectionManualPreference] = useState(
        []
    )
    const [selectionSize, setSelectionSize] = useState([])

    //--Gestion des sélections dans plusieurs filtres
    const [activeStyles, setActiveStyles] = useState([])
    const [activeMarques, setActiveMarques] = useState([])
    const [activeTypes, setActiveTypes] = useState([])
    const [activeManualPreference, setActiveManualPreference] = useState([])
    const [activeSize, setActiveSize] = useState([])

    let nameFiltres = ['styles', 'marques', 'types', 'manualPreference', 'size']
    let [selection, setSelection] = useState([])

    /*     const [titleFilter, setTitleFilter] = useState([]) */

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

        if (e.currentTarget.className.includes('type')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'red'
                styleHandle.color = 'white'
            }
        }

        if (e.currentTarget.className.includes('manualPreference')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'blue'
                styleHandle.color = 'white'
            }
        }

        if (e.currentTarget.className.includes('size')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'red'
                styleHandle.color = 'white'
            }
        }
        //--Gestione des filtres
        //***Modèle a reconstituer
        /* selection = {styles: ['Rock']}, {marques: []}, {types: []}, {manualPreference: []}, {size: []} */
        
        //***Cette fonction permet de savoir si un titre de filtre (ex : styles) est déjà présent dans le tableau selection */
        //**Si oui, l'indice du titre est renvoyé, sinon false */
        function arrayHasKey(selection, key) {
            for (let obj of selection) {
                let indexOfTitleFilter = selection.indexOf(obj)
                if (key in obj) {
                    return [true, indexOfTitleFilter]
                }
            }
            return false
        }
//**Reconstitution du modèle ci-dessus en dynamique */
        if (!arrayHasKey(selection, [e.currentTarget.title])) {
            selection.push({ [e.currentTarget.title]: [e.currentTarget.id] })
        } else {
            let indexOfTitleFilter = arrayHasKey(selection, [e.currentTarget.title])[1]
            let targetIsInSelection = selection[indexOfTitleFilter][e.currentTarget.title].includes(e.currentTarget.id)
            if (!targetIsInSelection){selection[indexOfTitleFilter][e.currentTarget.title].push(e.currentTarget.id)}else if(targetIsInSelection){
                let indexOfTargetInSelection = selection[indexOfTitleFilter][e.currentTarget.title].indexOf(e.currentTarget.id)
                selection[indexOfTitleFilter][e.currentTarget.title].splice(indexOfTargetInSelection, 1)
            }
        }
        console.log(selection)





        if (
            searchText !== undefined &&
            searchText !== '' &&
            searchText != null
        ) {
            if (!searchText.includes(e.currentTarget.id)) {
                searchText.push(e.currentTarget.id)

                guitarSelect = Array.from(guitarList).filter((item) => {
                    let allFilterAreComplete = 0

                    return nameFiltres.some((searchInFilter) => {
                        for (let i = 0; i < searchText.length; i++) {
                            if (item[searchInFilter].includes(searchText[i])) {
                                allFilterAreComplete++
                            }
                        }

                        if (allFilterAreComplete === searchText.length) {
                            return item
                        }
                    })
                })
                setGuitarSelect(guitarSelect)
            } else if (searchText.includes(e.currentTarget.id)) {
                const newSearchText = searchText.filter(function (f) {
                    return f !== e.currentTarget.id
                })

                guitarSelect = Array.from(guitarList).filter((item) => {
                    let allFilterAreComplete = 0
                    return nameFiltres.some((searchInFilter) => {
                        for (let i = 0; i < newSearchText.length; i++) {
                            if (
                                item[searchInFilter].includes(newSearchText[i])
                            ) {
                                allFilterAreComplete++
                            }
                        }
                        if (allFilterAreComplete === newSearchText.length) {
                            return item
                        }
                    })
                })
                setGuitarSelect(guitarSelect)
                setSearchText(newSearchText)
            }
        }
    }

    if (searchText.length === 0) {
        guitarSelect = guitarList
    }
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

                <div className="display-buttons-manualPreference">
                    Préférence manuelle
                    {props.ManualPreference.map((e) => (
                        <button
                            id={e}
                            className="style-button-manualPreference"
                            name={e}
                            value={e}
                            key={'ManualPreference' + key++}
                            title="manualPreference"
                            style={{
                                backgroundColor: isActiveManualPreference
                                    ? 'rgb(84, 93, 93)'
                                    : '',
                                color: isActiveManualPreference ? 'white' : '',
                            }}
                            onClick={handleClick}
                        >
                            {e}
                        </button>
                    ))}
                </div>

                <div className="display-buttons-size">
                    Taille
                    {props.Size.map((e) => (
                        <button
                            id={e}
                            className="style-button-size"
                            name={e}
                            value={e}
                            key={'Size' + key++}
                            title="size"
                            style={{
                                backgroundColor: isActiveSize
                                    ? 'rgb(84, 93, 93)'
                                    : '',
                                color: isActiveSize ? 'white' : '',
                            }}
                            onClick={handleClick}
                        >
                            {e}
                        </button>
                    ))}
                </div>
            </div>

            <div className="display-guitars">
                {Array.from(guitarSelect).map(
                    ({
                        _id,
                        style,
                        marque,
                        type,
                        imageUrl,
                        size,
                        manualPreference,
                    }) => (
                        <GuitarList
                            id={_id}
                            key={'List' + _id}
                            style={style}
                            marque={marque}
                            type={type}
                            size={size}
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
