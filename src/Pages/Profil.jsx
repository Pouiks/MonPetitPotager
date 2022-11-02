import React, {useState, useEffect, useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import H1 from '../Components/H1'
import Button from '../Components/Button'
import RedButton from '../Components/RedButton'
import BASEURL from '../Config/baseUrl';
import axios from 'axios';
import pxToRem from '../Services/pxToRem';
import styles from '../Config/theme/styles';
import colors from '../Config/theme/colors';
import {authContext} from '../Components/Contexts';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;;
    width: ${pxToRem(500)};
    margin: ${pxToRem(50)};
    padding: ${styles.padding.xl} ${styles.padding.xxl};
    vertical-align: middle;
    box-shadow: ${styles.boxShadow.xl};
    border-radius : ${styles.radius.xxl};
    `
const StyledContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
`
const StyleNavLink = styled(NavLink)`
    padding: 5px 5px;
    align-self: center;
    text-decoration: none;
    color: ${colors.primary};

    :hover {
        text-decoration: underline;
        color: ${colors.secondary};
    }
`

const Profil = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const { auth, setUserDataToContext } = useContext(authContext);

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword ] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

    const [ user, setUser ] = useState({
        id: userId,
        name: name,
        email: email,
        password: '',
        role: 'user',
    })

    const loadUser = (id) => {
        try {
            axios.get(`${BASEURL}/users/${id}`, {headers: {
                'Authorization' : `Bearer ${token}`
            }}).then((res) => {
                setUser({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    password: res.data.user.password,
                });
            })
        } catch(error) {
            console.error(error);
        }
    } 
    
    const updateUser = (id) => {
            if(password !== '') {
                if(password !== passwordConfirmation || oldPassword !== user.password){
                    setMessage('Les mots de passe ne correspondent pas');
                    setSeverity('error');
                    setOpenSnack(true);
                }
            }
            axios.put(`${BASEURL}/users/${id}/update`, {
                name: user.name,
                email: user.email,
                password: user.password
                }, {headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                .then((res) => {
                    setUser({
                        name: user.name,
                        email: user.email,
                        password: user.password,
                    });
                    setUserDataToContext({id: id, name: user.name, email: user.email, password: password, role: 'user'});
                    setMessage('Vos informations ont été mises à jour');
                    setSeverity('success');
                })
                .catch((error) => {
                    setMessage('Les modifications ne sont pas appliquées');
                    setSeverity('error');
                })
                .finally(() => {
                    setOpenSnack(true);
                    setPassword('');
                    setPasswordConfirmation('');
                    setOldPassword('');
                })
    }

    const deleteMyProfile = (id) => {
        axios.delete(`${BASEURL}/users/${id}/delete`, {headers: {
            'Authorization' : `Bearer ${token}`
        }})
        .then((res) => {
            setMessage('Vos compte à été supprimé')
            setSeverity('success')
        })
        .catch((error) => {
            setMessage('Une erreur est survenue')
            setSeverity('error')
        })
        .finally(() => {
            closeDialog();
            setOpenSnack(true);
        })
        localStorage.clear();
        setTimeout(() => navigate('/'), "2000")
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
        };

    const handleNameProfil = (e) => {
        setUser({...user, name: e.target.value})
    }

    const handleEmailProfil = (e) => {
        setUser({...user, email: e.target.value})
    }

    const handlePasswordProfil = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordConfirmationProfil = (e) => {
        setPasswordConfirmation(e.target.value)
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const closeDialog = () => {
        setOpenDialog(false);
    }

    useEffect(() => {
        loadUser(userId);
    }, [userId])
  
    return (
        <StyledContainer>
            <StyledCard>
                <H1 content="Mon profil" />
                <TextField
                    required
                    id="profil_name"
                    label="Votre prénom"
                    defaultValue={name ? name : ''}
                    onChange={handleNameProfil}
                    sx = {{my:2}}
                    />
                <TextField
                    required
                    id="profil_email"
                    label="email"
                    defaultValue={email ? email : ''}
                    onChange={handleEmailProfil}
                    sx = {{my:2}}
                    />
                <TextField
                    type="password"
                    id="new_password"
                    label="Changer mon mot de passe"
                    onChange={handlePasswordProfil}
                    sx = {{my:2}}
                    />

                    {
                        password !== '' && 
                        <TextField
                        required
                        type="password"
                        id="profil_name"
                        label="confirmation du nouveau mot de passe"
                        onChange={handlePasswordConfirmationProfil}
                        sx = {{my:2}}
                        />
                    }

                    { password !== '' &&
                        <TextField
                        required
                        type="password"
                        id="profil_old_password"
                        label="Ancien mot de passe"
                        onChange={handlePasswordConfirmationProfil}
                        sx = {{my:2}}
                        />
                    }

                <Box sx={{display:'flex',  justifyContent:'space-around'}}>  
                    <Button content="Mettre à jour" onClick={() => updateUser(userId)}/>
                    <RedButton content="Supprimer mon profil" onClick={handleOpenDialog}/>
                </Box>
                    <StyleNavLink to={'/mon-potager'} >Consulter mon potager</StyleNavLink>
            </StyledCard>
            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal:'center' }}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
                </Alert>
            </Snackbar>

        <Dialog
            open={openDialog}
            onClose={closeDialog}>
        <DialogTitle id="alert-dialog-title">
          {"Êtes-vous sûr?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cette action est définitive.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button content="Annuler" onClick={closeDialog}/>
            <RedButton content="Confirmer" onClick={() => deleteMyProfile(userId)}/>
        </DialogActions>
        </Dialog>
        </StyledContainer>
    )
}

export default Profil;