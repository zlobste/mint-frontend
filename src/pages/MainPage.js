import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { Card } from '../components/Card'
import {
    Input,
    Button,
    Icon,
    Container,
    Col,
    Row,
    Text,
    Div,
    Modal,
} from 'atomize'

export const MainPage = () => {
    const [user, setUser] = useState({})
    const [dishes, setDishes] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchUserInfo = useCallback(async () => {
        try {
            const fetched = await request('/api/user/info', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setUser(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchUserInfo()
    }, [fetchUserInfo])

    const getDishes = useCallback(async () => {
        try {
            const data = await request('/api/dish/all', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setDishes(data)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        getDishes()
    }, [getDishes])

    if (loading) {
        return <Loader />
    }

    return (
        <Div>
            {!loading && (
                <Container
                    p={{
                        y: { xs: '5rem', md: '5rem', lg: '5rem' },
                    }}
                >
                    {user.name} {user.email}
                    <Row>
                        {dishes.map((dish, key) => {
                            return (
                                <Col size="3" p="1rem">
                                    <Card
                                        image="https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg"
                                        dish={dish}
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            )}
        </Div>
    )
}

const AlignCenterModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} align="center" rounded="md">
            <Icon
                name="Cross"
                pos="absolute"
                top="1rem"
                right="1rem"
                size="16px"
                onClick={onClose}
                cursor="pointer"
            />
            <Div d="flex" m={{ b: '4rem' }}>
                <Icon
                    name="AlertSolid"
                    color="warning700"
                    m={{ t: '0.35rem', r: '0.5rem' }}
                />
                <Text p={{ l: '0.5rem', t: '0.25rem' }} textSize="subheader">
                    Do you really want to submit the request.
                </Text>
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
                    Yes, Submit
                </Button>
            </Div>
        </Modal>
    )
}
