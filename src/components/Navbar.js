import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {
    Div,
    Button,
    SideDrawer,
    Icon,
    Text,
    Col,
    Row,
    Input,
    Container,
} from 'atomize'
import { useTranslation } from 'react-i18next'

export const Navbar = ({ isAuthenticated }) => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { t, i18n } = useTranslation()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <>
            <Col bg="white" shadow="4" minW="15rem" minH="58rem">
                <Row>
                    <Input
                        placeholder={t('nav.search')}
                        minW="15rem"
                        suffix={
                            <Icon
                                name="Search"
                                size="20px"
                                cursor="pointer"
                                onClick={() => console.log('clicked')}
                                pos="absolute"
                                top="50%"
                                right="1rem"
                                transform="translateY(-50%)"
                            />
                        }
                        m={{
                            x: { xs: '1rem', md: '1rem', lg: '1rem' },
                            y: { xs: '0.5rem', md: '0.5rem', lg: '0.5rem' },
                        }}
                    />
                </Row>
                <Row>
                    <Button
                        h="2.5rem"
                        p={{ x: '1rem' }}
                        textColor="info700"
                        hoverTextColor="info900"
                        bg="info300"
                        hoverBg="info400"
                        border="1px solid"
                        borderColor="info800"
                        hoverBorderColor="info900"
                        minW="15rem"
                        m={{
                            x: { xs: '1rem', md: '1rem', lg: '1rem' },
                            y: { xs: '0.5rem', md: '0.5rem', lg: '0.5rem' },
                        }}
                        onClick={() => history.push('/create')}
                    >
                        {t('nav.main')}
                    </Button>
                </Row>

                {isAuthenticated && (
                    <Row>
                        <Button
                            h="2.5rem"
                            p={{ x: '1rem' }}
                            textColor="info700"
                            hoverTextColor="info900"
                            bg="info300"
                            hoverBg="info400"
                            border="1px solid"
                            borderColor="info800"
                            hoverBorderColor="info900"
                            minW="15rem"
                            m={{
                                x: { xs: '1rem', md: '1rem', lg: '1rem' },
                                y: { xs: '0.5rem', md: '0.5rem', lg: '0.5rem' },
                            }}
                            onClick={logoutHandler}
                        >
                            {t('nav.orders')}
                        </Button>
                    </Row>
                )}
                <Row>
                    <Button
                        h="2.5rem"
                        p={{ x: '1rem' }}
                        textColor="info700"
                        hoverTextColor="info900"
                        bg="info300"
                        hoverBg="info400"
                        border="1px solid"
                        borderColor="info800"
                        hoverBorderColor="info900"
                        minW="15rem"
                        m={{
                            x: { xs: '1rem', md: '1rem', lg: '1rem' },
                            y: { xs: '0.5rem', md: '0.5rem', lg: '0.5rem' },
                        }}
                        onClick={logoutHandler}
                    >
                        {isAuthenticated ? t('nav.logOut') : t('nav.logIn')}
                    </Button>
                </Row>

                <Row>
                    <Container
                        align="center"
                        justify="space-between"
                        flexDir="column"
                        minW="15rem"
                        p={{
                            l: { xs: '6rem', md: '6rem', lg: '6rem' },
                            y: { xs: '4rem', md: '4rem', lg: '4rem' },
                        }}
                    >
                        <Row align="center">
                            <Text
                                tag="span"
                                textAlign="center"
                                textSize="paragraph"
                                textColor="info700"
                                fontFamily="primary"
                                align="center"
                            >
                                {t('nav.switchLanguage')}
                            </Text>
                        </Row>
                        <Row align="center">
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
                    </Container>
                </Row>
            </Col>
        </>
    )
}
