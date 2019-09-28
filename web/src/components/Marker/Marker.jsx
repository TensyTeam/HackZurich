import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSpan = styled.span`
  font-size: 2.5em;
`;

const Marker = ({ symbol }) => {
  return (
    <StyledSpan role="img" aria-label="map marker">
      {symbol}
    </StyledSpan>
  );
};

Marker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default Marker;
