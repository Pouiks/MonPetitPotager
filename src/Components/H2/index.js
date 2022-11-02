import React from 'react';
import font from '../../Config/theme/fonts.js'
import colors from '../../Config/theme/colors.js'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const StyledH2 = styled.h2`
    font-size: ${font.size.h2};
    color: ${colors.primary};
    weight: ${font.weight.medium};
`
const H2 = (props) => {
    const content = props.content
    const color = props.color
    const fontSize = props.fontSize
    const weight = props.weight
    const textAlign = props.textAlign

    return (
        <StyledH2 sx ={{ textAlign : `${textAlign}`, color:`${color}`,fontSize:`${fontSize}`,weight:`${weight}`}}>{content}</StyledH2>
    )
}

H2.propTypes = {
    content: PropTypes.string.isRequired,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    weight: PropTypes.string,
    margin: PropTypes.string,
}

export default H2;