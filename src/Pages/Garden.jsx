import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Styles from '../Config/theme/styles';
import Button from '../Components/Button';
import axios from "axios";
import baseUrl from '../Config/baseUrl';
import CreateGardenForm from '../Components/CreateGardenForm';
import H1 from '../Components/H1';
import H2 from '../Components/H2';
import H3 from '../Components/H3';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import GardenPlantsList from '../Components/GardenPlantsList';
import GardenPlantsListMobile from '../Components/GardenPlantsListMobile';
import DeleteButton from '../Components/DeleteButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GardenPlantDetail from '../Components/GardenPlantDetail'

const Content = styled.div`
    padding: ${Styles.padding.xl};
    text-align: center;
`
const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const Garden = () => {
    
    let userId = localStorage.getItem('id');
    userId = parseInt(userId);
    const token = localStorage.getItem('token');

    const [gardens, setGardens] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [plant, setPlant] = useState({});

    //snackbar
    const [openSnack, setOpenSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const handleClose = () => {
        setOpenSnack(false);
    };

    const handleClick = () => {
        setIsShown(true);
    };

    const closeDetail = () => {
        setIsShown(false)
    };

    const getAll = (id) => {
        let regions = [];
        try {
            axios.get(baseUrl + "/regions").then((res) => {
                regions = res.data;
            });
        } catch (error) {
            console.error(error);
        }
        if (id && id !== '') {
            try {
                axios.get(baseUrl + "/plants/user/" + id, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                    const plants = res.data;                    
                    getGardens(id, plants, regions);
                });

            } catch (error) {
                console.error(error);
            }
        }
    }
    
    const getGardens = (id, plants, regions) => {
        if (id && id !== '') {
            try {
                axios.get(baseUrl + "/gardens/user/" + id, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                    const data_garden = res.data.gardens;
                    data_garden.forEach(garden => {
                        regions.forEach(region => {
                            if (garden.region_id === region.id) {
                                garden.region_name = region.name
                            }
                        })

                        garden.plants = [];

                        plants.forEach(plant => {
                            if (garden.id === plant.garden_id)
                                garden.plants.push(plant)
                        })
                        
                    })
                    setGardens(data_garden);
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    const deleteGarden = (id) => {
        axios.delete(baseUrl + "/gardens/" + id + "/delete", { headers: { 'Authorization': `Bearer ${token}` } })
        
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
                setTimeout(function(){
                    window.location.reload();
                }, 1000);
            })
        }

    const openDetail = () => {
        setIsShown(true)
    };

    const gardenId = gardens[0]?.id;

    const deletePlant = (id) => {
        axios.post(baseUrl + "/gardens/plant/delete", {
            plantId: id,
            gardenId: gardenId
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => {
                setMessage(res.data)
                setSeverity('success')
            })
            .catch((error) => {
                setMessage(error.response)
                setSeverity('error')
            })
            .finally(() => {
                setOpenSnack(true);
                setTimeout(function(){
                    window.location.reload();
                }, 2000);
                
            })
    }

    const getPlant = (id) => {
        try {
            axios.get(baseUrl + '/plants/' + id, {
                plantId: id,
            },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((res) => {
                setPlant(res.data.plant);
                openDetail()
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAll(userId);
    }, [userId]);

    const garden = gardens[0];

    return (
        <div>
            <Content>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }} >
                    <div style={
                        isShown
                            ? { width: '73%' }
                            : { width: '100%' }
                        } >

                        {
                            gardens && gardens.length === 0
                                ?
                                <div>
                                    <H3 content="Vous n'avez pas encore de potager" />
                                    {
                                    !isShown &&
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                                        <Button
                                            content="Créer un potager"
                                            onClick={handleClick} />
                                    </Box>
                                    }
                                </div>
                                
                                :
                                <Box sx={{ textAlign: 'left'}}>
                                    <H1 content="Mon potager" />
                                    <>
                                        {/* {
                                            gardens.map((garden) => ( */}
                                                <div key={garden.id}>
                                                    <Box sx= {{display: 'flex', justifyContent:'space-around', alignItems: 'baseline', borderBottom: 1, mb: 4}}>
                                                    <H2 content={capitalizeFirst(garden.name)} />
                                                    <Typography>Superficie : {garden.area} m²</Typography>
                                                    <Typography>Région : {garden.region_name}</Typography>
                                                    <DeleteButton
                                                        content="-"
                                                        alt="Supprimer"
                                                        title="Supprimer"
                                                        onClick={() => deleteGarden(garden.id)} />
                                                    </Box>
                                                    {garden.plants.length > 0
                                                        ?
                                                        <>
                                                        <GardenPlantsList
                                                            plants={garden.plants}
                                                            getPlant={getPlant}
                                                            userId={userId}
                                                            deletePlant={deletePlant}
                                                        />

                                                        <GardenPlantsListMobile
                                                            plants={garden.plants}
                                                            getPlant={getPlant}
                                                            userId={userId}
                                                            deletePlant={deletePlant}
                                                        />
                                                        </>
                                                        :
                                                        <H3 content="Votre potager est vide" />
                                                    }

                                                </div>

                                            {/* )) } */}
                                    </>
                                </Box>
                        }

                    </div>

                    {isShown &&

                        <Box sx={{ boxShadow: `${Styles.boxShadow.xl}`, width: '25%', ml: '2%', borderRadius: 6, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'end', height: 'fit-content', position: 'sticky', top: 150 }}>
                            <IconButton aria-label="delete" size="large" onClick={() => closeDetail()}>
                                <CancelIcon fontSize="inherit" />
                            </IconButton>
                            {
                            gardens && gardens.length === 0
                                ?
                            <CreateGardenForm
                                userId={userId} />
                            :
                            <GardenPlantDetail
                            
                                //plant={plant}
                                plant={plant}
                                userId={userId}
                                //addPlant={addPlant}
                                deletePlant={deletePlant} />  
                            } 
                        </Box>
                           

                    }
                </Box>
            </Content>
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
        </div>
    )
}

export default Garden;