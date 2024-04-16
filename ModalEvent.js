import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { history } from '@mxjs/app';

const ModalEvent = ({ children, onEnter, onExit }) => {
  let isModal = false;

  useEffect(() => {
    const handleEvent = (location, action) => {
      const nextIsModal = location.state && location.state.modal;

      if (isModal && !nextIsModal) {
        callEvent(onExit, location, action);
      }

      if (!isModal && nextIsModal) {
        callEvent(onEnter, location, action);
      }

      isModal = nextIsModal;
    };

    const unlisten = history.listen((location, action) => {
      handleEvent(location, action);
    });

    return () => {
      unlisten();
    };
  }, [history, onEnter, onExit]);

  const callEvent = (event, location, action) => {
    if (event) {
      event(location, action);
    }
  };

  return children || '';
};

ModalEvent.defaultProps = {
  onEnter: null,
  onExit: null,
};

ModalEvent.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.node,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
};

export default ModalEvent;
