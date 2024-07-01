import { useEffect, useState } from 'react';
import { Switch, useLocation } from 'react-router';
import ModalView from './ModalView';
import PropTypes from 'prop-types';
import ModalContext from '@mxjs/router/ModalContext';
import { history } from '@mxjs/app';

export { ModalContext };

const ModalSwitch = ({ children }) => {
  const location = useLocation();
  const [length, setLength] = useState(1);
  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    const handleUpdate = (nextLocation) => {
      if (history.action !== 'POP' && (!nextLocation.state || !nextLocation.state.modal)) {
        setPreviousLocation(location);
      }

      const modal = location.state && location.state.modal;
      const nextModal = nextLocation.state && nextLocation.state.modal;

      if (modal && nextModal) {
        if (history.action === 'PUSH') {
          // modal 中下一页
          setLength(length + 1);
        } else if (history.action === 'POP') {
          // modal 中上一页
          setLength(length - 1);
        }
      }

      if (!nextModal) {
        setLength(1);
      }
    };

    history.listen(handleUpdate);

    return () => {
      history.listen(handleUpdate);
    };
  }, [location, history, length]);

  const isModal = () => {
    return location.state && location.state.modal && previousLocation !== location;
  };

  return (
    <ModalContext.Provider value={{ isModal: isModal() }}>
      <Switch location={isModal() ? previousLocation : location}>
        {children}
      </Switch>
      {isModal() && (
        <ModalView length={length}>
          <Switch>{children}</Switch>
        </ModalView>
      )}
    </ModalContext.Provider>
  );
};

ModalSwitch.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.node,
};

export default ModalSwitch;
