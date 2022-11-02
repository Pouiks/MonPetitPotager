import React from 'react';
import Theme from '../Config/theme/styles'
import SignIn from '../Components/SignIn';

import styled from 'styled-components'

const StyledContainer = styled.div`
    display: flex;
    height: auto
    margin: ${Theme.margin.xxl} auto;

`

const SignInPage = () => {
    return (
        <StyledContainer>
            <SignIn />
        </StyledContainer>
    )
}

export default SignInPage;