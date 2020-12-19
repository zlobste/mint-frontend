import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Div, Button, SideDrawer, Icon, Text } from 'atomize'

const SizeSideDrawer = ({ isOpen, onClose }) => {
    return (
        <SideDrawer
            isOpen={isOpen}
            onClose={onClose}
            w={{ xs: '100vw', sm: '24rem' }}
        >
            <Div d="flex" m={{ b: '4rem' }}>
                <Icon name="AlertSolid" color="warning700" />
                <Text p={{ l: '0.5rem', t: '0.25rem' }}>This is the modal</Text>
            </Div>
            <Div d="flex" justify="flex-end">
                <Button
                    onClick={onClose}
                    bg="gray200"
                    textColor="medium"
                    m={{ r: '1rem' }}
                >
                    Cancel
                </Button>
                <Button onClick={onClose} bg="info700">
                    Submit
                </Button>
            </Div>
        </SideDrawer>
    )
}

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [drawerVisibility, setDrawerVisibility] = useState(false)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <>
            <Button
                bg="info700"
                hoverBg="info600"
                m={{ r: '0.5rem' }}
                onClick={() => setDrawerVisibility(true)}
            >
                Menu
            </Button>

            <NavLink to="/create">Main</NavLink>

            <a href="/" onClick={logoutHandler}>
                Log out
            </a>

            <SizeSideDrawer
                isOpen={drawerVisibility}
                onClose={() => setDrawerVisibility(false)}
            />
        </>
    )
}
