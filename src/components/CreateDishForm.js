import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'
import {
    Input,
    Button,
    Icon,
    Container,
    Col,
    Row,
    Text,
    Div,
    Textarea,
} from 'atomize'
import { AuthContext } from '../context/AuthContext'

export const CreateDishForm = () => {
    const { request } = useHttp()
    const { token } = useContext(AuthContext)
    const [form, setForm] = useState({
        title: '',
        description: '',
        cost: '',
    })
    const [dishes, setDishes] = useState([])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createDish = async () => {
        try {
            console.log(form)
            const data = await request(
                '/api/dish/edit/create',
                'POST',
                { ...form, cost: Number(form.cost) },
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            await getDishes()
        } catch (e) {
            console.error(e)
        }
    }

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

    return (
        <Container>
            <Row border="2px dashed" borderColor="info700" rounded="md">
                <Col>
                    <DishList dishes={dishes} />
                </Col>

                <Col size={6}>
                    <Input
                        placeholder="title"
                        name="title"
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        value={form.title}
                        onChange={changeHandler}
                    />
                    <Input
                        type="number"
                        placeholder="cost"
                        name="cost"
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        value={form.cost}
                        onChange={changeHandler}
                    />
                    <Textarea
                        placeholder="description"
                        name="description"
                        fontFamily="primary"
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        value={form.description}
                        onChange={changeHandler}
                    />
                    <Button
                        h="2.5rem"
                        p={{ x: '1rem' }}
                        textSize="body"
                        textColor="info700"
                        hoverTextColor="info900"
                        bg="info300"
                        hoverBg="info400"
                        border="1px solid"
                        borderColor="info700"
                        hoverBorderColor="info900"
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        onClick={createDish}
                    >
                        Create
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export const DishList = ({ dishes }) => {
    if (dishes.length === 0) {
        return (
            <Text
                textAlign="center"
                textSize="subheader"
                textColor="gray900"
                fontFamily="primary"
                p={{ xs: '7rem', md: '7rem', lg: '7rem' }}
            >
                You have not created any dishes yet.
            </Text>
        )
    }

    return (
        <Div
            size={6}
            overflow="visible scroll"
            h={{ xs: '21rem', md: '21rem', lg: '21rem' }}
        >
            {dishes.map((dish, key) => {
                return (
                    <Row
                        key={key}
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        bg="info300"
                        hoverBg="info400"
                        rounded="sm"
                        h={{ xs: '4rem', md: '4rem', lg: '4rem' }}
                    >
                        <Div
                            p={{
                                x: { xs: '1rem', md: '1rem', lg: '1rem' },
                                y: { xs: '0.5rem', md: '0.5rem', lg: '0.5rem' },
                            }}
                        >
                            <Row>
                                <Text
                                    textSize="paragraph"
                                    textColor="info900"
                                    fontFamily="primary"
                                    textWeight="600"
                                >
                                    {dish.title} ${dish.cost}
                                </Text>
                            </Row>
                            <Row>
                                <Text
                                    textSize="paragraph"
                                    textColor="gray900"
                                    fontFamily="primary"
                                >
                                    {dish.description.length > 50
                                        ? dish.description.substring(0, 50) +
                                          '...'
                                        : dish.description}
                                </Text>
                            </Row>
                        </Div>
                    </Row>
                )
            })}
        </Div>
    )
}
