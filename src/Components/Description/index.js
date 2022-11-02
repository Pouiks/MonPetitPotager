import React from 'react';
import font from '../../Config/theme/fonts.js'
import colors from '../../Config/theme/colors.js'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const StyledDescription = styled.p`
    font-size: ${font.size.description};
    color: ${colors.primary};
    weight: ${font.weight.regular};
`

const Description = (props) => {
    const content = props.content

    return (
        <StyledDescription>{content}</StyledDescription>
    )
}

Description.propTypes = {
    content: PropTypes.string.isRequired
    }

export default Description;