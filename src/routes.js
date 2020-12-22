import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { AuthPage } from './pages/AuthPage'
import { AdminPage } from './pages/AdminPage'
import { OrdersPage } from './pages/OrdersPage'

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/main">
                    <MainPage />
                </Route>
                <Route path="/admin">
                    <AdminPage />
                </Route>
                <Route path="/orders">
                    <OrdersPage />
                </Route>
                <Redirect to="/main" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Route path="/main">
                <MainPage />
            </Route>
            <Redirect to="/main" />
        </Switch>
    )
}
