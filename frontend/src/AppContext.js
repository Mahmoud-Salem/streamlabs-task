import React, { useState, useEffect } from 'react';
import HTTP from './util/axios';

export const AppContext = React.createContext({
    user: null,
    setUser: () => {},
});
export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkLoggedIn = () => {
        const token = localStorage.getItem("token");
        if(token)
            HTTP.get('', {headers: {token: token}})
            .then(({data}) => {
                HTTP.defaults.headers.common['token'] = token;
                setUser(data.username);
                console.log(data.username);
                setLoading(false);
            })
            .catch(err => {
                setUser(null);
                localStorage.removeItem('token');
                setLoading(false);
            });
        else setLoading(false);

    }

    useEffect(checkLoggedIn, []);

    return (
        <AppContext.Provider value={{
            user,
            setUser,
            checkLoggedIn
        }}>
            {loading ? (
                <div>Loading...</div>
            )
            :children}
        </AppContext.Provider >
    )
}