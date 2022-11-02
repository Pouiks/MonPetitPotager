import React from 'react';
import styled from 'styled-components'
import pxToRem from '../../Services/pxToRem'
import H1 from '../H1'
import Text from '../Text'
//import Button from '@mui/material/Button'
import Button from '../Button';
import RedButton from '../RedButton';
import Styles from '../../Config/theme/styles';
import PropTypes from 'prop-types';

const Container = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-content: center;
align-items: center;
justify-content: center;
`
const ChildContainer = styled.div`
width: 80%;
display: flex;
justify-content: center;
margin-bottom: ${Styles.margin.lg};
`
const StyledImg = styled.img`
border-radius: ${Styles.radius.md};
width: ${pxToRem(150)};
height: ${pxToRem(150)};
object-fit: cover;
box-shadow: ${Styles.boxShadow.md};
`
const GrandChild = styled.div`
margin: ${Styles.margin.nm};
padding: ${Styles.padding.nm};
`
const Ul = styled.div`
width: 100%;
`
const Li = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
`
const Hr = styled.hr`
width: 100%;
size: 1px;
`
const Action = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
`

const DetailPlant = (props) => {

    const {plant, userId, addPlant, deletePlant, userPlants} = props;

    const defaultImg = 'https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png';

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
   
    if (!plant) return null;

    return (
            <Container>

                <H1
                    content={capitalize(plant.name)}/>
                <ChildContainer>

                    <StyledImg
                        src={plant.image_url  ? plant.image_url  : defaultImg}
                        alt={plant.name}/>

                    <GrandChild>
                        <Text
                            content={"Catégorie : " + plant.category_name}/>
                        <Text
                            content={"Semis : de " + plant.start_sowing_month + " à " + plant.end_sowing_month}/>
                        <Text
                            content={"Récolte : de " + plant.start_harvest_month +" à "+ plant.end_harvest_month}/>
                    </GrandChild>

                </ChildContainer>

                <ChildContainer>
                    <Text
                        content={plant.description}/>
                </ChildContainer>

                <ChildContainer>

                    <Ul>
                        <Hr/>

                        <Li>
                            <Text
                                content="Densité"/>
                            <Text
                                content={"Semez " + plant.density + " plants par m2"}/>
                        </Li>

                        <Hr/>

                        <Li>
                            <Text
                                content="Quantité d'eau"/>
                            <Text
                                content={"Arrosez " + plant.water_quantity + " fois par semaine"}/>
                        </Li>

                        <Hr/>

                            {userId && 
                            <Action>
                                <Button
                                content="Ajouter"
                                onClick={() => addPlant(plant.id)} />

                                {userPlants.map((element) => {
                                            if (plant.id === element.plant_id) {
                                                return <RedButton
                                                content="Supprimer"
                                                onClick={() => deletePlant(plant.id)}/>
                                            }
                                        })
                                    }
                                
                            </Action>
                            }
                    </Ul>

                </ChildContainer>
            </Container>
    )
}

DetailPlant.propTypes = {
    plant: PropTypes.object.isRequired
}

export default DetailPlant;