import React from 'react';
import {Modal} from 'react-bootstrap';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';

export default @withRouter
class ModalView extends React.Component {
  static defaultProps = {
    length: 1,
  };

  static propTypes = {
    history: PropTypes.object,
    length: PropTypes.number,
    children: PropTypes.node,
  };

  state = {
    show: true,
  };

  handleHide = () => {
    this.setState({show: false});
  };

  handleExited = () => {
    this.props.history.go(-this.props.length);
  };

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleHide}
        onExited={this.handleExited}
        className="modal-right"
      >
        <Modal.Body className="page-content">
          {this.props.children}
        </Modal.Body>
      </Modal>
    );
  }
}
