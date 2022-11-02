import React, { useState }  from 'react';
import { slice } from 'lodash';
import ImgCal from '../ImgCal';
import AddButton from '../AddButton';
import DeleteButton from '../DeleteButton';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Button from '../Button';
import styled from 'styled-components';
import pxToRem from '../../Services/pxToRem';

const PictoCat = styled.img`
    width:${pxToRem(25)};
    height:auto;
    margin-right:${pxToRem(15)};
`;

const MonthsEnum = {
    janvier: 1,
    fevrier: 2,
    mars: 3,
    avril: 4,
    mai: 5,
    juin: 6,
    juillet: 7,
    aout: 8,
    septembre: 9,
    octobre: 10,
    novembre: 11,
    decembre: 12
};

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const PlantsList = (props) => {
    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(5)
    const {plants, getPlant, userId, addPlant, deletePlant, userPlants} = props;

    if (!plants) return null;

    // For Load More Button
    const initialPlants = slice(plants, 0, index)
    const loadMore = () => {
    setIndex(index + 5)
        if (index >= plants.length) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }

    // let checks = 0;

    return (
        <div className = "calendar" sx={{ overflow: 'hidden' }}>
        <TableContainer  sx={{ minWidth: 650, minHeight: 682, maxHeight: 900 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>J</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>F</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>M</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>A</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>M</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>J</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>J</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>A</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>S</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>O</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>N</TableCell>
                        <TableCell align="center" sx={{fontWeight:"bold"}}>D</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                {initialPlants.map((plant) => (
                    <TableBody key={plant.id}>
                        <TableRow >
                            <TableCell rowSpan={2}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PictoCat src={"images/category_"+plant.category_id+".png"}/>
                                    <ImgCal src={plant.image_url} />
                                    <Typography sx={{ml:3}} variant="h6">{capitalize(plant.name)}</Typography>
                                </Box>
                            </TableCell>

                            {months.map((month) => {

                                const sowingStart = MonthsEnum[plant.start_sowing_month];
                                const sowingEnd = MonthsEnum[plant.end_sowing_month];

                                if (sowingStart <= month && sowingEnd >= month)
                                    return <TableCell sx={{px:0, position:'relative'}} key={month}><div className="sowing"></div></TableCell>

                                return <TableCell key={month}></TableCell>
                            })}

                            <TableCell rowSpan={2} sx={{ textAlign: 'center' }}>
                                <Box sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', mt: 1 }}>
                                    <Button content="Voir"
                                        onClick={() => getPlant(plant.id)}/>
                                </Box>
                                {userId && 
                                    <Box sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', mt: 1 }}>

                                    <AddButton
                                        content="-"
                                        alt="Ajouter"
                                        title="Ajouter"
                                        onClick={() => addPlant(plant.id)} />

                                    {/* {
                                        userPlants.map((element) => {
                                            if (plant.id !== element.plant_id) {
                                                checks ++;
                                                if(checks === userPlants.length) {
                                                    return <AddButton
                                                    content="-"
                                                    alt="Ajouter"
                                                    title="Ajouter"
                                                    onClick={() => addPlant(plant.id)} />
                                                }
                                            }
                                        })
                                    } */}
                                    
                                    {userPlants.map((element) => {
                                            if (plant.id === element.plant_id) {
                                                return <DeleteButton
                                                    content="-"
                                                    alt="Supprimer"
                                                    title="Supprimer"
                                                    onClick={() => deletePlant(plant.id)} />
                                            }
                                        })
                                    }
                                </Box>
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {months.map((month) => {
                                const harvestStart = MonthsEnum[plant.start_harvest_month];
                                const harvestEnd = MonthsEnum[plant.end_harvest_month];

                                if (harvestStart <= month && harvestEnd >= month)
                                    return <TableCell sx={{px:0, position:'relative'}} key={month}><div className="harvest"></div></TableCell>

                                    return <TableCell key={month}></TableCell>
                            })}
                        </TableRow>
                    </TableBody>
                ))}

            </Table>
        </TableContainer>

        <Box sx={{display:'flex', justifyContent:'center'}}>
        {isCompleted ? (
        <Button content="FIN" onClick={loadMore} />
        ) : (
        <Button content="Voir +" onClick={loadMore} />
        )}
        </Box>
        </div>
    )
}

PlantsList.propTypes = {
    plants: PropTypes.array.isRequired
}

export default PlantsList;