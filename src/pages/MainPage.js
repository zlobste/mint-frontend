import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { Card } from '../components/Card'
import { Container, Col, Row, Div } from 'atomize'
import { SizeSideDrawer } from '../components/SizeSideDrawer'

export const MainPage = () => {
    const [user, setUser] = useState({})
    const [dishes, setDishes] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [dish, setDish] = useState({})

    const fetchUserInfo = useCallback(async () => {
        try {
            const fetched = await request('/api/user/info', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setUser(fetched)
        } catch (e) {
        }
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
        } catch (e) {
        }
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
                                <Col size='3' p='1rem'>
                                    <Card
                                        image={dish.image}
                                        dish={dish}
                                        setModalVisibility={setModalVisibility}
                                        setDish={setDish}
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                    <SizeSideDrawer
                        isOpen={modalVisibility}
                        onClose={() => setModalVisibility(false)}
                        dish={dish}
                    />
                </Container>
            )}
        </Div>
    )
}