import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import baseUrl from '../../Config/baseUrl';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        isLogged: false,
        token: null,
        user: null,
    });

    const setTokenToContext = (tokenData) => {
        setAuth({...auth, token: tokenData});
        localStorage.setItem('token', tokenData)
    }
    const SetUserIsLog = (isLog) => {
        setAuth({...auth, isLogged: isLog});
        localStorage.setItem('isLog', isLog)
    } 

    const setUserDataToContext = (userData) => {
        setAuth({user: userData});
        localStorage.setItem('id', userData.id);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('email', userData.email);
    }

    const resetContextData = () => {
        setAuth({token: null, user:null, isLogged: false});
        localStorage.clear();
    }

    useEffect(() => {

        if(auth.token) {
            axios({
                method: "post",
                url:`${baseUrl}/authorization`,
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }).then((res) => {
                // setUserDataToContext(res.data.authData.user);
                setAuth({...auth, user:res.data.authData.user, isLogged: true});
            });
        }
    }, [auth]);
    
    // localStorage
    return (
        <authContext.Provider value={{auth,setTokenToContext, setUserDataToContext, resetContextData, SetUserIsLog}}>
            {children}
        </authContext.Provider>
    )
}


// AuthProvider.propTypes = {
//     children: PropTypes.oneOfType([
//         PropTypes.arrayOf(PropTypes.node),
//         PropTypes.node,
//     ]).isRequired,
// }

export default AuthProvider;