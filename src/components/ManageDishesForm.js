import React, { useCallback, useContext, useEffect, useState } from 'react'
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

export const ManageDishesForm = () => {
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

            setForm({
                title: '',
                description: '',
                cost: '',
            })
        } catch (e) {
            console.error(e)
        }
    }

    const deleteDish = async (id) => {
        try {
            console.log('deleteDish: ', id)
            const data = await request(
                `/api/dish/edit/delete/${id}`,
                'DELETE',
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log(dishes)
            await getDishes()
            console.log(dishes)
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
        <Container m={{ xs: '5rem', md: '5rem', lg: '5rem' }}>
            <Row border="2px dashed" borderColor="info700" rounded="md">
                <Col>
                    <DishList dishes={dishes} deleteDish={deleteDish} />
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

export const DishList = ({ dishes, deleteDish }) => {
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
                        <Col
                            size="10"
                            p={{
                                y: { xs: '0.5rem', md: '0.5rem', lg: '0.5rem' },
                                x: { xs: '1rem', md: '1rem', lg: '1rem' },
                                l: { xs: '1.5rem', md: '1.5rem', lg: '1.5rem' },
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
                                    {dish.description.length > 40
                                        ? dish.description.substring(0, 40) +
                                          '...'
                                        : dish.description}
                                </Text>
                            </Row>
                        </Col>
                        <Col
                            size="2"
                            p={{
                                y: { xs: '0.7rem', md: '0.7rem', lg: '0.7rem' },
                                x: { xs: '1rem', md: '1rem', lg: '1rem' },
                                l: { xs: '2rem', md: '2rem', lg: '2rem' },
                            }}
                        >
                            <Button
                                h="2.5rem"
                                w="2.5rem"
                                bg="danger300"
                                hoverBg="danger400"
                                rounded="lg"
                                m={{ r: '1rem' }}
                                onClick={async () => await deleteDish(dish.id)}
                            >
                                <Icon
                                    name="DeleteSolid"
                                    size="20px"
                                    color="danger700"
                                />
                            </Button>
                        </Col>
                    </Row>
                )
            })}
        </Div>
    )
}
