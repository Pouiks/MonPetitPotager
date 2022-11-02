import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import styles from '../../Config/theme/styles';
import colors from '../../Config/theme/colors';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import baseUrl from '../../Config/baseUrl';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../Button'

const Container = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-content: center;
align-items: center;
justify-content: center;
`;
const ChildContainer = styled.div`
width: 80%;
display: flex;
justify-content: center;
margin-bottom: ${styles.margin.lg};
`;

const StyledButton = styled.button`
width: ${styles.width.fitcontent};
background-color: ${colors.secondary};
border-radius: ${styles.radius.lg};
text-transform: ${styles.textTransform.uppercase};
text-align: ${styles.textAlign.center};
padding: ${styles.padding.sm} ${styles.padding.lg};
border: ${styles.border.none};
cursor: pointer;
display: block;
margin: ${styles.margin.md} ${styles.margin.auto};

&:hover {
    color: ${colors.neutral};
    background-color: ${colors.tertiary};
}
`;
const CreateGardenForm = (props) => {

    const { userId } = props;
    const token = localStorage.getItem('token');
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState('');
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [error, setError] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    const handleClick = () => {
        setOpenSnack(true);
      };

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpenSnack(false);
    };

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

    const handleInputName = evt => {
        setName(evt.target.value);
    };

    const handleInputArea = evt => {
        setArea(evt.target.value);
    };

    const handleSelect = evt => {
        setRegion(evt.target.value);
    };

    const getRegions = () => {
        try {
            axios.get(baseUrl + "/regions").then((res) => {
                setRegions(res.data);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const createGarden = async (evt) => {
        evt.preventDefault();
        try {
            if (name === '' || area === '' || region === ''){
                setError('Tous les champs sont obligatoires')
            }
                axios.post(baseUrl + "/gardens/create", {
                    name: name,
                    area: area,
                    regionId: region,
                    userAccountId: userId
                },
                {headers: { 'Authorization': `Bearer ${token}` }}
                );
                handleClick();
                handleClose();
                setTimeout(function(){
                    window.location.reload();
                }, 2000);

        } catch (error) {
            setError(error.response.status)
            console.error(error);
            if(error.response.status === 400){
                return "Votre potager n'a pas été créé"
            }

            if(error.response.status === 409){
                return "Un potager ayant ce nom existe déjà. Veuillez choisir un autre nom."
            }
        }
    }

    useEffect(() => {
        getRegions();
    }, [])

    return (
        <Container>
            <ChildContainer>
                <form 
                    component="form"
                    style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField sx={{ margin: 2 }} onChange={handleInputName} type="text" id="name" label="Nom du potager" variant="outlined" />
                    <TextField sx={{ margin: 2 }} onChange={handleInputArea} type="number" id="area" label="Superficie" variant="outlined" />

                    {regions &&
                        <FormControl sx={{ margin: 2 }}>
                            <InputLabel id="demo-simple-select-label">Région</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={region}
                                label="Région"
                                onChange={handleSelect}
                            >

                                {regions.map((region) => (
                                    <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                                ))};

                            </Select>
                        </FormControl>
                    }

                    <StyledButton
                        variant="contained"
                        onClick={createGarden}
                    >
                        Créer
                    </StyledButton>
                </form>
            </ChildContainer>
            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal:'center' }}
                action={action}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Votre potager a été créé !
                </Alert>
            </Snackbar>
        </Container >
    )
}

export default CreateGardenForm;