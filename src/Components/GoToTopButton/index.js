import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import pxToRem from '../../Services/pxToRem';
import colors from '../../Config/theme/colors';
import styles from '../../Config/theme/styles';

const TopButton = styled.button`
  width: ${pxToRem(45)};
  height: ${pxToRem(45)};
  position: fixed;
  bottom: ${pxToRem(20)};
  right: ${pxToRem(20)};
  font-size: ${pxToRem(35.2)};
  background: ${colors.secondary};
  color: ${colors.primary};
  cursor: pointer;
  border-radius: ${styles.radius.circ};
  border: ${styles.border.sm};
  box-shadow: ${styles.boxShadow.xl};

  &:hover {
    color: ${colors.neutral};
    background: ${colors.tertiary};
  }
`;


const GoTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 80) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

      return (
        <>
            {showButton && (
                <TopButton onClick={scrollToTop} className="back-to-top">
                	<KeyboardDoubleArrowUpIcon />
                </TopButton>
            )}
        </>
      )

}
export default GoTopButton;