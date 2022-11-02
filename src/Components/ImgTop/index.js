import React from 'react'
import styled from 'styled-components'
import pxToRem from '../../Services/pxToRem';
import PropTypes from 'prop-types';

const Image = styled.img`
width:100%;
height: ${pxToRem(300)};
max-height: ${pxToRem(300)};
object-fit : cover;
`

const ImgTop = (props) => {

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

ImgTop.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
}

export default ImgTop;