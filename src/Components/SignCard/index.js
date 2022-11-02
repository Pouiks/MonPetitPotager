import React from 'react';
import {Card} from '@mui/material';
import pxToRem from '../../Services/pxToRem'
import PropTypes from 'prop-types';

const SignCard = (props) => {
  const width = pxToRem(1200)
  const height = pxToRem(500)

    return(
      <Card sx={{ width: {width}, display: 'flex', height: {height}, margin: `${pxToRem(40)} auto`}}>
          {props.children}
      </Card>
    )
}

SignCard.propTypes = {
  children: PropTypes.array.isRequired
}

export default SignCard;