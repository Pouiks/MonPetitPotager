import React, {useEffect, useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { authContext } from '../Contexts';
import baseUrl from '../../Config/baseUrl'
import axios from 'axios';
import ThemeColors from '../../Config/theme/colors'
import Theme from '../../Config/theme/styles'
import pxToRem from '../../Services/pxToRem'
import {TextField} from '@mui/material';
import Button from '../Button'
import Text from '../Text'
import SignCard from '../SignCard'
import H1 from '../H1'
import styled from 'styled-components'
import getLoginToken from '../../Services/login'
import getAuth from '../../Services/getAuth'

const StyledSignContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 500px;
    height: 400px;
    margin: 0 auto;
`
const StyledContentSignContainer = styled.div`
    min-width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: ${ThemeColors.secondary}
`

const StyledLink = styled.a`
    max-width: ${pxToRem(200)};
    align-self:center;
    padding: ${Theme.padding.sm} ${Theme.padding.lg};
    text-decoration: none;
    color: white;
    border: ${Theme.border.sm} solid white;
    border-radius: ${Theme.radius.lg};
    font-size:${pxToRem(20)};
    margin-bottom: ${pxToRem(25)};

    &:hover {
        background-color: ${ThemeColors.tertiary};
        border: ${Theme.border.sm} solid ${ThemeColors.tertiary};
    }
`

const SignIn = () => {
    const navigate = useNavigate();
    // const {user, setUser} = useContext(UserContext)
    const {auth, setTokenToContext,  SetUserIsLog} = useContext(authContext);
    const {user, setUserDataToContext} = useContext(authContext);
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const login = async () => {

        try {
            if( email === '' || password === ''){
                setError('Les informations ne correspondent pas')
            }
            const getToken = await getLoginToken(email, password)
            const token = getToken.data.token;
            const user = await getAuth(token)
            if(user){
                setTokenToContext(user.data.token);
                SetUserIsLog(true);
                setUserDataToContext(user.data.authData, user.data.token)
            }

            setEmail('');
            setPassword('');
            if(user.data.authData.role === "admin"){
                navigate('/back-office', {user: user.data.authData});
            } else {

                navigate('/mon-potager', user.data.authData);
            }
        } catch(error) {
            console.log(error)
        }

    }
    useEffect(() => {

    }, [])

    return(
        <SignCard>
            <StyledContentSignContainer>
                <H1 content="Rejoignez nous " />
                <Text content = "Créez votre compte et commencez à utiliser nos services" />
                <StyledLink href="/creer-mon-compte"> Créer mon compte !</StyledLink>
            </StyledContentSignContainer>
            <StyledSignContainer>
                <H1 content="Connexion à mon compte"/>
                
                <TextField
                required
                id="email_outlined-required"
                label="Email"
                defaultValue={email}
                helperText={error ? error : ''}
                onChange={handleEmailChange}
                error={error ? true : false}
                
                />
                <TextField
                required
                id="password_outlined-required"
                label="Mot de passe"
                type="password"
                helperText={error ? error : ''}
                error={error ? true : false}
                defaultValue={password}
                onChange={handlePasswordChange}
                />
                <Button 
                    content="se connecter"
                    onClick={() => { 
                        login()
                    }}
                />

                <Link to="/creer-mon-compte" sx={{margin:"0 auto"}}>Je n'ai pas encore de compte</Link>

            </StyledSignContainer>
        </SignCard>
    )
}
  
export default SignIn;