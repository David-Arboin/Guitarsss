/* eslint-disable react-hooks/rules-of-hooks */
import { guitaresList } from '../datas/guitarList'
import { useState, useContext } from 'react'

import '../styles/List.css'
import Marques from '../buttons/Marques'

Marques().then((selection) => console.log(selection))

export default function buttons() {
    /*     const fullDeck = handleClick()
    const Mycomponent = () => {
      //  you can log it on every render, but it will be referencing the exact reference of the same deck on every render
      console.log(fullDeck)
    } */

    return (
        <>
            {/* Affichage */}
            <div className="displayGuitars">
                {guitaresList.map((e) => (
                    <div className="displayInfoGuitar">
                        <h2 id={e.Marque} name={e.Marque} key={e.Marque}>
                            {e.Marque}
                        </h2>
                        <p>{e.Type}</p>
                        <p>{e.Gamme}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
