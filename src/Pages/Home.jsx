import React from 'react';
// import {authContext} from '../Components/Contexts'
import styled from 'styled-components';
import pxToRem from '../Services/pxToRem';
import Text from '../Components/Text';
import H1 from '../Components/H1';
import H2 from '../Components/H2';
import Colors from '../Config/theme/colors';
import Styles from '../Config/theme/styles';
import Fonts from '../Config/theme/fonts';
import { Image_size } from '../Config/theme/image_size';
import { Box } from '@mui/system';
import { breakpoint_mobile }from '../Config/theme/breakpoint_mobile';
import { Typography } from '@mui/material';

    const Top = styled.div`
        max-height: ${pxToRem(350)};
        color: ${Colors.neutral};
        background: url('images/child-with-harvest-vegetables-garden-selective-focus.jpg') center no-repeat;
        background-size: cover;
        padding: ${Styles.padding.xxxl};
        display: flex;
        justify-content:space-evenly;
        bottom:0;

        @media screen and (max-width:${breakpoint_mobile.tabletS}){
            padding: ${Styles.padding.sm} ${Styles.padding.l};
        }

        @media screen and (max-width:${breakpoint_mobile.mobileL}){
            background: ${Colors.secondary};
        }
    `;

    const BoxStyled = styled.div`
        width: 30%;
        margin-left: 50%;
        display: flex;
        flex-direction : column;

        @media screen and (max-width:${breakpoint_mobile.tabletL}){
            width: 40%;
            margin-left: 65%;
        }

        @media screen and (max-width:${breakpoint_mobile.tabletS}){
            width: 40%;
            margin-left: 52%;
        }

        @media screen and (max-width:${breakpoint_mobile.mobileL}){
            width: 100%;
            margin-left: 0;
            padding: ${Styles.padding.sm};
        }

    `;

    const ImageCategory = styled.img`
        width: ${Image_size.sm};
        margin: ${Styles.margin.md};
        display: block;
        background: ${Colors.neutral};
        box-shadow: ${Styles.boxShadow.lg};
        padding: ${Styles.padding.md};
        border-radius: ${Styles.radius.xl};
    `;

    const BoxStyled2 = styled.div`
        width: fit-content;
        margin: ${Styles.margin.lg};
        display:flex;
        flex-direction:column; 
        align-items:center;

        @media screen and (max-width:${breakpoint_mobile.mobileM}){
            margin: 0;

    `;

    const StyledDiv = styled.div`
        max-width:${pxToRem(1024)};
        margin: ${Styles.margin.lg} ${Styles.margin.auto};
        text-align: center;
    `;
    
    const StyledDiv2 = styled.div`
        display: flex;
        justify-content : center;
        margin: 3rem auto;
        max-width:${pxToRem(1024)};

        @media screen and (max-width:${breakpoint_mobile.tabletL}){
            padding: ${Styles.padding.lg}
            
        }

        @media screen and (max-width:${breakpoint_mobile.mobileL}){
            display: block;
            text-align: center;
            
        }
    `;

    const ImageStyled = styled.img`
        width: ${pxToRem(400)};
        height: ${pxToRem(420)};
        border-radius: ${Styles.radius.xl};
        object-fit: cover;

        @media screen and (max-width:${breakpoint_mobile.mobileM}){
            width: ${pxToRem(250)};
            height: ${pxToRem(265)};
            
        }
    `;

    const Bottom = styled.div`
        color: ${Colors.primary};
        background-color: ${Colors.secondary};
        padding: ${Styles.padding.xl};
        display: flex;
        justify-content:center;
        
    `;

    const ImageSocial = styled.img`
        display: block ;
        width: ${Image_size.xs};
        margin: ${Styles.margin.auto};
    `;

    const IconsSocial = styled.div`
        display: flex; 
        justify-content : center;

        @media screen and (max-width:${breakpoint_mobile.mobileL}){
            text-align: center;
            display: block;
            
        }
    `;

    const Social = styled.img`
        width: ${Image_size.xs};
        margin: ${Styles.margin.sm};
    `;


const Home = (props) => {


        const src_carrot = 'images/category_2.png';
        const src_strawberry = 'images/category_1.png';
        const src_peppermint = 'images/category_3.png';
        const src_boxVegetables = 'images/close-up-box-with-vegetables-hands-mature-man.jpg';
        const src_woman = 'images/woman.png';
        const src_man = 'images/man.png';
        const src_git = 'images/github.png';
        const src_linkedin = 'images/linkedin.png'

    return (
        <div>
            <Top>
                <BoxStyled >
                    <H1 content = "Mon calendrier de plantation au potager"/>
                    <Text 
                        content = "At vero eos et accusamus et iusto odio dignissimos ducimus quiblanditiis praesentium voluptatumleniti atque corrupti quos eset quas molestias pturi.At vero eos et accusamus et iusto odio dignissimos ducimus quiblanditiis praesentium voluptatumleniti atque corrupti quos eset quas molestias pturi"
                        margin = {`${Styles.margin.zero}`}
                    
                    />
                </BoxStyled >
            </Top>
            <StyledDiv>
                <H2 content = "Catégories"/>
                <Typography sx={{textAlign:'center', fontFamily:'inherit'}} > Grâce à “Mon petit Potager”, semez au bon moment pour avoir les meilleurs récoltes ! </ Typography>
                <Typography sx={{textAlign:'center', fontFamily:'inherit'}} > Que souhaitez-vous planter ? </ Typography>
                <Box sx = {{ display: 'flex', justifyContent: 'space-evenly'}}>
                    <BoxStyled2>
                        <ImageCategory
                            src = {src_carrot}
                            alt="Légumes"
                        />
                        <Typography sx={{textAlign:'center', fontFamily:'inherit'}} >Légumes</ Typography>
                    </BoxStyled2>
                    <BoxStyled2>
                        <ImageCategory
                            src = {src_strawberry}
                            alt="Fruits"
                        />
                        <Typography sx={{textAlign:'center', fontFamily:'inherit'}} >Fruits</ Typography>
                    </BoxStyled2>
                    <BoxStyled2>
                        <ImageCategory
                            src = {src_peppermint}
                            alt="Plantes Aromatiques"
                        />
                        <Typography sx={{textAlign:'center', fontFamily:'inherit'}} >Plantes Aromatiques</ Typography>
                    </BoxStyled2>
                </Box>
            </StyledDiv>
            <StyledDiv2>
                <Box sx = {{ mr: 2}}>
                    <H2 content = "À propos de nous"/>
                    <Text content = "Un projet d'équipe" weight = {`${Fonts.weight.bold}`} textAlign = { {sm: `${Styles.textAlign.center}`}} />
                    <Text content = "Sed ultrices nisl velit, eu ornare est ullamcorper a. Nunc quisnibh magna. Proin risus erat, fringilla vel purus sit amet, mattisporta enim. Duis fermentum faucibus est, sed vehicula velitsodales vitae."
                        textAlign = { {sm: `${Styles.textAlign.center}`}} margin = { {sm: `${Styles.margin.sm}`}} />
                </Box>
                <Box sx = {{ ml: 2 }}>
                    <ImageStyled
                        src = {src_boxVegetables}
                    />
                </Box>
            </StyledDiv2>
            <Bottom>
                <Box sx = {{ mx: { sm: 2, md: 3 }, display: { sm: 'flex'}, flexDirection: { sm: 'column'}, alignItems: { sm: 'center'}}}>
                    <ImageSocial
                        src = {src_woman}
                        alt="Pauline"
                    />
                    <Text content ="Pauline" fontSize = {`${Fonts.size.itemMenu}`} weight = {`${Fonts.weight.bold}`} textAlign = {`${Styles.textAlign.center}`} margin = {`${Styles.margin.zero}`}/>
                    <Text content = "Product Owner" textAlign = {`${Styles.textAlign.center}`} margin = {`${Styles.margin.zero}`} />
                    <IconsSocial>
                        <a href = "https://github.com/" target = "blank" >
                            <Social 
                                src = {src_git}
                                alt="github"
                            />
                        </a>
                        <a href = "https://www.linkedin.com/" target = "blank" >
                            <Social
                                src = {src_linkedin}
                                alt="linkedin"
                            />
                        </ a>
                    </IconsSocial>
                </Box>
                <Box sx = {{ mx: { sm: 2, md: 3 }, display: { sm: 'flex'}, flexDirection: { sm: 'column'}, alignItems: { sm: 'center'}}}>
                    <ImageSocial
                        src = {src_woman}
                        alt="Audrey"
                    />
                    <Text content ="Audrey" fontSize = {`${Fonts.size.itemMenu}`} weight = {`${Fonts.weight.bold}`} textAlign = {`${Styles.textAlign.center}`} margin = {`${Styles.margin.zero}`}/>
                    <Text content = "Scrum Master" textAlign = {`${Styles.textAlign.center}`} margin = {`${Styles.margin.zero}`} />
                    <IconsSocial>
                        <a href = "https://github.com/" target = "blank" >
                            <Social 
                                src = {src_git}
                                alt="github"
                            />
                        </a>
                        <a href = "https://www.linkedin.com/" target = "blank" >
                            <Social
                                src = {src_linkedin}
                                alt="linkedin"
                            />
                        </ a>
                    </IconsSocial>
                </Box>
                <Box sx = {{ mx: { md: 1 }, display: { sm: 'flex'}, flexDirection: { sm: 'column'}, alignItems: { sm: 'center'}}}>
                    <ImageSocial
                        src = {src_man}
                        alt="Barnabé"
                    />
                    <Text content ="Barnabé" fontSize = {`${Fonts.size.itemMenu}`} weight = {`${Fonts.weight.bold}`} textAlign = {`${Styles.textAlign.center}`} margin = {`${Styles.margin.zero}`}/>
                    <Text content = "Github Master" textAlign = {`${Styles.textAlign.center}`} margin = {`${Styles.margin.zero}`} />
                    <IconsSocial>
                        <a href = "https://github.com/" target = "blank" >
                            <Social 
                                src = {src_git}
                                alt="github"
                            />
                        </a>
                        <a href = "https://www.linkedin.com/" target = "blank" >
                            <Social
                                src = {src_linkedin}
                                alt="linkedin"
                            />
                        </ a>
                    </IconsSocial>
                </Box>
                <Box sx = {{ mx: { sm: 2, md: 3 }, display: { sm: 'flex'}, flexDirection: { sm: 'column'}, alignItems: { sm: 'center'}}}>
                    <ImageSocial
                        src = {src_man}
                        alt="Loïc"
                    />
                    <Text content ="Loïc" fontSize = {`${Fonts.size.itemMenu}`} weight = {`${Fonts.weight.bold}`} textAlign = {`${Styles.textAlign.center}`} margin = {`${Styles.margin.zero}`}/>
                    <Text content = "Lead DevBack" textAlign = {`${Styles.textAlign.center}`} margin = {`${Styles.margin.zero}`} />
                    <IconsSocial sx = {{ display: 'flex', textAlign: 'center' }}>
                        <a href = "https://github.com/" target = "blank" >
                            <Social 
                                src = {src_git}
                                alt="github"
                            />
                        </a>
                        <a href = "https://www.linkedin.com/" target = "blank" >
                            <Social
                                src = {src_linkedin}
                                alt="linkedin"
                            />
                        </ a>
                    </IconsSocial>
                </Box>
                <Box sx = {{ mx: { sm: 2, md: 3 }, display: { sm: 'flex'}, flexDirection: { sm: 'column'}, alignItems: { sm: 'center'}}}>
                    <ImageSocial
                        src = {src_man}
                        alt="Virgile"
                    />
                    <Text content ="Virgile" fontSize = {`${Fonts.size.itemMenu}`} weight = {`${Fonts.weight.bold}`} textAlign = {`${Styles.textAlign.center}`} margin = {`${Styles.margin.zero}`}/>
                    <Text content = "Lead DevFront" textAlign = {`${Styles.textAlign.center}`} margin = {`${Styles.margin.zero}`} />
                    <IconsSocial>
                        <a href = "https://github.com/" target = "blank" >
                            <Social 
                                src = {src_git}
                                alt="github"
                            />
                        </a>
                        <a href = "https://www.linkedin.com/" target = "blank" >
                            <Social
                                src = {src_linkedin}
                                alt="linkedin"
                            />
                        </ a>
                    </IconsSocial>
                </Box>
            </Bottom>
        </div>
    )
}

export default Home;