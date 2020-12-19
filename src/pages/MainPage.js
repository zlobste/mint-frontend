import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { Card } from '../components/Card'
import { Input, Button, Icon, Container, Col, Row, Text, Div } from 'atomize'

export const MainPage = () => {
    const [user, setUser] = useState({})
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

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && (
                <Container>
                    <ul>
                        <li>{user.name}</li>
                        <li>{user.email}</li>
                    </ul>
                    <Row>
                        <Col size="3">
                            <Card image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" />
                        </Col>
                        <Col size="3">
                            <Card image="https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg" />
                        </Col>
                        <Col size="3">
                            <Card image="https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg" />
                        </Col>
                        <Col size="3">
                            <Card image="https://image.shutterstock.com/image-photo/ancient-temple-ruins-gadi-sagar-260nw-786126286.jpg" />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}
