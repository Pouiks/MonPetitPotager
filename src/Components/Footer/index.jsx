import React from 'react';
import { Link } from "react-router-dom";
import colors from '../../Config/theme/colors';
import styles from '../../Config/theme/styles';
import styled from 'styled-components';
import { breakpoint_mobile }from '../../Config/theme/breakpoint_mobile';

const StyledFooter = styled.div`
color: ${colors.neutral};
background-color: ${colors.primary};
padding: ${styles.padding.xl};
display: flex;
justify-content:space-evenly;
bottom:0;

@media screen and (max-width:${breakpoint_mobile.tabletS}){
    display:block;
}
`
const StyledContainer = styled.div`
display:flex;
justify-content:center;

@media screen and (max-width:${breakpoint_mobile.tabletS}){
    display:block;
    text-align: ${styles.textAlign.center};
    padding: ${styles.padding.md};
}
`
const StyledLink = styled(Link)`
color: ${colors.neutral};
text-decoration: ${styles.textDecoration.none};
margin: ${styles.margin.sm};

&:hover {
    text-decoration: ${styles.textDecoration.underline}
}
`

const Footer = () => {

    return(
            <StyledFooter>
                <StyledContainer >{(new Date().getFullYear())} Mon Petit Potager - Tous droits réservés</StyledContainer >
                <StyledContainer >
                    <StyledLink to="/mentions-legales" >Mentions légales</StyledLink >
                    <StyledLink to="/cgu">CGU</StyledLink >
                    <StyledLink to="/politique-confidentialite">Politique de confidentialité</StyledLink >
                </StyledContainer >
            </StyledFooter>
    );
}

export default Footer;
