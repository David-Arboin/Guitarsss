/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/Work.css'
import React, { useRef, useState } from 'react'
import { TokenContext } from '../App'
import { useContext } from 'react'
import { DeleteActiveContext } from '../App'
import { DataContext } from '../App'
import '../styles/LoadingSpinner.css'

export default function Work(props) {
    const production =
    'https://guitarsss.herokuapp.com/guitarsss/posts/'
const developpement = 'http://localhost:8000/guitarsss/posts'
    //--Personnalisation des keys
    let keyStyles = 0
    let keyMarques = 0
    let keyTypes = 0

    //--Import data
    let [data, setData] = useContext(DataContext)
    //--Gestion des input de type radio
    const [size, setSize] = useState()
    const [manualPreference, setManualPreference] = useState()

    //--Possibilit√© d'ajouter un style une marque ou un type
    const [addStyle, setAddStyle] = useState(false)
    const [addMarque, setAddMarque] = useState(false)
    const [addType, setAddType] = useState(false)
    const [writeInStyle, setWriteInStyle] = useState(false)
    const [writeInMarque, setWriteInMarque] = useState(false)
    const [writeInType, setWriteInType] = useState(false)

    let [deleteActive, setDeleteActive] = useContext(DeleteActiveContext)

    const handleAddStyle = (e) => {
        if (e.target.value === 'Ajouter un style') {
            setAddStyle(true)
        } else {
            setAddStyle(false)
        }
    }

    const writingInStyle = (e) => {
        if (e.target.value !== '') {
            setWriteInStyle(true)
        } else if (e.target.value === '') {
            setWriteInStyle(false)
        }
    }

    const initialisedChooseStyle = (e) => {
        if (addStyle && !writeInStyle) {
            setAddStyle(false)
        }
    }

    const handleAddMarque = (e) => {
        if (e.target.value === 'Ajouter une marque') {
            setAddMarque(true)
        } else {
            setAddMarque(false)
        }
    }

    const writingInMarque = (e) => {
        if (e.target.value !== '') {
            setWriteInMarque(true)
        } else if (e.target.value === '') {
            setWriteInMarque(false)
        }
    }

    const initialisedChooseMarque = (e) => {
        if (addMarque && !writeInMarque) {
            setAddMarque(false)
        }
    }

    const handleAddType = (e) => {
        if (e.target.value === 'Ajouter un type') {
            setAddType(true)
        } else {
            setAddType(false)
        }
    }

    const writingInType = (e) => {
        if (e.target.value !== '') {
            setWriteInType(true)
        } else if (e.target.value === '') {
            setWriteInType(false)
        }
    }

    const initialisedChooseType = (e) => {
        if (addType && !writeInType) {
            setAddType(false)
        }
    }

    //--Gestion du formulaire
    let [token, setToken] = useContext(TokenContext)
    const inputs = useRef([])
    const addInputs = (el) => {
        inputs.current.push(el)
    }

    const handleSizeChange = (e) => {
        setSize(e.target.value)
    }
    const handleManualPreferenceChange = (e) => {
        setManualPreference(e.target.value)
    }

    const handleForm = (event, props) => {
        event.preventDefault()

        console.log(size);
        console.log(manualPreference);

        const form = event.target
        const formData = new FormData()
        const requestOptionsCreate = {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData,
        }
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }

        if (form[0].files[0] === undefined) {
            alert("Pas d'image")
        } else if (form[1].value === '' || form[1].value === 'DEFAULT') {
            alert('Quel style ?')
        } else if (form[2].value === '' || form[2].value === 'DEFAULT') {
            alert('Quelle marque ?')
        } else if (form[3].value === '' || form[3].value === 'DEFAULT') {
            alert('Quel type ?')
        } else if (size === undefined) {
            alert('Est-ce pour mineur ou size ?')
        } else if (manualPreference === undefined) {
            alert('Est-ce pour droitier ou gaucher ?')
        } else {
            formData.append('image', form[0].files[0])
            formData.append('style', form[1].value)
            formData.append('marque', form[2].value)
            formData.append('type', form[3].value)
            formData.append('size', size)
            formData.append('manualPreference', manualPreference)
            fetch(process.env.REACT_APP_ENVIRONMENT === 'production' ? production : developpement,
            requestOptionsCreate)
                .then((response) => response.json())
                .then((data) => {
                    fetch(
                        process.env.REACT_APP_ENVIRONMENT === 'production' ? production : developpement,
                        requestOptions
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setData(data)
                            alert('Gratte enregistr√©e !')
                            form.reset()
                            setAddStyle(false)
                            setAddMarque(false)
                            setAddType(false)
                        })
               /*          .catch(alert('Il y a un PB dans le GET')) */
                })
              /*   .catch(alert('Il y a un probl√®me dans le POST')) */
        }
    }

    //--Gestion de la possibilit√© de supprimer une guitare
    const displayDelete = (e) => {
        e.preventDefault()
        if (deleteActive) {
            setDeleteActive(false)
        } else if (!deleteActive) {
            setDeleteActive(true)
        }
    }

    return (
        <>
            <div className="display-work">
                <h1>Ton interface pour saisir la prochaine GRATTE </h1>
                <form className="display-form" onSubmit={handleForm}>
                    <label htmlFor="image" id="image">
                        Choisi une image
                    </label>
                    <input
                        name="image"
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={addInputs}
                        id="image"
                        alt="image d'une guitare de marque"
                    />
                    <label htmlFor="style" className="widthTextNameOrPseeudo">
                        Style
                    </label>
                    {addStyle ? (
                        <input
                            type="text"
                            onBlur={initialisedChooseStyle}
                            onChange={writingInStyle}
                        />
                    ) : (
                        <select
                            id="style"
                            name="style"
                            ref={addInputs}
                            defaultValue={'DEFAULT'}
                            onChange={handleAddStyle}
                        >
                            <option value="DEFAULT" disabled>
                                Quel style ?
                            </option>
                            {props.Styles.map((e) => (
                                <option key={'e' + keyStyles++}>{e}</option>
                            ))}

                            <option key="addStyleKey">Ajouter un style</option>
                        </select>
                    )}
                    <label htmlFor="marque">Marque</label>
                    {addMarque ? (
                        <input
                            type="text"
                            onBlur={initialisedChooseMarque}
                            onChange={writingInMarque}
                        />
                    ) : (
                        <select
                            id="marque"
                            name="marque"
                            ref={addInputs}
                            defaultValue={'DEFAULT'}
                            onChange={handleAddMarque}
                        >
                            <option value="DEFAULT" disabled>
                                Quelle marque ?
                            </option>
                            {props.Marques.map((e) => (
                                <option key={e + keyMarques++}>{e}</option>
                            ))}
                            <option key="addMarqueKey">
                                Ajouter une marque
                            </option>
                        </select>
                    )}
                    <label htmlFor="type">Type</label>
                    {addType ? (
                        <input
                            type="text"
                            onBlur={initialisedChooseType}
                            onChange={writingInType}
                        />
                    ) : (
                        <select
                            id="type"
                            name="type"
                            ref={addInputs}
                            defaultValue={'DEFAULT'}
                            onChange={handleAddType}
                        >
                            <option value="DEFAULT" disabled>
                                Quel type ?
                            </option>

                            {props.Types.map((e) => (
                                <option key={e + keyTypes++}>{e}</option>
                            ))}
                            <option key="addTypeKey">Ajouter un type</option>
                        </select>
                    )}
                    <h2>Taille</h2>
                    <div>
                        <input
                            type="radio"
                            name="size"
                            value="Enfant"
                            onChange={handleSizeChange}
                            checked={size === 'Enfant'}
                        />
                        <label htmlFor="mineur">Enfant</label>
                        <input
                            type="radio"
                            name="size"
                            value="Adulte"
                            onChange={handleSizeChange}
                            checked={size === 'Adulte'}
                        />
                        <label htmlFor="size">Adulte</label>
                    </div>
                    <h2>Pr√©f√©rence manuelle</h2>
                    <div>
                        <input
                            type="radio"
                            name="manualPreference"
                            value="Droitier"
                            onChange={handleManualPreferenceChange}
                            checked={manualPreference === 'Droitier'}
                        />
                        Droitier
                        <input
                            type="radio"
                            name="manualPreference"
                            value="Gaucher"
                            onChange={handleManualPreferenceChange}
                            checked={manualPreference === 'Gaucher'}
                        />
                        Gaucher
                    </div>
                    <button
                        className="display-delete-button"
                        onClick={displayDelete}
                        style={{
                            background: deleteActive ? 'orange' : 'green',
                        }}
                    >
                        Activer la petite corbeille sur chaque gratte pour en
                        supprimer une ūüė®
                    </button>
                    <input
                        type="submit"
                        value="Enregistrer la NEW GRATTE"
                        id="backgroudColorSubmitSignUp"
                    />
                </form>
            </div>
        </>
    )
}
