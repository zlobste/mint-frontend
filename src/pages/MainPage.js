import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { Card } from '../components/Card'
import { Input, Button, Icon, Container, Col, Row, Text, Div } from 'atomize'

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
        <>
            {!loading && (
                <Container>
                    {user.name} {user.email}
                    <Row>
                        {dishes.map((dish, key) => {
                            if (key % 4 !== 0) {
                                return (
                                    <Col size="3">
                                        <Card
                                            image="https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg"
                                            dish={dish}
                                        />
                                    </Col>
                                )
                            }
                            return <br />
                        })}
                    </Row>
                </Container>
            )}
        </>
    )
}
