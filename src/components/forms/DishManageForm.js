import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import {
    Input,
    Button,
    Container,
    Col,
    Row,
    Textarea,
} from 'atomize'
import { AuthContext } from '../../context/AuthContext'
import { DishList } from '../lists/DishList'

export const DishManageForm = () => {
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
                },
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
                },
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
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getDishes()
    }, [getDishes])

    return (
        <Container m={{ xs: '5rem', md: '5rem', lg: '5rem' }}>
            <Row border='2px dashed' borderColor='info700' rounded='md'>
                <Col>
                    <DishList dishes={dishes} deleteDish={deleteDish} />
                </Col>

                <Col size={6}>
                    <Input
                        placeholder='title'
                        name='title'
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        value={form.title}
                        onChange={changeHandler}
                    />
                    <Input
                        type='number'
                        placeholder='cost'
                        name='cost'
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        value={form.cost}
                        onChange={changeHandler}
                    />
                    <Textarea
                        placeholder='description'
                        name='description'
                        fontFamily='primary'
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        value={form.description}
                        onChange={changeHandler}
                    />
                    <Button
                        h='2.5rem'
                        p={{ x: '1rem' }}
                        textSize='body'
                        textColor='info700'
                        hoverTextColor='info900'
                        bg='info300'
                        hoverBg='info400'
                        border='1px solid'
                        borderColor='info700'
                        hoverBorderColor='info900'
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