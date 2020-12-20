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
    const message = useMessage()
    const { request } = useHttp()
    const { token } = useContext(AuthContext)
    const [form, setForm] = useState({
        title: 'Spagetti',
        description: 'very tasty',
        cost: 5.55,
    })
    const [dishes, setDishes] = useState([])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createDish = useCallback(async () => {
        try {
            console.log(token)
            const data = await request(
                '/api/dish/edit/create',
                'POST',
                { ...form },
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            message(data.message)
        } catch (e) {}
        getDishes()
    }, [token, request])

    const getDishes = useCallback(async () => {
        try {
            const data = await request('/api/dish/all', 'GET', null)
            setDishes(data)
        } catch (e) {}
    }, [request])

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
            {dishes.map((dish) => {
                return (
                    <Row
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        bg="info300"
                        hoverBg="info400"
                        rounded="sm"
                        h={{ xs: '4rem', md: '4rem', lg: '4rem' }}
                    >
                        <Div>
                            <Text>{dish.title}</Text>
                            <Text>{dish.cost}</Text>
                            <Text>{dish.description}</Text>
                        </Div>
                    </Row>
                )
            })}
        </Div>
    )
}
