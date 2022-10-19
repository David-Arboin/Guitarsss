/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/GuitarList.css'

export default function GuitarList(props) {
    return (
        <>
            <div className="display-infos-guitar">
                <img
                    src={props.imageUrl}
                    alt={'propse de marque' + props.marque}
                    className="display-image-guitar"
                />
                <div className='display-text'>
                <h2 id={props.marque} name={props.marque} key={props.id} className="display-text-marque">
                    {props.marque}
                </h2>
                <h3 id={props.style} name={props.style} key={props.style} className="display-text-style">
                    {props.style}
                </h3>
                <p className="display-text-type">{props.type}</p>
                </div>

            </div>
        </>
    )
}
