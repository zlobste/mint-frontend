import React, { useContext } from 'react'

export const Card = () => {
    return (
        <div className="row">
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
