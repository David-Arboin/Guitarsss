import { useState } from 'react'
import React from 'react'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const TokenContext = React.createContext()

/* import Page from './page.jsx' */

export default function App() {
    const [token, setToken] = useState()

    return (
        <Router>
            <TokenContext.Provider value={[token, setToken]}>
                <Routes>
                    <Route HomePage path="/" element={<HomePage />} />
                    <Route LoginPage path="/work" element={<LoginPage />} />
                </Routes>
            </TokenContext.Provider>
        </Router>
    )
}
