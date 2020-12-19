import React, { Suspense, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { Input, Button, Icon, Container, Col, Row, Text, Div } from 'atomize'
import { useTranslation } from 'react-i18next'

export const AuthPage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 2,
    })
    const [registered, setRegistered] = useState(true)
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const { t, i18n } = useTranslation()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const changeStatus = () => {
        setRegistered(!registered)
    }

    const authHandler = async () => {
        try {
            if (registered) {
                const data = await request('/login', 'POST', { ...form })
                auth.login(data.token, data.userId)
                return
            }
            const data = await request('/register', 'POST', { ...form })
            message(data.message)
            setRegistered(!registered)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <Row>
                <Col size="4" />
                <Col size="4">
                    <Container
                        align="center"
                        justify="space-between"
                        flexDir="column"
                        shadow="0 16px 24px -2px rgba(0, 0, 0, 0.08)"
                        p={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        m={{ y: { xs: '4rem', md: '5rem', lg: '10rem' } }}
                    >
                        <Div>
                            <Text
                                tag="span"
                                textAlign="center"
                                textSize="title"
                                fontFamily="primary"
                                p={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                            >
                                {!registered
                                    ? t('auth.createNewAccount')
                                    : t('auth.loginIntoAccount')}
                            </Text>
                            <Button
                                h="2rem"
                                p={{ x: '0.75rem' }}
                                textSize="caption"
                                textColor="info700"
                                hoverTextColor="info900"
                                bg="white"
                                border="none"
                                m={{ r: '0.5rem' }}
                                prefix={
                                    <Text
                                        tag="span"
                                        textAlign="center"
                                        textSize="caption"
                                        textColor="gray900"
                                        fontFamily="primary"
                                        p={{
                                            xs: '0.5rem',
                                            md: '0.5rem',
                                            lg: '0.5rem',
                                        }}
                                    >
                                        {!registered
                                            ? t('auth.haveAlreadyRegistered')
                                            : t('auth.doNotHaveAnAccountYet')}
                                    </Text>
                                }
                                onClick={changeStatus}
                            >
                                {!registered
                                    ? t('auth.loginInto')
                                    : t('auth.createNew')}
                            </Button>
                        </Div>

                        {!registered && (
                            <Input
                                id="name"
                                name="name"
                                placeholder={t('auth.userName')}
                                m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                                suffix={
                                    <Icon
                                        name="UserSolid"
                                        color="success800"
                                        size="16px"
                                        cursor="pointer"
                                        pos="absolute"
                                        top="50%"
                                        right="1rem"
                                        transform="translateY(-50%)"
                                    />
                                }
                                value={form.name}
                                onChange={changeHandler}
                            />
                        )}

                        <Input
                            id="email"
                            name="email"
                            placeholder={t('auth.email')}
                            m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                            suffix={
                                <Icon
                                    name="Email"
                                    color="success800"
                                    size="16px"
                                    cursor="pointer"
                                    pos="absolute"
                                    top="50%"
                                    right="1rem"
                                    transform="translateY(-50%)"
                                />
                            }
                            value={form.email}
                            onChange={changeHandler}
                        />

                        <Input
                            id="password"
                            name="password"
                            placeholder={t('auth.password')}
                            type={passwordVisibility ? 'text' : 'password'}
                            m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                            suffix={
                                <Button
                                    pos="absolute"
                                    onClick={() =>
                                        setPasswordVisibility(
                                            !passwordVisibility
                                        )
                                    }
                                    bg="transparent"
                                    w="3rem"
                                    top="0"
                                    right="0"
                                    rounded={{ r: 'md' }}
                                >
                                    <Icon
                                        name={
                                            passwordVisibility
                                                ? 'EyeSolid'
                                                : 'Eye'
                                        }
                                        color={
                                            passwordVisibility
                                                ? 'danger800'
                                                : 'success800'
                                        }
                                        size="16px"
                                    />
                                </Button>
                            }
                            value={form.password}
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
                            onClick={authHandler}
                        >
                            {registered ? t('auth.signIn') : t('auth.register')}
                        </Button>
                    </Container>
                </Col>
                <Col size="4" />
            </Row>
        </div>
    )
}
