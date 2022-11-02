import React from 'react';
import font from '../../Config/theme/fonts.js'
import colors from '../../Config/theme/colors.js'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const H1 = (props) => {
    const content = props.content
    const fontSize = props.fontSize
    const color = props.color

    const StyledH1 = styled.h1`
    font-size: ${fontSize ? fontSize : font.size.h1};
    color: ${color ? color : colors.primary};
    font-weight: ${font.weight.bold};
`

    return (
        <StyledH1>{content}</StyledH1>
    )
}

H1.propTypes = {
    content: PropTypes.string.isRequired,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    weight: PropTypes.string,
    margin: PropTypes.string,
}

export default H1;