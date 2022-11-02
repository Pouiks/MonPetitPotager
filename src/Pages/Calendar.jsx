import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Styles from '../Config/theme/styles';
import H1 from '../Components/H1';
import H3 from '../Components/H3';
import SearchBar from '../Components/SearchBar';
import axios from "axios";
import baseUrl from '../Config/baseUrl';
import PlantsList from '../Components/PlantsList';
import PlantsListMobile from '../Components/PlantsListMobile';
import DetailPlant from '../Components/PlantDetail'
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import FilterCategory from '../Components/Filter';
import Text from '../Components/Text';
import colors from '../Config/theme/colors';
import pxToRem from '../Services/pxToRem'
import FilterRegion from '../Components/FilterRegion';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Content = styled.div`
    padding: ${Styles.padding.xl};
`

const Filters = styled.div`
    padding: ${Styles.padding.sm};
    display: flex;
    gap: 1%;
`

const Legend = styled.div`
    padding: ${Styles.padding.sm};
    display: flex;
    width: ${pxToRem(325)};
`

const SowingDot = styled.div`
    width: 25px;
    height: 25px;
    border-radius: ${Styles.radius.circ};
    background-color: ${colors.secondary};
`

const HarvestDot = styled.div`
    width: 25px;
    height: 25px;
    border-radius: ${Styles.radius.circ};
    background-color: ${colors.tertiary};
`

const Calendar = () => {
    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [plants, setPlants] = useState([]);
    const [plant, setPlant] = useState({});
    const [isShown, setIsShown] = useState(false);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState('');
    const [plantsByRegion, setPlantsByRegion] = useState([]);
    const [gardens, setGardens] = useState([]);
    const [userPlants, setUserPlants] = useState([]);

    //snackbar
    const [openSnack, setOpenSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const getPlants = () => {
        try {
            axios.get(baseUrl + "/plants").then((res) => {
                setPlants(res.data);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const getPlant = (id) => {
        try {
            axios.get(baseUrl + '/plants/' + id).then((res) => {
                setPlant(res.data.plant);
                openDetail()
            });
        } catch (error) {
            console.error(error);
        }
    }

    const getCategories = () => {
        try {
            axios.get(baseUrl + "/categories").then((res) => {
                setCategories(res.data);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const getRegions = () => {
        try {
            axios.get(baseUrl + "/regions").then((res) => {
                setRegions(res.data);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const getPlantsbyRegions = (id) => {
        if (id && id !== "") {
            try {
                axios.get(baseUrl + "/plants/region/" + id).then((res) => {
                    setPlantsByRegion(res.data);
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            setPlantsByRegion(filteredPlants);
        }
    }

    const getGardens = (id) => {
        if (id && id !== '') {
            try {
                axios.get(baseUrl + "/gardens/user/" + id, { headers: { 'Authorization': `Bearer ${token}` } })
                    .then((res) => {
                        setGardens(res.data.gardens);
                    });
            } catch (error) {
                console.error(error);
            }
        }
    }

    const gardenId = gardens[0]?.id;

    const getUserPlants = (id) => {
        try {
            axios.get(baseUrl + "/plants/user/" + id, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                setUserPlants(res.data);    
            });
        } catch (error) {
            console.error(error);
        }
    }

    const addPlant = (id) => {
        if (userId && userId !== undefined && gardens.length > 0) {
            axios.post(baseUrl + "/gardens/plant/add", {
                plantId: id,
                gardenId: gardenId
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((res) => {
                    setMessage(res.data.message)
                    setSeverity('success')
                })
                .catch((error) => {
                    setMessage(error.response.data)
                    setSeverity('error')
                })
                .finally(() => {
                    setOpenSnack(true);
                })
        } else if (gardens.length === 0) {
            navigate("/mon-potager");
        }
    }

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
            })
    }

    const openDetail = () => {
        setIsShown(true)
    };

    const closeDetail = () => {
        setIsShown(false)
    };

    const handleClose = () => {
        setOpenSnack(false);
    };

    // For category filter
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    // For region filter
    const handleRegionChange = (event) => {
        const id = event.target.value;
        setRegion(id);
        getPlantsbyRegions(id);
    };

    // For Search Bar
    const handleSearch = (event) => {
        setSearch(event.target.innerText)
    };

    useEffect(() => {
        getPlants();
        getCategories();
        getRegions();
        getGardens(userId);
        getUserPlants(userId);
    }, [userId]);

    let regionsPlants = plants;

    if (plantsByRegion.length > 0) {
        regionsPlants = plantsByRegion;
    }

    const categoriesPlants = regionsPlants
        .sort((a, b) =>
            a.name > b.name ? 1 : -1,
        )
        .filter((plant) => {
            if (category === '' || category === undefined) {
                return plants
            }
            else if (plant.category_id === category) {
                return plant
            }
        }
        );

    const filteredPlants = regionsPlants
        .sort((a, b) =>
            a.name > b.name ? 1 : -1,
        )
        .filter((plant) =>
        // Search
        {
            if (search === '' || search === undefined) {
                return plants
            }
            else if (plant.name === search) {
                return plant
            }
        }
        )
        .filter((plant) =>
        // Filter category
        {
            if (category === '' || category === undefined) {
                return plants
            }
            else if (plant.category_id === category) {
                return plant
            }
        }
        );

    return (
        <div>

            <Content>
                <H1 content="Calendrier de plantation" />

                <Filters>
                    <FilterCategory
                        categories={categories}
                        category={category}
                        handleCategoryChange={handleCategoryChange} />
                    {/* <FilterRegion
                        regions={regions}
                        region={region}
                        handleRegionChange={handleRegionChange} /> */}
                    <SearchBar
                        plants={categoriesPlants}
                        search={search}
                        handleSearch={handleSearch} />
                </Filters>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }} >

                    <div style={
                        isShown
                            ? { width: '73%' }
                            : { width: '100%' }} >

                        <H3 content="Légende" />
                        <Legend>
                            <SowingDot />
                            <Text
                                content="Période de semis"
                            />

                            <HarvestDot />
                            <Text
                                content="Période de récolte"
                            />
                        </Legend>

                        {filteredPlants &&
                            <PlantsList
                                plants={filteredPlants}
                                userPlants={userPlants}
                                getPlant={getPlant}
                                userId={userId}
                                addPlant={addPlant}
                                deletePlant={deletePlant} />
                        }
                        {filteredPlants &&
                            <PlantsListMobile
                                plants={filteredPlants}
                                userPlants={userPlants}
                                userId={userId}
                                addPlant={addPlant}
                                deletePlant={deletePlant}
                            />}
                    </div>

                    {isShown &&
                        <Box sx={{ boxShadow: `${Styles.boxShadow.xl}`, width: '25%', ml: '2%', borderRadius: 6, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'end', height: 'fit-content', position: 'sticky', top: 150 }}>
                            <IconButton aria-label="delete" size="large" onClick={() => closeDetail()}>
                                <CancelIcon fontSize="inherit" />
                            </IconButton>
                            <DetailPlant
                                plant={plant}
                                userPlants={userPlants}
                                userId={userId}
                                addPlant={addPlant}
                                deletePlant={deletePlant} />
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

export default Calendar;