/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import '../styles/FiltersAndResults.css'
import GuitarList from './GuitarList'


export default function FiltersAndResults(props) {
    let guitarList = props.Data
    //--Gestion du background au click sur les buttons
    const [isActiveStyles, setIsActiveStyles] = useState(false)
    const [isActiveMarques, setIsActiveMarques] = useState(false)
    const [isActiveTypes, setIsActiveTypes] = useState(false)

    const [selectionMarques, setSelectionMarques] = useState([])
    const [selectionStyles, setSelectionStyles] = useState([])
    const [selectionTypes, setSelectionTypes] = useState([])

    let guitarSelect = []

    const handleClickMarques = async (e) => {
        e.preventDefault()

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

    const handleClickStyles = async (el) => {
        el.preventDefault()

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

    const handleClickTypes = async (el) => {
        el.preventDefault()

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
    if (selectionStyles.length > 0 || selectionMarques.length > 0 || selectionTypes.length > 0) {
        guitarSelect = [...selectionStyles, ...selectionMarques, ...selectionTypes].filter(
            (val, id, array) => array.indexOf(val) == id
        )
    } else {
        guitarSelect = guitarList
    }
    let key = 0
    return (
        <>
            <div className="display-options">
                <div className="display-buttons-styles">
                    Styles
                    {props.Styles.map((el) => (
                        <button
                            id={el}
                            className="style-button-styles"
                            name={el}
                            value={el}
                            key={'Styles' + key++}
                            style={{
                                backgroundColor: isActiveStyles
                                    ? 'rgb(32, 190, 190)'
                                    : '',
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
                    {props.Marques.map((e) => (
                        <button
                            id={e}
                            className="style-button-marques"
                            name={e}
                            value={e}
                            key={'Marques' + key++}
                            style={{
                                backgroundColor: isActiveMarques
                                    ? 'rgb(84, 93, 93)'
                                    : '',
                                color: isActiveMarques ? 'white' : '',
                            }}
                            onClick={handleClickMarques}
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
                            style={{
                                backgroundColor: isActiveTypes
                                    ? 'rgb(84, 93, 93)'
                                    : '',
                                color: isActiveTypes ? 'white' : '',
                            }}
                            onClick={handleClickTypes}
                        >
                            {e}
                        </button>
                    ))}
                </div>
            </div>

            <div className="display-guitars">
                {guitarSelect.map(
                    ({ _id, style, marque, type, imageUrl, majeur, manualPreference
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
                        />
                    )
                )}
            </div>
        </>
    )
}
