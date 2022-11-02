import React from 'react'
import styled from 'styled-components'
import pxToRem from '../../Services/pxToRem';
import { breakpoint_mobile } from '../../Config/theme/breakpoint_mobile';
import PropTypes from 'prop-types';

const ImgErr = (props) => {

	const src = props.src;
    const alt = props.alt;


    const defaultImg = 'https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png';


    const Image = styled.img`
        width: ${pxToRem(500)};

        @media screen and (max-width:${breakpoint_mobile.mobileL}){
            width: ${pxToRem(300)};
            
        }
    `

    return(
        <Image
            src = {src ? src : defaultImg}
            alt = {alt}
        >
        </Image>
    )
}

ImgErr.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
}

export default ImgErr;