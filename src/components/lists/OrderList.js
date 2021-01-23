import { useTranslation } from 'react-i18next'
import { Button, Col, Div, Icon, Row, Text } from 'atomize'
import React from 'react'

export const OrderList = ({ orders, cancelOrder }) => {
    const { t } = useTranslation()

    const status = [
        t('order.status.pending'),
        t('order.status.ready'),
        t('order.status.rejected'),
    ]
    if (orders.length === 0) {
        return (
            <Text
                textAlign='center'
                textSize='subheader'
                textColor='gray900'
                fontFamily='primary'
                p={{ xs: '7rem', md: '7rem', lg: '7rem' }}
            >
                There are no orders in the system.
            </Text>
        )
    }

    return (
        <Div
            size={6}
            overflow='visible scroll'
            h={{ xs: '48rem', md: '48rem', lg: '48rem' }}
        >
            {orders.map((order, key) => {
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
                                />
                            </Row>
                            <Row>
                                <Text
                                    textSize='paragraph'
                                    textColor='gray900'
                                    fontFamily='primary'
                                >
                                    ${order.cost}
                                    <br />
                                    {new Date(order.datetime).getDate()}.
                                    {new Date(order.datetime).getFullYear()} -{' '}
                                    {new Date(order.datetime).getHours()}:
                                    {new Date(order.datetime).getMinutes()}{' '}
                                    {status[order.status]}
                                </Text>
                            </Row>
                        </Col>
                        <Col
                            size='2'
                            p={{
                                y: { xs: '0.7rem', md: '0.7rem', lg: '0.7rem' },
                                x: { xs: '1rem', md: '1rem', lg: '1rem' },
                                l: { xs: '7rem', md: '7rem', lg: '7rem' },
                            }}
                        >
                            <Button
                                h='2.5rem'
                                w='2.5rem'
                                bg='danger300'
                                hoverBg='danger400'
                                rounded='lg'
                                m={{ r: '1rem' }}
                                onClick={async () =>
                                    await cancelOrder(order.id)
                                }
                            >
                                <Icon
                                    name='CBIndetermine'
                                    size='20px'
                                    color='danger700'
                                />
                            </Button>
                        </Col>
                    </Row>
                )
            })}
        </Div>
    )
}
