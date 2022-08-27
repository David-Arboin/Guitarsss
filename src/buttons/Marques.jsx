/* eslint-disable react-hooks/rules-of-hooks */
import { guitaresList } from '../datas/guitarList'
import { useState } from 'react'
import '../styles/Marques.css'

export default function Marques(someParam) {
    const Marques = guitaresList.reduce((unique, item) => {
        return unique.includes(item.Marque) ? unique : [...unique, item.Marque]
    }, [])

    //--Gestion du backgroun au click sur les buttons
    const [isActive, setIsActive] = useState(false)
    const [selection, setSelection] = useState([])


    const handleClick = async (e) => {
        e.preventDefault()

        let guitarSelection = []

        guitarSelection = guitaresList.find(
            (element) => element.Marque === e.currentTarget.id
        )

        if (selection.length === 0) {
            setSelection([...selection, guitarSelection])
        } else if (
            selection.length !== 0 &&
            !selection.some((element) => element.Marque === e.currentTarget.id)
        ) {
            setSelection([...selection, guitarSelection])
        } else if (
            selection.length !== 0 &&
            selection.some((element) => element.Marque === e.currentTarget.id)
        ) {
            setSelection(selection.filter(function (item) {
                return item.Marque !== e.currentTarget.id
            }))
        }
        if (e.currentTarget.style.backgroundColor) {
            e.currentTarget.style.backgroundColor = null
            e.currentTarget.style.color = null
        } else {
            e.currentTarget.style.backgroundColor = 'salmon'
            e.currentTarget.style.color = 'white'
        }        
    }
console.log("selection", selection);
    return (
        <>
            <div className="display-buttons-marques">
                Marques
                {Marques.map((e) => (
                    <button
                        id={e}
                        name={e}
                        value={e}
                        key={e}
                        style={{
                            backgroundColor: isActive ? 'salmon' : '',
                            color: isActive ? 'white' : '',
                        }}
                        onClick={handleClick}
                    >
                        {e}
                    </button>
                ))}
            </div>
        </>
    )
}
