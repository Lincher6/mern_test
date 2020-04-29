import React, {useState} from 'react';
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {NavBar} from "./components/NavBar";
import {Loader} from "./components/Loader";

function App() {
    const {token, userId, login, logout, isReady} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    if (!isReady) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuth
        }}>
            <BrowserRouter>
                {isAuth && <NavBar/>}
                <div className='container'>
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
