import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

export const CreateDishForm = () => {
    const message = useMessage()
    const { request } = useHttp()
    const { token } = useContext(AuthContext)
    const [form, setForm] = useState({
        title: 'Spagetti',
        description: 'very tasty',
        cost: 5.55,
    })
    const [dishes, setDishes] = useState([])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createDish = useCallback(async () => {
        try {
            console.log(token)
            const data = await request(
                '/api/dish/edit/create',
                'POST',
                { ...form },
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            message(data.message)
        } catch (e) {}
        getDishes()
    }, [token, request])

    const getDishes = useCallback(async () => {
        try {
            const data = await request('/api/dish/all', 'GET', null)
            setDishes(data)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        getDishes()
    }, [getDishes])

    return (
        <div className="row">
            <div className="col s6">
                <div className="card blue-grey lighten-1">
                    <div className="card-content white-text">
                        <span className="card-title">Create dish</span>
                        <div className="input-field">
                            <input
                                placeholder="Введите title"
                                id="title"
                                type="text"
                                name="title"
                                className="green-input"
                                value={form.title}
                                onChange={changeHandler}
                            />
                            <label htmlFor="title">Title</label>
                        </div>

                        <div className="input-field">
                            <textarea
                                id="description"
                                className="materialize-textarea green-input"
                                data-length="120"
                                value={form.description}
                            ></textarea>
                            <label htmlFor="description">Description</label>
                        </div>

                        <div className="input-field">
                            <input
                                placeholder="Введите cost"
                                id="cost"
                                type="number"
                                name="cost"
                                className="green-input"
                                value={form.cost}
                                onChange={changeHandler}
                            />
                            <label htmlFor="cost">Cost</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn green darken-3"
                            style={{ marginRight: 10 }}
                            onClick={createDish}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
            <div className="col s6">list</div>
        </div>
    )
}
