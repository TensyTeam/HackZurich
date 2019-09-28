import { Button as MaterialButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Margin = styled.span`
  margin-right: 0.8em;
`;

const StyledButton = styled(MaterialButton)`
  border-color: azure !important;
  border-width: 2px !important;
  font-weight: bold !important;
  color: azure !important;
`;

const Button = ({ label, icon, handleClick, disabled = false, left = false }) => {
  return (
    <StyledButton size="large" variant="outlined" color="default" onClick={handleClick} disabled={disabled}>
      {left && icon && (
        <React.Fragment>
          {icon}
          <Margin />
        </React.Fragment>
      )}
      {label}
      {!left && icon && (
        <React.Fragment>
          <Margin />
          {icon}
        </React.Fragment>
      )}
    </StyledButton>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  left: PropTypes.bool,
};

export default Button;
