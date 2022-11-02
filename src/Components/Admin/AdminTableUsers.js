import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import pxToRem from '../../Services/pxToRem'
import styled from 'styled-components'
import Button from '../Button';
import RedButton from '../RedButton';
import H1 from '../H1';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import axios from 'axios';
import BASEURL from '../../Config/baseUrl';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import styles from '../../Config/theme/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const StyledContainer = styled.div`
    width: 50%;
    margin: ${styles.margin.xxl} auto;
    display:flex;
    flex-direction:column;
    padding:2%;
    border-radius:50px;
    box-shadow: ${styles.boxShadow.xl}
`
const StyledBox = styled.div`
    display:flex;
    justify-content: space-between;
    padding:1%;
`

const AdminTableUsers = (props) => {
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [displayNewUser, setDisplayNewUser] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
    })

    const [errorNewUser, setErrorNewUser] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [openDialog, setOpenDialog] = useState(false);
    const [openSnack, setOpenSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const handleClose = () => {
        setOpenSnack(false);
    };

    const getUsers = async () => {
        try{
            await axios.get(`${BASEURL}/users`, {headers: {'Authorization': `Bearer ${token}`}}).then((res) => {
                setUsers(res.data);

            });
        } catch(error){
            console.error(error);
        }
    }

    const handleOpenDialog = (id) => {
        setUserId(id);
        setOpenDialog(true);
    }

    const closeDialog = () => {
        setOpenDialog(false);
    }

    // CREATE NEW USER 
    const handleNewUserName = (event) => {
        setNewUser({...newUser, name: event.target.value});
    };
    const handleNewUserEmail = (event) => {
        setNewUser({...newUser, email: event.target.value});
    };
    const handleNewUserRole = (event) => {
        setNewUser({...newUser, role: event.target.value});
    };
    const handleNewUserPassword = (event) => {
        setNewUser({...newUser, password: event.target.value});
    };
    const handleNewUserConfirmPass = (event) => {
        setConfirmPass(event.target.value);
    };
// UPDATE USER
    const handleUpdatedNameChange = (event) => {
        setSelectedUser({...selectedUser, name: event.target.value});
    };
    const handleUpdatedEmailChange = (event) => {
        setSelectedUser({...selectedUser, email: event.target.value});
    };
    const handleUpdatedRoleChange = (event) => {
        setSelectedUser({...selectedUser, role: event.target.value});
    };

    const updateUser = (user) => {
         axios.put(`${BASEURL}/users/${selectedUser.id}/update`, {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        {headers: {
            'Authorization' : `Bearer ${token}`
        }
        })
        .then((res) => {
            setMessage('Utilisateur mis à jour')
            setSeverity('success')
        })
        .catch((error) =>{
            setMessage('Une erreur est survenue')
            setSeverity('error')
        })
        .finally(() => {
            setOpenSnack(true);
            setSelectedUser(false);
            getUsers();
        })
    }

    const deleteUser = (id) => {
        axios.delete(`${BASEURL}/users/${id}/delete`, {headers: {
            'Authorization' : `Bearer ${token}`
        }})
        .then((res) => {
            setMessage('Utilisateur supprimé')
            setSeverity('success')
        })
        .catch((error) =>{
            setMessage("Une erreur est survenue")
            setSeverity('error')
        })
        .finally(() => {
            setOpenSnack(true);
            closeDialog();
            getUsers();;
        })
    }

    const createNewUser = () => {
        if(newUser.password !== confirmPass){
            setErrorNewUser(true)
            return;
        }
             axios.post(`${BASEURL}/users/create`,
                {
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    password: newUser.password
                },         
                {headers: {
                    'Authorization' : `Bearer ${token}`
                }}
            )
            .then((res) => {
                setMessage('Nouvel utilisateur ajouté')
                setSeverity('success')
            })
            .catch((error) =>{
                setMessage('Une erreur est survenue')
                setSeverity('error')
            })
            .finally(() => {
                setOpenSnack(true);
                setDisplayNewUser(false);
                getUsers();
            })
    }

    const rolesEnum = ["admin", "user"]
    Object.freeze(rolesEnum);
    
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <Box sx={{display:'flex', justifyContent: 'end', mb: 5}}>
                <Button content="Ajouter" onClick={() => {setSelectedUser(false); setDisplayNewUser(true)}}/>
            </Box>
            { displayNewUser &&
            <>           
            <H1 content="Ajouter un utilisateur" />    
            <StyledContainer>
                <Box>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Nom :</Typography>
                        <TextField variant="outlined" type="text" required value={newUser.name} onChange={handleNewUserName} sx={{width: 250}}/>
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Email :</Typography>
                        <TextField variant="outlined" type="email" required value={newUser.email} onChange={handleNewUserEmail} sx={{width: 250}}/>
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Rôle :</Typography>
                        <Select
                        onChange={handleNewUserRole}
                        sx={{width: 250}}
                        defaultValue="user"
                        required
                        >
                            <MenuItem value="admin">admin</MenuItem>
                            <MenuItem value="user">user</MenuItem>
                        </Select>
                    </StyledBox> 
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Mot de passe :</Typography>
                        <TextField  variant="outlined" type="password" required onChange={handleNewUserPassword} sx={{width: 250}}/>
                        {errorNewUser && 
                            <Typography color="error" sx={{mr: 1}} variant="caption">Les mots de passe ne correspondent pas</Typography>

                        }
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Confirmation du mot de passe :</Typography>
                        <TextField variant="outlined" type="password" required onChange={handleNewUserConfirmPass} sx={{width: 250}}/>
                        {errorNewUser && 
                            <Typography color="error" sx={{mr: 1}} variant="caption">Les mots de passe ne correspondent pas</Typography>
                        }
                        
                    </StyledBox>
                </Box>
                <Box sx={{display:'flex',  justifyContent:'space-around'}}>
                    <Button content="Valider" onClick={ createNewUser}/>
                    <RedButton content="Annuler" onClick={() => setDisplayNewUser(false)} />
                </Box>
            </StyledContainer>
            </>
            }
            {selectedUser &&    
            <>
            <H1 content="Modifier un utilisateur" />    
            <StyledContainer>
            <StyledBox>
                <Typography sx={{mr: 2}}> Nom :</Typography>
                <TextField variant="outlined" value={selectedUser.name} onChange={handleUpdatedNameChange} sx={{width: 250}}/>
            </StyledBox>
            <StyledBox>
                <Typography sx={{mr: 2}}> Email :</Typography>
                <TextField variant="outlined" value={selectedUser.email} onChange={handleUpdatedEmailChange} sx={{width: 250}}/>
            </StyledBox>
            <StyledBox>
                <Typography sx={{mr: 2}}> Rôle :</Typography>
                <Select
                onChange={handleUpdatedRoleChange}
                value={selectedUser.role}
                sx={{width: 250}}
                >
                    <MenuItem value="admin">admin</MenuItem>
                    <MenuItem value="user">user</MenuItem>
                </Select>
            </StyledBox>
            <Box sx={{display:'flex',  justifyContent:'space-around'}}>     
                <Button content="Valider" onClick={() => updateUser(selectedUser)}/>
                <RedButton content="Annuler" onClick={() => setSelectedUser(false)}/>
            </Box>

            </StyledContainer>
            <Divider sx={{mb:`${pxToRem(30)}`}}/>
            </>
            }
        
            <TableContainer sx={{ minWidth: 650, minHeight: 682, maxHeight: 682}}>
            {users && 
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow sx={{fontWeight:'bold', borderBottom:2}}>
                            <TableCell sx={{fontWeight:'bold'}}>ID</TableCell>
                            <TableCell align="left" sx={{fontWeight:'bold'}}>Nom</TableCell>
                            <TableCell align="left" sx={{fontWeight:'bold'}}>Email</TableCell>
                            <TableCell align="left" sx={{fontWeight:'bold'}}>Rôle</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}}>Mettre à jour</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}}>Supprimer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((user) => (
                        <TableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {user.id}
                        </TableCell>
                        <TableCell align="left">{user.name}</TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.role}</TableCell>
                        <TableCell align="center"><AutoFixHighIcon color="primary" sx={{cursor: "pointer"}} onClick={() => { 
                            setSelectedUser({name : user.name, email: user.email, role: user.role, id: user.id});  setDisplayNewUser(false);
                        }}/></TableCell>
                        <TableCell align="center"><DeleteIcon color="error" sx={{cursor: "pointer"}} onClick={() => handleOpenDialog(user.id)}/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            }
            </TableContainer>
            <Snackbar
                open={openSnack}
                autoHideDuration={5000}
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
                    <RedButton content="Confirmer" onClick={() => deleteUser(userId)}/>
                </DialogActions>
        </Dialog>
        </>
    )
}

AdminTableUsers.propTypes = {
    users: PropTypes.array
}

export default AdminTableUsers;


