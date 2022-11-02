import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import baseUrl from '../../Config/baseUrl'
import axios from 'axios';
import pxToRem from '../../Services/pxToRem'
import TextField from '@mui/material/TextField';
import ThemeColors from '../../Config/theme/colors'
import Theme from '../../Config/theme/styles'
import SignCard from '../SignCard';
import Text from '../Text';
import Button from '../Button'
import H1 from '../H1'
import styled from 'styled-components'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const StyledSignContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 400px;
    margin: 0 auto;
    flex-direction: column;
`

const StyledContentSignContainer = styled.div`
    min-width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align:center;
    text-align: center;
    background-color: ${ThemeColors.secondary};
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
const SignUp = () => {
    const navigate = useNavigate();
    const [openSnack, setOpenSnack] = useState(false)
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleClick = () => {
        setOpenSnack(true);
      };

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpenSnack(false);
    };
    const handleNameChange = (e) => {
        const name = e.target.value;
        setName(name);
    }

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handlePasswordConfirmationChange = (e) => {
        const passwordConfirmation = e.target.value;
        setPasswordConfirmation(passwordConfirmation);
    }

    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

      const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/;

     const createAccount = async () => {
        try {
            if(password === '' || email === '' || passwordConfirmation === ''){
                setError('Tout les champs sont obligatoires')
            }
            if(!passwordRegex.test(password)){
                setError("Les mots de passe doivent contenir 1 majuscule, minimum 8 caractere dont 1 special (ex: &!?@)")
                return
                
            }else {
                if(password !== passwordConfirmation){
                    setError("Les mots de passe ne correspondent pas")
                    return
                }
                const request = await axios.post(`${baseUrl}/users/create`, {
                    name,
                    email,
                    password,
                })
                setName('');
                setEmail('');
                setPassword('');
                handleClick()
                setTimeout(() => navigate('/connexion'), "2000")
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

    }, [])

    return(
        
        <SignCard>
            <StyledSignContainer>
                <H1 content="Création d'un compte"/>
                <TextField
                required
                id="name_outlined-required"
                label="Votre prénom"
                defaultValue={name}
                onChange={handleNameChange}
                error={emailError ? true : false}
                Link
                />
                <TextField
                required
                id="email_outlined-required"
                label="Email"
                type="mail"
                defaultValue={email}
                onChange={handleEmailChange}
                error={emailError ? true : false}
                Link
                />
                <TextField
                required
                id="password_outlined-required"
                label="Mot de passe"
                type="password"
                error={error ? true : false}
                helperText={error ? error : ''}
                defaultValue={password}
                onChange={handlePasswordChange}
                />

                <TextField
                required
                id="confirmPassword_outlined-required"
                label="Confirmation du mot de passe"
                type="password"
                error={error ? true : false}
                helperText={error ? error : ''}
                defaultValue={password}
                onChange={handlePasswordConfirmationChange}
                />
                <Button 
                    content="s'inscrire"
                    onClick={createAccount}
                />

                <Link to="/connexion"> J'ai déja un compte</Link>
            </StyledSignContainer>
            <StyledContentSignContainer>
                <H1 content="Salut !" />
                <Text content = "Vous possedez un compte, ne perdez pas de temps" />
                <StyledLink href="/connexion"> Je me connecte !</StyledLink>
            </StyledContentSignContainer>
            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal:'center' }}
                action={action}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Vous pouvez maintenant vous connecter
                </Alert>
            </Snackbar>
        </SignCard>
    )
}

export default SignUp;
