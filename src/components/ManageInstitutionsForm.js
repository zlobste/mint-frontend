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

export const ManageInstitutionsForm = () => {
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
                }
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
                }
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
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        getInstitutions()
    }, [getInstitutions])

    return (
        <Container m={{ xs: '5rem', md: '5rem', lg: '5rem' }}>
            <Row border="2px dashed" borderColor="info700" rounded="md">
                <Col>
                    <InstitutionList
                        institutions={institutions}
                        deleteInstitution={deleteInstitution}
                    />
                </Col>

                <Col size={6}>
                    <Input
                        placeholder="title"
                        name="title"
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        value={form.title}
                        onChange={changeHandler}
                    />
                    <Textarea
                        placeholder="address"
                        name="address"
                        fontFamily="primary"
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        value={form.address}
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
                        onClick={createInstitution}
                    >
                        Create
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export const InstitutionList = ({ institutions, deleteInstitution }) => {
    if (institutions.length === 0) {
        return (
            <Text
                textAlign="center"
                textSize="subheader"
                textColor="gray900"
                fontFamily="primary"
                p={{ xs: '7rem', md: '7rem', lg: '7rem' }}
            >
                You have not created any institutions yet.
            </Text>
        )
    }

    return (
        <Div
            size={6}
            overflow="visible scroll"
            h={{ xs: '21rem', md: '21rem', lg: '21rem' }}
        >
            {institutions.map((institution, key) => {
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
                                    {institution.title}
                                </Text>
                            </Row>
                            <Row>
                                <Text
                                    textSize="paragraph"
                                    textColor="gray900"
                                    fontFamily="primary"
                                >
                                    {institution.address.length > 40
                                        ? institution.address.substring(0, 40) +
                                          '...'
                                        : institution.address}
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
                                onClick={async () =>
                                    await deleteInstitution(institution.id)
                                }
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
