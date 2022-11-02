import React from 'react';
import colors from '../../Config/theme/colors';
import styles from '../../Config/theme/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
width: ${styles.width.fitcontent};
background-color: #990F02;
border-radius: ${styles.radius.lg};
text-transform: ${styles.textTransform.uppercase};
text-align: ${styles.textAlign.center};
padding: ${styles.padding.sm} ${styles.padding.lg};
border: ${styles.border.none};
cursor: pointer;
display: block;
margin: ${styles.margin.md} 0;
color: ${colors.neutral};

&:hover {
    background-color: #5E1916;
}
`

const Button = (props) => {
    const content = props.content;
    const onClick = props.onClick;

    return(
            <StyledButton
                onClick={onClick}>
                {content}
            </StyledButton>
    );
}

Button.propTypes = {
content: PropTypes.string.isRequired,
onClick: PropTypes.func
}

export default Button
