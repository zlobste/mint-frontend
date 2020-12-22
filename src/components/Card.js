import React, { useContext } from 'react'
import {
    Input,
    Button,
    Icon,
    Container,
    Col,
    Row,
    Text,
    Div,
    Image,
} from 'atomize'
import { useTranslation } from 'react-i18next'

export const Card = ({ dish, image }) => {
    const { t, i18n } = useTranslation()

    return (
        <Div bg="white" shadow="4" rounded="xl">
            <Col>
                <Image src={image} />
            </Col>
            <Div
                d="flex"
                justify="space-between"
                p={{ t: '1rem', b: '1.5rem' }}
            >
                <Div>
                    <Text
                        textSize="caption"
                        textColor="dark"
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                    >
                        {dish.title} ${dish.cost}
                    </Text>
                    <Text
                        textSize="caption"
                        textColor="light"
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                    >
                        {dish.description}
                    </Text>
                    <Button
                        h="2.5rem"
                        p={{ x: '1rem' }}
                        textColor="success700"
                        hoverTextColor="success900"
                        bg="success300"
                        hoverBg="success400"
                        border="1px solid"
                        borderColor="success700"
                        hoverBorderColor="success900"
                        m={{ xs: '1rem', md: '1rem', lg: '1rem' }}
                    >
                        {t('order.order')}
                    </Button>
                </Div>
            </Div>
        </Div>
    )
}
