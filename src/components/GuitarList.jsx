/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/GuitarList.css'

export default function List(guitar) {
    return (
        <>
            <div className="displayInfoGuitar">
                <img
                    src={guitar.cover}
                    alt={'Guitare de marque' + guitar.Marque}
                    className="displayImageGuitar"
                />
                <h2 id={guitar.Marque} name={guitar.Marque} key={guitar.id}>
                    {guitar.Marque}
                </h2>
                <p>{guitar.Type}</p>
                <p>{guitar.Gamme}</p>
            </div>
        </>
    )
}
