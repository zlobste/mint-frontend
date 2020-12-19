import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'
import { useTranslation } from 'react-i18next'

function Main() {
    const { token, login, logout, userId, ready } = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                isAuthenticated,
            }}
        >
            <Router>
                <LanguageSwitcher />
                {isAuthenticated && <Navbar />}
                <div className="container">{routes}</div>
            </Router>
        </AuthContext.Provider>
    )
}

export const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }

    return (
        <div className="App">
            <div className="App-header">
                <button onClick={() => changeLanguage('uk')}>uk</button>
                <button onClick={() => changeLanguage('en')}>en</button>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <Suspense fallback="loading">
            <Main />
        </Suspense>
    )
}
