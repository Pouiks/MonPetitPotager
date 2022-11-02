import React from 'react';
import colors from '../../Config/theme/colors';
import styles from '../../Config/theme/styles';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const StyledButton = styled.button`
width: ${styles.width.fitcontent};
background-color: ${colors.secondary};
border-radius: ${styles.radius.lg};
text-transform: ${styles.textTransform.uppercase};
text-align: ${styles.textAlign.center};
padding: ${styles.padding.sm} ${styles.padding.lg};
border: ${styles.border.none};
cursor: pointer;
display: block;
margin: ${styles.margin.md} ${styles.margin.auto};

&:hover {
    color: ${colors.neutral};
    background-color: ${colors.tertiary};
}
`
const StyledLink = styled(Link)`
text-decoration: ${styles.textDecoration.none}
`

const Button = (props) => {
    const content = props.content;
	const link = props.link;
    const onClick = props.onClick;

    return(
        <StyledLink to={link}>
            <StyledButton
                onClick={onClick}>
                {content}
            </StyledButton>
        </StyledLink>
    );
}

Button.propTypes = {
content: PropTypes.string.isRequired,
link: PropTypes.string,
onClick: PropTypes.func
}

export default Button
