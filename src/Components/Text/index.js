import React from 'react';
import font from '../../Config/theme/fonts.js'
import colors from '../../Config/theme/colors.js'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import Styles from '../../Config/theme/styles.js';

const StyledText = styled.p`
    font-size: ${font.size.paragraph};
    color: ${colors.primary};
    font-weight: ${font.weight.regular};
    text-align: ${Styles.textAlign.left};
    margin: ${Styles.margin.auto};
    width: ${Styles.width.auto}
`

const Text = (props) => {
    const content = props.content
    const fontSize = props.fontSize
    const weight = props.weight
    const color = props.color
    const textAlign = props.textAlign
    const margin = props.margin
    const width = props.width


    return (
        <StyledText sx = {{ fontSize : `${fontSize}`, weight : `${weight}`, color : `${color}`, textAlign : `${textAlign}`, margin : `${margin}`, width : `${width}`}} >{content}</StyledText>
    )
}

Text.propTypes = {
    content: PropTypes.string.isRequired,
    fontSize: PropTypes.string,
    weight: PropTypes.string,
    color: PropTypes.string,
    textAlign: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    width: PropTypes.string
}

export default Text;