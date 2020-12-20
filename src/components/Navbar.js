import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Div, Button, SideDrawer, Icon, Text, Col, Row } from 'atomize'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <>
            <Col bg="info600">
                <Row>
                    <Button
                        h="2.5rem"
                        p={{ x: '1rem' }}
                        textSize="body"
                        textColor="info700"
                        hoverTextColor="info900"
                        bg="white"
                        hoverBg="info200"
                        border="1px solid"
                        borderColor="info700"
                        hoverBorderColor="info900"
                        m={{ r: '0.5rem' }}
                        onClick={() => history.push('/create')}
                    >
                        Main
                    </Button>
                </Row>

                <Row>
                    <Button
                        h="2.5rem"
                        p={{ x: '1rem' }}
                        textSize="body"
                        textColor="info700"
                        hoverTextColor="info900"
                        bg="white"
                        hoverBg="info200"
                        border="1px solid"
                        borderColor="info700"
                        hoverBorderColor="info900"
                        m={{ r: '0.5rem' }}
                        onClick={logoutHandler}
                    >
                        Log out
                    </Button>
                </Row>
            </Col>
        </>
    )
}
