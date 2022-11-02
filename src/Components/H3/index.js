import React from 'react';
import font from '../../Config/theme/fonts.js'
import colors from '../../Config/theme/colors.js'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const H3 = (props) => {
    const content = props.content
    const color = props.color
    const fontSize = props.fontSize
    const weight = props.weight
    const margin = props.margin

    const StyledH3 = styled.h3`
        font-size: ${fontSize ? fontSize : font.size.h3};
        color: ${color ? color : colors.primary};
        weight: ${weight ? weight : font.weight.medium};
        margin: ${margin};
    `

    return (
        <StyledH3>{content}</StyledH3>
    )
}

H3.propTypes = {
    content: PropTypes.string.isRequired,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    weight: PropTypes.string,
    margin: PropTypes.string,
}

export default H3;