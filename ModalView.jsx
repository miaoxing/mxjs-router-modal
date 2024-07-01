import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModalView = ({ history, length = 1, children }) => {
  const [show, setShow] = useState(true);

  const handleHide = () => {
    setShow(false);
  };

  const handleExited = () => {
    history.go(-length);
  };

  return (
    <Modal
      show={show}
      onHide={handleHide}
      onExited={handleExited}
      className="modal-right"
    >
      <Modal.Body className="page-content">
        {children}
      </Modal.Body>
    </Modal>
  );
};

ModalView.propTypes = {
  history: PropTypes.object,
  length: PropTypes.number,
  children: PropTypes.node,
};

export default ModalView;