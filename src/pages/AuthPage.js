import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 2,
    })
    const [registered, setRegistered] = useState(true)

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

    const registerHandler = async () => {
        try {
            const data = await request('/register', 'POST', { ...form })
            message(data.message)
            setRegistered(!registered)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="text-darken-3 green-text">Mint</h1>
                <div className="card blue-grey lighten-1">
                    <div className="card-content white-text">
                        {!registered ? (
                            <span className="card-title">Регистрация</span>
                        ) : (
                            <span className="card-title">Авторизация</span>
                        )}

                        <div>
                            {!registered && (
                                <div className="input-field">
                                    <input
                                        placeholder="Введите name"
                                        id="name"
                                        type="text"
                                        name="name"
                                        className="green-input"
                                        value={form.name}
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                            )}

                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="green-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="green-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>

                    {registered ? (
                        <div className="card-action">
                            <button
                                className="btn green darken-3"
                                style={{ marginRight: 10 }}
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                Войти
                            </button>
                            <button
                                className="btn blue-grey darken-3"
                                onClick={changeStatus}
                                disabled={loading}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    ) : (
                        <div className="card-action">
                            <button
                                className="btn blue-grey darken-3"
                                style={{ marginRight: 10 }}
                                disabled={loading}
                                onClick={changeStatus}
                            >
                                Войти
                            </button>
                            <button
                                className="btn green darken-3"
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
