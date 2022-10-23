/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/GuitarList.css'
import { useContext, useEffect } from 'react'
import { DeleteActiveContext } from '../App'
import { TokenContext } from '../App'


export default function GuitarList(props) {
    let [token, setToken] = useContext(TokenContext)

    let [deleteActive, setDeleteActive] = useContext(DeleteActiveContext)


           //****************Suppression d'une guitare
    const handleDelete = async (event) => {
        event.preventDefault()
        let target = event.target.id
        const requestOptionsDelete = {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + token },
        }
        fetch(
            'http://localhost:8000/guitarsss/posts/' + target,
            requestOptionsDelete
        )
            .then((response) => response.json())
            .then((data) => {console.log('Gratte supprimée');
/*                 const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                }
                const newArrayPosts = fetch(
                    'http://localhost:8000/guitarsss/posts',
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((data) => {
                        const posts = data.slice().sort(function (a, b) {
                            return new Date(b.createdAt) - new Date(a.createdAt)
                        })
                        setPosts(posts)
                    }) */
            })
}

    return (
        <>
            <div className="display-infos-guitar">
                <img
                    src={props.imageUrl}
                    alt={'propse de marque' + props.marque}
                    className="display-image-guitar"
                />
                <div className="display-text">
                    <h2
                        id={props.marque}
                        name={props.marque}
                        key={props.id}
                        className="display-text-marque"
                    >
                        {props.marque}
                    </h2>
                    <h3
                        id={props.style}
                        name={props.style}
                        key={props.style}
                        className="display-text-style"
                    >
                        {props.style}
                    </h3>
                    <p className="display-text-type">{props.type}</p>
                </div>
                {deleteActive ? (
                    <div
                        id={props.id}
                        className="display-delete"
                        onClick={handleDelete}
                    >
                        🧺
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    )
}
