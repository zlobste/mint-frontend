import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { Container, Col, Row } from 'atomize'
import { AuthContext } from '../../context/AuthContext'

export const UserManageForm = () => {
    const { request } = useHttp()
    const { token } = useContext(AuthContext)
    const [users, setUsers] = useState([])

    const blockUser = async (id, blocked) => {
        try {
            console.log('blockUser: ', id)
            const data = await request(
                `/api/user/block/${id}/${blocked}`,
                'POST',
                null,
                {
                    Authorization: `Bearer ${token}`,
                },
            )
            await getUsers()
        } catch (e) {
            console.error(e)
        }
    }

    const getUsers = useCallback(async () => {
        try {
            const data = await request('/api/user/all', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setUsers(data)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getUsers()
    }, [getUsers])

    return (
        <Container m={{ xs: '5rem', md: '5rem', lg: '5rem' }}>
            <Row border='2px dashed' borderColor='info700' rounded='md'>
                <Col>
                    <UsersList users={users} blockUser={blockUser} />
                </Col>

                <Col size={6} />
            </Row>
        </Container>
    )
}
