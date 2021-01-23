import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { Container, Col, Row } from 'atomize'
import { AuthContext } from '../../context/AuthContext'

export const OrderManageForm = () => {
    const { request } = useHttp()
    const { token } = useContext(AuthContext)
    const [orders, setOrders] = useState([])

    const getOrders = useCallback(async () => {
        try {
            const data = await request('/api/order/all', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setOrders(data)
        } catch (e) {
        }
    }, [token, request])

    const cancelOrder = async (id) => {
        try {
            console.log('blockUser: ', id)
            const data = await request(
                `/api/order/edit/cancel/${id}`,
                'POST',
                null,
                {
                    Authorization: `Bearer ${token}`,
                },
            )
            await getOrders()
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getOrders()
    }, [getOrders])

    return (
        <Container m={{ xs: '5rem', md: '5rem', lg: '5rem' }}>
            <Row border='none' rounded='md'>
                <Col size='12'>
                    <OrdersList orders={orders} cancelOrder={cancelOrder} />
                </Col>
            </Row>
        </Container>
    )
}