import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { Card } from '../components/Card'

export const MainPage = () => {
    const [user, setUser] = useState({})
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchUserInfo = useCallback(async () => {
        try {
            const fetched = await request('/api/user/info', 'GET', null, {
                Authorization: `Bearer ${token}`,
            })
            setUser(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchUserInfo()
    }, [fetchUserInfo])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && (
                <ul>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                    <div className="row">
                        <div className="col s4">
                            <Card />
                        </div>
                        <div className="col s4">
                            <Card />
                        </div>
                        <div className="col s4">
                            <Card />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s4">
                            <Card />
                        </div>
                        <div className="col s4">
                            <Card />
                        </div>
                        <div className="col s4">
                            <Card />
                        </div>
                    </div>
                </ul>
            )}
        </>
    )
}
