import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`;

const HEADER_HEIGHT = 15;
const FOOTER_HEIGHT = 15;
const BODY_HEIGHT = 100 - HEADER_HEIGHT - FOOTER_HEIGHT;

const StyledGridSegment = styled(Grid)`
  height: ${({ height }) => height}%;
  width: 100%;
`;

const StyledBodySegment = styled(StyledGridSegment)`
  padding: 1em 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const BodyContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const GridLayout = ({ header, body, footer }) => {
  useLayoutEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);
  return (
    <StyledGrid container direction="column" justify="center" alignItems="center">
      <StyledGridSegment item height={HEADER_HEIGHT}>
        <HeaderContainer>{header}</HeaderContainer>
      </StyledGridSegment>
      <StyledBodySegment item height={BODY_HEIGHT}>
        <BodyContainer>{body}</BodyContainer>
      </StyledBodySegment>
      <StyledGridSegment item height={FOOTER_HEIGHT}>
        <FooterContainer>{footer}</FooterContainer>
      </StyledGridSegment>
    </StyledGrid>
  );
};

GridLayout.propTypes = {
  header: PropTypes.element.isRequired,
  body: PropTypes.element.isRequired,
  footer: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default GridLayout;
