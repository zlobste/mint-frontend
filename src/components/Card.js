import React, { useContext } from 'react'
import { Div, Text, Image, Col } from 'atomize'

export const Card = ({ dish, image }) => {
    return (
        <Div bg="white" shadow="2" rounded="xl" m={{ b: '1rem' }} p="1.5rem">
            <Col>
                <Image src={image} />
            </Col>
            <Div
                d="flex"
                justify="space-between"
                p={{ t: '1rem', b: '1.5rem' }}
            >
                <Div>
                    <Text textSize="caption" textColor="dark">
                        {dish.title} ${dish.cost}
                    </Text>
                    <Text textSize="caption" textColor="light">
                        {dish.description}
                    </Text>
                </Div>
            </Div>
        </Div>
    )
}
