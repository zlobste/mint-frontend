import React, { useContext } from 'react'
import { Button, Icon } from 'atomize'

export const Card = () => {
    return (
        <div className="row">
            <Button
                suffix={
                    <Icon
                        name="LongRight"
                        size="16px"
                        color="white"
                        m={{ l: '1rem' }}
                    />
                }
                shadow="3"
                hoverShadow="4"
                m={{ r: '1rem' }}
            >
                Contact Us
            </Button>

            <div className="col s4 m12">
                <div className="card">
                    <div className="card-image">
                        <img src="https://www.restu.cz/ir/restaurant/d88/d8819dba6cfd3254d1a13a429bee3afb.jpg" />
                        <span className="card-title">Card Title</span>
                    </div>
                    <div className="card-content">
                        <p>
                            I am a very simple card. I am good at containing
                            small bits of information. I am convenient because I
                            require little markup to use effectively.
                        </p>
                    </div>
                    <div className="card-action">
                        <a href="#">This is a link</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
