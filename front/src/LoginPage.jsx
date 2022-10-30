import React, { useState, useEffect } from 'react'
import { TokenContext } from './App'
import { useNavigate } from 'react-router-dom'

import './styles/LoginPages.css'

function LoginPage() {
        const production =
        'https://guitarsss.herokuapp.com/guitarsss/auth/login/'
    const developpement = 'http://localhost:8000/guitarsss/auth/login'
    // React States
    const [errorMessages, setErrorMessages] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const navigate = useNavigate()

    let [token, setToken] = React.useContext(TokenContext)

    const errors = {
        uname: 'invalid username',
        pass: 'invalid password',
    }

    let userId = ''

    useEffect(() => {
      setToken(undefined)
  }, [])

    const handleSubmit = (e) => {
        //Prevent page reload
        e.preventDefault()

        if (e.target[0].value === '' || e.target[1].value === '') {
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: e.target[0].value,
                    password: e.target[1].value,
                }),
            }
            fetch(process.env.REACT_APP_ENVIRONMENT === 'production' ? production : developpement,
             requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.userId === undefined) {
                        alert('OUPS')
                    } else {
                        userId = data.userId
                        setToken(data.token)
                        navigate('/')
                    }
                })
                .catch(function (error) {
                    alert('OUPS ! Essayes encore')
                })
        }
    }

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        )

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Login </label>
                    <input
                        type="text"
                        name="uname"
                        required
                        placeholder="Toi seul le sait !"
                    />
                    {renderErrorMessage('uname')}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input
                        type="password"
                        name="pass"
                        required
                        placeholder="Tou conney"
                    />
                    {renderErrorMessage('pass')}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    )

    return (
        <div className="display-login-page">
            <div className="login-form">
                <div className="title">Connecte-toi mon poulet</div>
                {isSubmitted ? (
                    <div>User is successfully logged in</div>
                ) : (
                    renderForm
                )}
            </div>
        </div>
    )
}

export default LoginPage
