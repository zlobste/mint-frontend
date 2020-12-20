import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'
import { useTranslation } from 'react-i18next'
import { Button, Text, Col, Row } from 'atomize'

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
                    <Col size="2">{isAuthenticated && <Navbar />}</Col>
                    <Col size="10">
                        <div className="container">{routes}</div>
                    </Col>
                </Row>
                <LanguageSwitcher />
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
                <Row>
                    <Col size="5" />
                    <Col size="2">
                        <Text
                            tag="span"
                            textAlign="center"
                            textSize="caption"
                            textColor="info700"
                            fontFamily="primary"
                        >
                            Switch language
                        </Text>
                        <Row>
                            <Button
                                h="2rem"
                                p={{ x: '0.75rem' }}
                                textSize="caption"
                                textColor="info700"
                                hoverTextColor="info900"
                                bg="white"
                                hoverBg="info200"
                                border={
                                    i18n.language === 'uk'
                                        ? '1px solid'
                                        : 'none'
                                }
                                borderColor="info700"
                                m={{ r: '0.5rem' }}
                                onClick={() => changeLanguage('uk')}
                            >
                                uk
                            </Button>
                            <Button
                                h="2rem"
                                p={{ x: '0.75rem' }}
                                textSize="caption"
                                textColor="info700"
                                hoverTextColor="info900"
                                bg="white"
                                hoverBg="info200"
                                border={
                                    i18n.language === 'en'
                                        ? '1px solid'
                                        : 'none'
                                }
                                borderColor="info700"
                                hoverBorderColor="info900"
                                m={{ r: '0.5rem' }}
                                onClick={() => changeLanguage('en')}
                            >
                                en
                            </Button>
                        </Row>
                    </Col>
                    <Col size="5" />
                </Row>
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
