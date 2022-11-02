import React from 'react';
import colors from '../../Config/theme/colors';
import styles from '../../Config/theme/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import pxToRem from '../../Services/pxToRem';

const StyledButton = styled.button`
    width: ${pxToRem(35)};
    height: ${pxToRem(35)};
    background-color: white; 
    background-image:url("../images/delete.png");
    background-repeat:no-repeat;
    background-position:center;
    background-size: 80%;
    border-radius: ${styles.radius.circ};
    border: ${styles.border.none};
    cursor: pointer;
    display: block;
    font-size: 0;

    &:hover {
        //color: ${colors.neutral};
        background-color: bisque;
}
`

const DeleteButton = (props) => {
    const content = props.content;
    const onClick = props.onClick;
    const alt = props.alt;
    const title = props.title;

    return(
            <StyledButton
                alt={alt}
                title={title}
                onClick={onClick}>
                {content}
            </StyledButton>
    );
}

DeleteButton.propTypes = {
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    alt: PropTypes.string, 
    title: PropTypes.string
}

export default DeleteButton
