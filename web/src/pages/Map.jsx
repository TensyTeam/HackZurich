import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button/Button';
import EmojiList from '../components/EmojiList/EmojiList';
import GridLayout from '../components/GridLayout/GridLayout';
import Map from '../components/Map/Map';
import SelectedTime from '../components/SelectedTime/SelectedTime';
import { routes } from '../constants';
import { addData } from '../store/data/actions';

const StyledSelectedTime = styled(SelectedTime)`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;

const StyledProgress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  margin: 0 auto;
  width: 100%;
  z-index: 100;
  color: #ff5f6d !important;
`;

const MapPage = () => {
  const { push } = useHistory();
  const [isLoading, setLoading] = useState(true);
  const handleClickBack = () => push(routes.main);
  const dispatch = useDispatch();
  const shuffle = useCallback(() => {
    setLoading(true);
    dispatch(addData());
  }, [dispatch]);

  return (
    <GridLayout
      header={
        <Container>
          <StyledSelectedTime />
          <EmojiList />
        </Container>
      }
      body={
        <React.Fragment>
          {isLoading && <StyledProgress color="primary" size="6em" />}
          <Map handleLoading={setLoading} />
        </React.Fragment>
      }
      footer={[
        <Button key="back" label="Back" icon="👈" handleClick={handleClickBack} left />,
        <Button key="shuffle" label="Shuffle" icon="🎲" handleClick={shuffle} />,
      ]}
    />
  );
};

export default MapPage;
