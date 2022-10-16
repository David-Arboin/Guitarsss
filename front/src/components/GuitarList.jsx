/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/GuitarList.css'

export default function GuitarList(guitar) {
    return (
        <>
            <div className="display-infos-guitar">
                <img
                    src={guitar.cover}
                    alt={'Guitare de marque' + guitar.Marque}
                    className="display-image-guitar"
                />
                <div className='display-text'>
                <h2 id={guitar.Marque} name={guitar.Marque} key={guitar.id} className="display-text-marque">
                    {guitar.Marque}
                </h2>
                <h3 id={guitar.Style} name={guitar.Style} key={guitar.Style} className="display-text-style">
                    {guitar.Style}
                </h3>
                <p className="display-text-type">{guitar.Type}</p>
                <p className="display-text-gamme">{guitar.Gamme}</p>
                </div>

            </div>
        </>
    )
}
