import React from 'react';
import SignUp from '../Components/SignUp';


import styled from 'styled-components'

const StyledContainer = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

`

const SignUpPage = () => {
    return (
        <StyledContainer>
            {/* <Navbar/> */}
            <SignUp />
        </StyledContainer>
    )
}

export default SignUpPage;