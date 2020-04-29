import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook.";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = props => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request, error, loading, clearErrors} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearErrors()
    }, [error, message])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const register = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form})
            message(data.message)
        } catch (e) {}
    }

    const login = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form})
            message(data.message)
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Создай Ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    name={'email'}
                                    type="text"
                                    value={form.email}
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    name={'password'}
                                    type="password"
                                    value={form.password}
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn yellow darken-4'
                            style={{margin: 10}}
                            onClick={login}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className='btn grey lighten-1 black-text'
                            onClick={register}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}