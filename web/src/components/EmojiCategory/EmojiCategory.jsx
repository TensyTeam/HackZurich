import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isSelectedSelector } from '../../store/selectors/isSelectedSelector';

const DEFAULT_BRIGHTNESS = 0.8;
const SELECTED_BRIGHTNESS = 1.1;

const Item = styled.span`
  font-size: 4em;
  transition: all 300ms;
  filter: brightness(${({ isSelected }) => (isSelected ? SELECTED_BRIGHTNESS : DEFAULT_BRIGHTNESS)});
  cursor: pointer;
`;

const EmojiCategory = ({ symbol, handleClick }) => {
  const isSelected = useSelector(isSelectedSelector(symbol));
  return (
    <Item onClick={handleClick} isSelected={isSelected}>
      {symbol}
    </Item>
  );
};

EmojiCategory.propTypes = {
  symbol: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default EmojiCategory;
