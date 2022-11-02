import React, { useState }  from 'react';
import { slice } from 'lodash';
import { Box, Typography } from '@mui/material';
import Text from '../Text'
import ImgCal from '../ImgCal';
import AddButton from '../AddButton';
import DeleteButton from '../DeleteButton';
import Button from '../Button';
import LinkButton from '../LinkButton';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import pxToRem from '../../Services/pxToRem';

const PictoCat = Styled.img`
    width:${pxToRem(25)};
    height:auto;
    margin-right:${pxToRem(15)};
`;

// For accordion
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  borderLeft: 'none',
  borderRight: 'none',

}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

// Capitalize plants name
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const PlantsListMobile = (props) => {

    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(5)
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // For list of plants
    const {plants, userId, addPlant, deletePlant, userPlants} = props;

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

  return (
    <div className='calendarMobile'>
        {initialPlants.map((plant) => (
        <Accordion expanded={expanded === 'panel' + plant.id} key={'panel1'+ plant.id} onChange={handleChange('panel'+ plant.id)}>
            <AccordionSummary aria-controls="panel1d-content" id={'panel1'+ plant.id+'header'}>
               <Box sx={{ ml:2, display: 'flex', alignItems: 'center' }}>
                    <PictoCat src={"images/category_"+plant.category_id+".png"}/>
                    <ImgCal src={plant.image_url} />
                    <Typography sx={{ml:3}} variant="h6">{capitalize(plant.name)}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ margin: 1, display:'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Text
                            content={"Catégorie : " + plant.category_name}/>
                        <Text
                            content={"Semis : de " + plant.start_sowing_month + " à " + plant.end_sowing_month}/>
                        <Text
                            content={"Récolte : de " + plant.start_harvest_month +" à "+ plant.end_harvest_month}/>
                        <Typography sx={{fontWeight: 'bold', mt:3}}>Description</Typography>
                        <Text margin='0 0 1.2rem 0'
                            content = {plant.description} />
                        <LinkButton
                            content = 'Consulter'
                            link={`/calendrier/${plant.id}`}
                        />
                    </Box>
                    {userId && 
                    <Box>
                        <AddButton
                            content="-"
                            alt="Ajouter"
                            title="Ajouter"
                            onClick={() => addPlant(plant.id)} />
                        
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
                </Box>
            </AccordionDetails>
        </Accordion>
        ))}
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

PlantsListMobile.propTypes = {
  plants: PropTypes.array.isRequired
}

export default PlantsListMobile;
