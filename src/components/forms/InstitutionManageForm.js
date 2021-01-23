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
import { InstitutionList } from '../lists/InstitutionList'

export const InstitutionManageForm = () => {
    const { request } = useHttp()
    const { token } = useContext(AuthContext)
    const [form, setForm] = useState({
        title: '',
        address: '',
    })
    const [institutions, setInstitutions] = useState([])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createInstitution = async () => {
        try {
            console.log(form)
            const data = await request(
                '/api/institution/edit/create',
                'POST',
                { ...form, cost: Number(form.cost) },
                {
                    Authorization: `Bearer ${token}`,
                },
            )
            await getInstitutions()

            setForm({
                title: '',
                address: '',
            })
        } catch (e) {
            console.error(e)
        }
    }

    const deleteInstitution = async (id) => {
        try {
            const data = await request(
                `/api/institution/edit/delete/${id}`,
                'DELETE',
                null,
                {
                    Authorization: `Bearer ${token}`,
                },
            )
            await getInstitutions()
        } catch (e) {
            console.error(e)
        }
    }

    const getInstitutions = useCallback(async () => {
        try {
            const data = await request('/api/institution/all', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setInstitutions(data)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getInstitutions()
    }, [getInstitutions])

    return (
        <Container m={{ xs: '5rem', md: '5rem', lg: '5rem' }}>
            <Row border='2px dashed' borderColor='info700' rounded='md'>
                <Col>
                    <InstitutionList
                        institutions={institutions}
                        deleteInstitution={deleteInstitution}
                    />
                </Col>

                <Col size={6}>
                    <Input
                        placeholder='title'
                        name='title'
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        value={form.title}
                        onChange={changeHandler}
                    />
                    <Textarea
                        placeholder='address'
                        name='address'
                        fontFamily='primary'
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        value={form.address}
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
                        onClick={createInstitution}
                    >
                        Create
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
