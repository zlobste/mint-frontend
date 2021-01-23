import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'
import { Col, Row, Container } from 'atomize'

export default function App() {
    return (
        <Suspense fallback='loading'>
            <Main />
        </Suspense>
    )
}

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
                <Row>
                    <Col size='2' d='flex' justify='flex-end'>
                        <Navbar
                            isAuthenticated={isAuthenticated}
                            userId={userId}
                        />
                    </Col>
                    <Col size='10'>
                        <Container>{routes}</Container>
                    </Col>
                </Row>
            </Router>
        </AuthContext.Provider>
    )
}
