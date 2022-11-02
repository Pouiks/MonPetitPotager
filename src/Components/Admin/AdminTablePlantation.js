import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography } from '@mui/material';
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
import baseUrl from '../../Config/baseUrl'
import PropTypes from 'prop-types';
import styles from '../../Config/theme/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
const months = [
    {name: 'janvier'},
    {name: 'fevrier'},
    {name: 'mars'},
    {name: 'avril'},
    {name: 'mai'},
    {name: 'juin'},
    {name: 'juillet'},
    {name: 'aout'},
    {name: 'septembre'},
    {name: 'octobre'},
    {name: 'novembre'},
    {name: 'decembre'}
]

const AdminTablePlantation = (props) => {
    const {categories} = props;
    const token = localStorage.getItem('token');

    const [plants, setPlants] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState();
    const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
    const [displayNewPlant, setDisplayNewPlant] = useState(false);
    const [newPlant, setNewPlant] = useState({
        name: '',
        category_id: '',
        description: '',
        density: '',
        water_quantity: '',
        start_sowing_month : '',
        end_sowing_month: '',
        start_harvest_month: '',
        end_harvest_month:'',
        image_url: '',
        climat_id: 1
    })

    const [openSnack, setOpenSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const handleClose = () => {
        setOpenSnack(false);
    };

    const defaultImg = 'https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png';
// Create new plant
    const handleNewPlantName = (event) => {
        setNewPlant({...newPlant, name: event.target.value})
    }
    const handleNewPlantCategory = (event) => {
        setNewPlant({...newPlant, category_id: event.target.value})
    }
    const handleNewPlantDescription = (event) => {
        setNewPlant({...newPlant, description: event.target.value})
    }
    const handleNewPlantDensity = (event) => {
        setNewPlant({...newPlant, density: event.target.value})
    }
    const handleNewPlantWater = (event) => {
        setNewPlant({...newPlant, water_quantity: event.target.value})
    }
    const handleNewPlantStartSowingChange = (event) => {
        setNewPlant({...newPlant, start_sowing_month: event.target.value})
    }
    const handleNewPlantEndSowingChange = (event) => {
        setNewPlant({...newPlant, end_sowing_month: event.target.value})
    }
    const handleNewPlantStartHarvestChange  = (event) => {
        setNewPlant({...newPlant, start_harvest_month: event.target.value})
    }
    const handleNewPlantEndHarvestChange = (event) => {
        setNewPlant({...newPlant, end_harvest_month: event.target.value})
    }
    const handleNewPlantImageUrl = (event) => {
        setNewPlant({...newPlant, image_url: event.target.value})
    }

 // Update Plant
    const handleNameChange = (event) => {
        setSelectedPlant({...selectedPlant, name: event.target.value})
    }
    const handleDescChange = (event) => {
        setSelectedPlant({...selectedPlant, description: event.target.value})
    }
    const handleDensityChange = (event) => {
        setSelectedPlant({...selectedPlant, density: event.target.value})
    }
    const handleWaterChange = (event) => {
        setSelectedPlant({...selectedPlant, water_quantity: event.target.value})
    }
    const handleStartSowingChange = (event) => {
        setSelectedPlant({...selectedPlant, start_sowing_month: event.target.value})
    }
    const handleEndSowingChange = (event) => {
        setSelectedPlant({...selectedPlant, end_sowing_month: event.target.value})
    }
    const handleStartHarvestChange = (event) => {
        setSelectedPlant({...selectedPlant, start_harvest_month: event.target.value})
    }
    const handleEndHarvestChange = (event) => {
        setSelectedPlant({...selectedPlant, end_harvest_month: event.target.value})
    }
    const handleCategoryChange = (event) => {
        setSelectedPlant({...selectedPlant, category_id: event.target.value})
    }
    const handleImageUrlChange = (event) => {
        setSelectedPlant({...selectedPlant, image_url: event.target.value})
    }

    const getPlants = async () => {
        try{
            await axios.get(`${baseUrl}/plants`, {headers: {'Authorization': `Bearer ${token}`}}).then((res) => {
                setPlants(res.data)
            });
        }catch(error){
            console.error(error);
        }
    }
    
    const createNewPlantation = (event) => {
        event.preventDefault();
            axios.post(baseUrl + "/plants/create", {
                name: newPlant.name,
                category: newPlant.category_id,
                description: newPlant.description,
                density: newPlant.density,
                waterQuantity: newPlant.water_quantity,
                startSowingMonth: newPlant.start_sowing_month,
                endSowingMonth: newPlant.end_harvest_month,
                startHarvestMonth: newPlant.start_harvest_month,
                endHarvestMonth: newPlant.end_sowing_month,
                imageUrl: newPlant.image_url,
                climatId: newPlant.climat_id
                },
                {headers: { 'Authorization' : `Bearer ${token}` }}
                )
                .then((res) => {
                    setMessage('OK')
                    setSeverity('success')
                })
                .catch((error) =>{
                    setMessage('KO')
                    setSeverity('error')
                })
                .finally(() => {
                    setOpenSnack(true);
                    getPlants();
                    setDisplayNewPlant(false);
                })
    }
  
    const updatePlant = () => {

        if (selectedPlant.climat_id === null || selectedPlant.climat_id === undefined) {
            selectedPlant.climat_id = 1;
        }
            axios.put(baseUrl + "/plants/" + selectedPlant.id + "/update", {
                category: selectedPlant.category_id,
                name: selectedPlant.name,
                imageUrl: selectedPlant.image_url,
                description: selectedPlant.description,
                density: selectedPlant.density,
                waterQuantity: selectedPlant.water_quantity,
                startSowingMonth: selectedPlant.start_sowing_month,
                endSowingMonth: selectedPlant.end_sowing_month,
                startHarvestMonth: selectedPlant.start_harvest_month,
                endHarvestMonth: selectedPlant.end_harvest_month,
                climatId: selectedPlant.climat_id
                },
                {
                    headers: {
                    'Authorization' : `Bearer ${token}`
                    }
                })
            .then((res) => {
                setSelectedPlant({
                    category: selectedPlant.category_id,
                    name: selectedPlant.name,
                    imageUrl: selectedPlant.image_url,
                    description: selectedPlant.description,
                    density: selectedPlant.density,
                    waterQuantity: selectedPlant.water_quantity,
                    startSowingMonth: selectedPlant.start_sowing_month,
                    endSowingMonth: selectedPlant.end_sowing_month,
                    startHarvestMonth: selectedPlant.start_harvest_month,
                    endHarvestMonth: selectedPlant.end_harvest_month,
                    climatId: selectedPlant.climat_id
                });
                setMessage('Plante mise à jour')
                setSeverity('success')
            })
            .catch((error) =>{
                setMessage('Une erreur est survenue')
                setSeverity('error')
            })
            .finally(() => {
                setOpenSnack(true);
                getPlants();
                setDisplayUpdateForm(false);
            })
    }

    const deletePlant = (id) => {
        axios.delete(`${baseUrl}/plants/${id}/delete`,
        {headers: {
            'Authorization' : `Bearer ${token}`
        }})
        .then((res) => {
            setMessage(res.data)
            setSeverity('success')
        })
        .catch((error) =>{
            setMessage(error.response)
            setSeverity('error')
        })
        .finally(() => {
            setOpenSnack(true);
            getPlants();
        })
    }

    useEffect(() => {
        getPlants();
    }, [])


    const sortedPlants = [...plants].sort((a, b) =>
    a.name > b.name ? 1 : -1,
  );

    return (
        <>
            <Box sx={{display:'flex', justifyContent: 'end', mb: 5}}>
                <Button content="Ajouter" onClick={() => {setDisplayNewPlant(true); setDisplayUpdateForm(false)} }/>
            </Box>
            {displayNewPlant && 
            <>
                        <H1 content="Ajouter une plante" />

                <StyledContainer>

                    <StyledBox>
                        <Typography sx={{mr: 2}}> Nom :</Typography>
                        <TextField sx={{width: 250}} variant="outlined" value={newPlant.name} onChange={handleNewPlantName} />
                    </StyledBox>

                    <StyledBox >
                    <Typography sx={{mr: 2}}> Catégorie :</Typography>
                        <Select
                        value={newPlant.category_id}
                        onChange={handleNewPlantCategory}
                        sx={{width: 250}}
                        defaultValue="2"
                        >
                            {categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                        </Select>
                    </ StyledBox >
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Description :</Typography>
                        <TextField sx={{width: 250}} variant="outlined" value={newPlant.description} onChange={handleNewPlantDescription} />
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Densité /m² :</Typography>
                        <TextField sx={{width: 250}} variant="outlined" type="number" value={newPlant.density} onChange={handleNewPlantDensity} />
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Eau (L) :</Typography>
                        <TextField sx={{width: 250}} variant="outlined" type="number" value={newPlant.water_quantity} onChange={handleNewPlantWater} />
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Début semis :</Typography>
                        <Select
                        value= {newPlant.start_sowing_month}
                        // defaultValue="Janvier"
                        onChange={handleNewPlantStartSowingChange}
                        sx={{width: 250}}
                        >
                            {months.map((month) => <MenuItem key={month.name} value={month.name}>{month.name}</MenuItem>)}
                        </Select>
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Fin semis :</Typography>
                        <Select
                            value= {newPlant.end_sowing_month}
                        // defaultValue="Choisir"
                        onChange={handleNewPlantEndSowingChange}
                        sx={{width: 250}}
                        >
                            {months.map((month) => <MenuItem key={month.name} value={month.name}>{month.name}</MenuItem>)}
                        </Select>
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Début récolte :</Typography>
                        <Select
                            value= {newPlant.start_harvest_month}
                            onChange={handleNewPlantStartHarvestChange}
                            sx={{width: 250}}
                        >
                            {months.map((month) => <MenuItem key={month.name} value={month.name}>{month.name}</MenuItem>)}
                        </Select>
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Fin récolte:</Typography>
                        <Select
                            value= {newPlant.end_harvest_month}
                            onChange={handleNewPlantEndHarvestChange}
                            sx={{width: 250}}
                        >
                            {months.map((month) => <MenuItem key={month.name} value={month.name}>{month.name}</MenuItem>)}
                        </Select>
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> URL de l'image</Typography>
                        <TextField sx={{width: 250}} variant="outlined" value={newPlant.image_url} onChange={handleNewPlantImageUrl} />
                    </StyledBox>
                <Box sx={{display:'flex',  justifyContent:'space-around'}}>  
                    <Button content="Valider" onClick={createNewPlantation}/>
                    <RedButton content="Annuler" onClick={() => setDisplayNewPlant(false)}/> 
                </Box>
                </StyledContainer>
                <Divider sx={{mb:`${pxToRem(30)}`, mt:`${pxToRem(30)}`}}/>
            </>
            }
            {displayUpdateForm &&  
            <> 
            <H1 content="Mettre à jour une plantation" />
                <StyledContainer>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Nom :</Typography>
                        <TextField sx={{width: 250}} variant="outlined" value={selectedPlant.name} onChange={handleNameChange}/>
                    </StyledBox>

                     <StyledBox >
                     <Typography sx={{mr: 2}}> Catégorie :</Typography>
                        <Select
                        onChange={handleCategoryChange}
                        value={selectedPlant.category_id}
                        sx={{width: 250}}
                        >
                            {categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                        </Select>
                    </ StyledBox >
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Description :</Typography>
                        <TextField sx={{width: 250}} variant="outlined" value={selectedPlant.description} onChange={handleDescChange} />
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Densité /m2 :</Typography>
                        <TextField sx={{width: 250}} variant="outlined" value={selectedPlant.density} onChange={handleDensityChange} />
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Eau (L) :</Typography>
                        <TextField sx={{width: 250}} variant="outlined" value={selectedPlant.water_quantity} onChange={handleWaterChange} />
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Début semis :</Typography>
                        <Select
                        onChange={handleStartSowingChange}
                        value={selectedPlant.start_sowing_month}
                        sx={{width: 250}}
                        >
                            {months.map((month) => <MenuItem key={month.name} value={month.name}>{month.name}</MenuItem>)}
                        </Select>
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Fin semis :</Typography>
                        <Select
                        onChange={handleEndSowingChange}
                        value={selectedPlant.end_sowing_month}
                        sx={{width: 250}}
                        >
                            {months.map((month) => <MenuItem key={month.name} value={month.name}>{month.name}</MenuItem>)}
                        </Select>
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Début récolte :</Typography>
                        <Select
                        onChange={handleStartHarvestChange}
                        value={selectedPlant.start_harvest_month}
                        sx={{width: 250}}
                        >
                            {months.map((month) => <MenuItem key={month.name} value={month.name}>{month.name}</MenuItem>)}
                        </Select>
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> Fin récolte:</Typography>
                        <Select
                        onChange={handleEndHarvestChange}
                        value={selectedPlant.end_harvest_month}
                        sx={{width: 250}}
                        >
                            {months.map((month) => <MenuItem key={month.name} value={month.name}>{month.name}</MenuItem>)}
                        </Select>
                    </StyledBox>
                    <StyledBox>
                        <Typography sx={{mr: 2}}> URL de l'image</Typography>
                        <TextField sx={{width: 250}} variant="outlined" value={selectedPlant.image_url} onChange={handleImageUrlChange} />
                    </StyledBox>
                    <Box sx={{display:'flex',  justifyContent:'space-around'}}>  
                        <Button content="Valider" onClick={() => updatePlant()}/>
                        <RedButton content="Annuler" onClick={() => setDisplayUpdateForm(false)}/>
                    </Box>
                    
                </StyledContainer>
                <Divider sx={{mb:`${pxToRem(30)}`, mt:`${pxToRem(30)}`}}/>
                </> 
            }

            <TableContainer  sx={{ minWidth: 650, maxHeight: 682}} >
            {sortedPlants ?        
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:'bold'}}>ID</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}}>Image</TableCell>
                            <TableCell align="left" sx={{fontWeight:'bold'}}>Nom</TableCell>
                            <TableCell align="left" sx={{fontWeight:'bold'}}>Catégorie</TableCell>
                            <TableCell align="left" sx={{fontWeight:'bold'}}>Description</TableCell>
                            <TableCell align="left" sx={{fontWeight:'bold'}}>Densité</TableCell>
                            <TableCell align="left" sx={{fontWeight:'bold'}}>Eau</TableCell>
                            <TableCell align="left" sx={{fontWeight:'bold'}}>Semis</TableCell>
                            <TableCell align="left" sx={{fontWeight:'bold'}}>Récoltes</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}}>Mettre à jour</TableCell>
                            <TableCell align="center" sx={{fontWeight:'bold'}}>Supprimer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        { sortedPlants.map((plant) => (
                        <TableRow
                            key={plant.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                            <TableCell component="th" scope="row">
                                {plant.id}
                            </TableCell>
                            <TableCell align="center"><img width="100" src={plant.image_url ? plant.image_url  : defaultImg} alt={`${plant.name}`}/></TableCell>
                            <TableCell align="left">{plant.name}</TableCell>
                            <TableCell align="left">{plant.category_name}</TableCell>
                            <TableCell align="left">{plant.description}</TableCell>
                            <TableCell align="left">{plant.density} / m²</TableCell>
                            <TableCell align="left">{plant.water_quantity} litres</TableCell>
                            <TableCell align="left">{plant.start_sowing_month.toUpperCase()} à {plant.end_sowing_month.toUpperCase()} </TableCell>
                            <TableCell align="left">{plant.start_harvest_month.toUpperCase()} à {plant.end_harvest_month.toUpperCase()} </TableCell>
                            <TableCell align="center"><AutoFixHighIcon color="primary" sx={{cursor: "pointer"}} onClick={() => {setDisplayUpdateForm(true); setDisplayNewPlant(false); setSelectedPlant({...plant})}}/></TableCell>
                            <TableCell align="center"><DeleteIcon color="error" sx={{cursor: "pointer"}} onClick={() => deletePlant(plant.id)}/></TableCell>
                        </TableRow>
                         ))} 
                    </TableBody>
                </Table>
            :
            <p>Aucun produit disponible actuellement</p>
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
        </>
    )
}

AdminTablePlantation.propTypes = {
    plants: PropTypes.array
}

export default AdminTablePlantation;