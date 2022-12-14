/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useEffect } from 'react'
import '../styles/FiltersAndResults.css'
import GuitarList from './GuitarList'
import ResultIsNull from './ResultIsNull'

export default function FiltersAndResults(props) {
    let guitarList = props.Data
    /*     const [searchText, setSearchText] = useState([]) */

    const [resultIsNull, setResultIsNull] = useState(false)

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

    let [selection, setSelection] = useState([])
    const isFirstRender = useRef(true)

    if (
        selection.length === 0 ||
        selection === undefined ||
        selection === '' ||
        selection === null ||
        selection === []
    ) {
        guitarSelect = guitarList
    }

    function arrayHasKey(selection, key) {
        for (let obj of selection) {
            let indexOfTitleFilter = selection.indexOf(obj)
            if (key in obj) {
                return [true, indexOfTitleFilter]
            }
        }
        return false
    }
    /*     const [titleFilter, setTitleFilter] = useState([]) */
    const handleClick = async (e) => {
        e.preventDefault()
        //--Gestion des styles des filtres depuis la section principale
        let styleHandle = e.currentTarget.style

        if (e.currentTarget.title.includes('style')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'rgb(32, 190, 190)'
                styleHandle.color = 'white'
            }
        }

        if (e.currentTarget.title.includes('marque')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'rgb(84, 93, 93)'
                styleHandle.color = 'white'
            }
        }

        if (e.currentTarget.title.includes('type')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'red'
                styleHandle.color = 'white'
            }
        }

        if (e.currentTarget.title.includes('manualPreference')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'blue'
                styleHandle.color = 'white'
            }
        }

        if (e.currentTarget.title.includes('size')) {
            if (styleHandle.backgroundColor) {
                styleHandle.backgroundColor = null
                styleHandle.color = null
            } else {
                styleHandle.backgroundColor = 'red'
                styleHandle.color = 'white'
            }
        }

        //--Gestion des styles des filtres depuis la section déjà établie dans le but de supprimer un filtre
        if (e.currentTarget.className.includes('filter-selected')) {
            let handleFilterToDelete = document.getElementById(
                e.currentTarget.id
            )
            handleFilterToDelete.style.backgroundColor = null
            handleFilterToDelete.style.color = null
        }

        //--Gestione des filtres
        //***Modèle a reconstituer
        /* selection = {styles: ['Rock']}, {marques: []}, {types: []}, {manualPreference: []}, {size: []}

        //*** Cette fonction permet de savoir si un titre de filtre (ex : styles) est déjà présent dans le tableau selection */
        /** Si oui, l'indice du titre est renvoyé, sinon false */

        //** Reconstitution du modèle ci-dessus en dynamique */
        if (!arrayHasKey(selection, [e.currentTarget.title])) {
            selection.push({ [e.currentTarget.title]: [e.currentTarget.id] })
        } else {
            let indexOfTitleFilter = arrayHasKey(selection, [
                e.currentTarget.title,
            ])[1]
            let targetIsInSelection = selection[indexOfTitleFilter][
                e.currentTarget.title
            ].includes(e.currentTarget.id)
            if (!targetIsInSelection) {
                selection[indexOfTitleFilter][e.currentTarget.title].push(
                    e.currentTarget.id
                )
            } else if (targetIsInSelection) {
                let indexOfTargetInSelection = selection[indexOfTitleFilter][
                    e.currentTarget.title
                ].indexOf(e.currentTarget.id)
                selection[indexOfTitleFilter][e.currentTarget.title].splice(
                    indexOfTargetInSelection,
                    1
                )
                if (
                    selection[indexOfTitleFilter][e.currentTarget.title]
                        .length === 0
                ) {
                    selection.splice(indexOfTitleFilter, 1)
                }
            }
        }
        console.log(selection)
        if (
            selection.length === 0 ||
            selection === undefined ||
            selection === '' ||
            selection === null ||
            selection === []
        ) {
            guitarSelect = guitarList
            setGuitarSelect(guitarSelect)
            setResultIsNull(false)
        } else {
            guitarSelect = Array.from(guitarList).filter((item) => {
                let allFilterAreComplete = 0

                return selection.some((searchInSelection) => {
                    //** Mécanique de gestion des filtres séparés,
                    /** C'est à dire : Afficher toutes les guitares si tous les élément d'un seul filtre sont sélectionnés */
                    if (selection.length === 1) {
                        for (let key in searchInSelection) {
                            for (
                                let a = 0;
                                a < searchInSelection[key].length;
                                a++
                            ) {
                                if (item[key] === searchInSelection[key][a]) {
                                    return item
                                }
                            }
                        }
                        //** Mécanique de gestion des filtres associés,
                        /** C'est à dire : Afficher uniquement les guitares qui répondent aux filtres sélectionnés */
                    } else if (selection.length > 1) {
                        for (let key in searchInSelection) {
                            for (
                                let b = 0;
                                b < searchInSelection[key].length;
                                b++
                            ) {
                                if (searchInSelection[key][b] === item[key]) {
                                    allFilterAreComplete++
                                }
                            }
                        }
                        if (allFilterAreComplete === selection.length) {
                            return item
                        }
                    }
                })
            })
            if (guitarSelect.length === 0) {
                setResultIsNull(true)
            } else {
                setResultIsNull(false)
            }

            setGuitarSelect(guitarSelect)
        }
    }
    let key = 0
    console.log(selection)
    return (
        <>
            <div className="display-options">
                <div className="display-buttons">
                    <div id="styles" className="display-buttons-styles">
                        <div className="display-title">Styles</div>

                        {props.Styles.map((el) => (
                            <button
                                id={el}
                                className="style-button-styles"
                                name={el}
                                value={el}
                                title="style"
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
                </div>

                <div className="display-buttons">
                    <div className="display-buttons-marques">
                        <div className="display-title">Marques</div>

                        {props.Marques.map((e) => (
                            <button
                                id={e}
                                className="style-button-marques"
                                name={e}
                                value={e}
                                title="marque"
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
                </div>
                <div className="display-buttons">
                    <div className="display-buttons-types">
                        <div className="display-title">Types</div>

                        {props.Types.map((e) => (
                            <button
                                id={e}
                                className="style-button-types"
                                name={e}
                                value={e}
                                key={'Types' + key++}
                                title="type"
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
                <div className="display-buttons">
                    <div className="display-buttons-manualPreference">
                        <div className="display-title">Préférence manuelle</div>

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
                                    color: isActiveManualPreference
                                        ? 'white'
                                        : '',
                                }}
                                onClick={handleClick}
                            >
                                {e}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="display-buttons">
                    <div className="display-buttons-size">
                        <div className="display-title">Taille</div>

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
            </div>

            {selection.length !== 0 ? (
                <div className="display-filters-selected">
                    {selection.map((item) => (
                        <div>
                            {Object.entries(item).map(([key, val]) => (
                                <div className="display-delete-filter">
                                    {val.map((filter) => {
                                        return (
                                            <>
                                                {/*                                                 <div
                                                    className="title-filter-selected"
                                                    key={key}
                                                >
                                                    {{ key } === 'style'
                                                        ? 'Styles'
                                                        : ''}
                                                </div> */}
                                                <div
                                                    id={filter}
                                                    className={`filter-selected ${key}`}
                                                    title={key}
                                                    onClick={handleClick}
                                                >
                                                    {` X ${filter}`}
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : null}
            <div className="display-guitars">
                {resultIsNull ? (
                    <ResultIsNull />
                ) : (
                    guitarSelect.map(
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
                    )
                )}
            </div>
        </>
    )
}
