import { useState } from 'react'
import React from 'react'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const TokenContext = React.createContext()
export const DeleteActiveContext = React.createContext()
export const DataContext = React.createContext()

/* import Page from './page.jsx' */

export default function App() {
    const [token, setToken] = useState()
    const [data, setData] = useState()
    const [deleteActive, setDeleteActive] = useState(false)

    return (
        <Router>
            <DataContext.Provider value={[data, setData]}>
                <TokenContext.Provider value={[token, setToken]}>
                    <DeleteActiveContext.Provider
                        value={[deleteActive, setDeleteActive]}
                    >
                        <Routes>
                            <Route HomePage path="/" element={<HomePage />} />
                            <Route
                                LoginPage
                                path="/work"
                                element={<LoginPage />}
                            />
                        </Routes>
                    </DeleteActiveContext.Provider>
                </TokenContext.Provider>
            </DataContext.Provider>
        </Router>
    )
}
