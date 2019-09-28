import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';

import { routes } from '../../constants';
import Main from '../../pages/Main';
import MapPage from '../../pages/Map';
import Time from '../../pages/Time';
import { emojiSelector } from '../../store/selectors/emoji';

function Routing() {
  const location = useLocation();
  const hasEmojiInput = !!useSelector(emojiSelector);
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, marginLeft: '-100%' },
    enter: { opacity: 1, marginLeft: '0%' },
    leave: { opacity: 0, marginLeft: '100%' },
  });
  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={item}>
        <Switch>
          <Route path={routes.time}>{hasEmojiInput ? <Time /> : <Redirect to={routes.main} />}</Route>
          <Route path={routes.map}>{hasEmojiInput ? <MapPage /> : <Redirect to={routes.main} />}</Route>
          <Route path={routes.main}>
            <Main />
          </Route>
        </Switch>
      </Switch>
    </animated.div>
  ));
  // return (

  // );
}

export default Routing;
