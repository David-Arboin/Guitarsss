/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/Work.css'
import React, { useRef } from 'react'
import { TokenContext } from '../App'
import '../styles/LoadingSpinner.css'

export default function Work(props) {
    console.log(props)
    //--Suppression des doublons des filtres

    let [token, setToken] = React.useContext(TokenContext)
    const inputs = useRef([])
    const addInputs = (el) => {
        inputs.current.push(el)
    }

    const handleForm = (event, props) => {
        event.preventDefault()
        const form = event.target
        const formData = new FormData()

        const requestOptionsCreate = {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData,
        }
        formData.append('image', form[0].files[0])
        formData.append('style', form[1].value[0])
        formData.append('marque', form[2].value[0])
        formData.append('type', form[3].value[0])
        formData.append('majeur', form[4].value[0])
        formData.append('manualPreference', form[5].value[0])
        fetch('http://localhost:8000/guitarsss/posts', requestOptionsCreate)
            .then((response) => response.json())
            .then((data) => {
                form.reset()
            })
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
                    <select id="style" name="style" ref={addInputs}>
                        <option disabled selected value>
                            Quel style ?
                        </option>
                        {/* {props.Style.map((e) => 
                            <option key={}>{e.marque}</option>
                        )} */}
                    </select>

                    <label htmlFor="marque">Marque</label>
                    <select id="marque" name="marque" ref={addInputs}>
                        <option disabled selected value>
                            Quelle marque ?
                        </option>

                        <option>Volvo</option>
                        <option>Saab</option>
                        <option>Fiat</option>
                        <option>Audi</option>
                    </select>

                    <label htmlFor="type">Type</label>
                    <select id="type" name="type" ref={addInputs}>
                        <option disabled selected value>
                            Quel type ?
                        </option>

                        <option>type1</option>
                        <option>type2</option>
                        <option>type3</option>
                        <option>type4</option>
                    </select>

                    <h2>Mineur ou Majeur</h2>
                    <div>
                        <input
                            name="age"
                            type="radio"
                            ref={addInputs}
                            id="Minor"
                        />
                        <label htmlFor="Minor">Mineur</label>
                    </div>
                    <div>
                        <input
                            name="age"
                            type="radio"
                            ref={addInputs}
                            id="Major"
                        />
                        <label htmlFor="Major">Majeur</label>
                    </div>

                    <h2>Préférence manuelle</h2>
                    <div>
                        <input
                            name="manualPreference"
                            type="radio"
                            ref={addInputs}
                            id="right-handed"
                        />
                        <label htmlFor="right-handed">Droitier</label>
                    </div>
                    <div>
                        <input
                            name="manualPreference"
                            type="radio"
                            ref={addInputs}
                            id="left-handed"
                        />
                        <label htmlFor="left-handed">Gaucher</label>
                    </div>
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
