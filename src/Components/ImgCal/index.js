import React from 'react'
import styled from 'styled-components'
import pxToRem from '../../Services/pxToRem';
import Styles from '../../Config/theme/styles';
import PropTypes from 'prop-types';

const Image = styled.img`
background: #ffffff;
width: ${pxToRem(80)};
height: ${pxToRem(80)};
object-fit: cover;
border-radius: ${Styles.radius.md};
box-shadow: ${Styles.boxShadow.md};
`

const ImgCal = (props) => {

	const src = props.src;
    const alt = props.alt;

    const defaultImg = 'https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png';

    return(
        <Image
            src = {src ? src : defaultImg}
            alt = {alt}
        >
        </Image>
    )
}

ImgCal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
}

export default ImgCal;