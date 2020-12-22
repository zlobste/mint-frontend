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
    SideDrawer,
} from 'atomize'
import { useTranslation } from 'react-i18next'

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
                                        image="https://images11.bazaar.ru/upload/custom/0c2/0c2f4c9cfed56b3b284070d5772e10a6.jpg"
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

const SizeSideDrawer = ({ isOpen, onClose, dish }) => {
    const { t } = useTranslation()
    const { request } = useHttp()
    const { token } = useContext(AuthContext)

    const createOrder = async () => {
        try {
            const data = await request(
                '/api/order/edit/create',
                'POST',
                {
                    cost: Number(dish.cost),
                    datetime: new Date(),
                    dish_id: Number(dish.id),
                },
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            onClose()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <SideDrawer
            isOpen={isOpen}
            onClose={onClose}
            w={{ xs: '100vw', sm: '32rem' }}
        >
            <Div d="flex" m={{ b: '4rem' }}>
                <Text p={{ l: '0.5rem', t: '0.25rem' }}>
                    {t('order.modal.title')}
                </Text>
            </Div>
            <Div d="flex" m={{ b: '1rem' }}>
                <Text p={{ l: '0.5rem', t: '0.25rem' }}>
                    {dish.title} ${dish.cost}
                </Text>
            </Div>
            <Div d="flex" m={{ b: '1rem' }}>
                <Text p={{ l: '0.5rem', t: '0.25rem' }}>
                    {dish.description}
                </Text>
            </Div>
            <Div d="flex" justify="flex-end">
                <Button
                    onClick={onClose}
                    bg="gray200"
                    textColor="medium"
                    m={{ r: '1rem' }}
                >
                    {t('order.modal.cancel')}
                </Button>
                <Button onClick={createOrder} bg="info700">
                    {t('order.modal.order')}
                </Button>
            </Div>
        </SideDrawer>
    )
}
