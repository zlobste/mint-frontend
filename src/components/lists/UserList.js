import { Button, Col, Div, Icon, Row, Text } from 'atomize'
import React from 'react'

export const UserList = ({ users, blockUser }) => {
    if (users.length === 0) {
        return (
            <Text
                textAlign='center'
                textSize='subheader'
                textColor='gray900'
                fontFamily='primary'
                p={{ xs: '7rem', md: '7rem', lg: '7rem' }}
            >
                There are no users in the system.
            </Text>
        )
    }

    return (
        <Div
            size={6}
            overflow='visible scroll'
            h={{ xs: '21rem', md: '21rem', lg: '21rem' }}
        >
            {users.map((user, key) => {
                return (
                    <Row
                        key={key}
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                        bg='info300'
                        hoverBg='info400'
                        rounded='sm'
                        h={{ xs: '4rem', md: '4rem', lg: '4rem' }}
                    >
                        <Col
                            size='10'
                            p={{
                                y: { xs: '0.5rem', md: '0.5rem', lg: '0.5rem' },
                                x: { xs: '1rem', md: '1rem', lg: '1rem' },
                                l: { xs: '1.5rem', md: '1.5rem', lg: '1.5rem' },
                            }}
                        >
                            <Row>
                                <Text
                                    textSize='paragraph'
                                    textColor='info900'
                                    fontFamily='primary'
                                    textWeight='600'
                                >
                                    {user.name} {user.balance}
                                </Text>
                            </Row>
                            <Row>
                                <Text
                                    textSize='paragraph'
                                    textColor='gray900'
                                    fontFamily='primary'
                                >
                                    {user.email} {user.role} {user.blocked}
                                </Text>
                            </Row>
                        </Col>
                        <Col
                            size='2'
                            p={{
                                y: { xs: '0.7rem', md: '0.7rem', lg: '0.7rem' },
                                x: { xs: '1rem', md: '1rem', lg: '1rem' },
                                l: { xs: '2rem', md: '2rem', lg: '2rem' },
                            }}
                        >
                            <Button
                                h='2.5rem'
                                w='2.5rem'
                                bg={user.blocked ? 'success300' : 'danger300'}
                                hoverBg={
                                    user.blocked ? 'success400' : 'danger400'
                                }
                                rounded='lg'
                                m={{ r: '1rem' }}
                                onClick={async () =>
                                    await blockUser(user.id, !user.blocked)
                                }
                            >
                                <Icon
                                    name='LockSolid'
                                    size='20px'
                                    color={
                                        user.blocked
                                            ? 'success700'
                                            : 'danger700'
                                    }
                                />
                            </Button>
                        </Col>
                    </Row>
                )
            })}
        </Div>
    )
}