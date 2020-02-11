import React from "react";
import {withRouter} from "react-router";

@withRouter
export default class ModalEvent extends React.Component {
  static defaultProps = {
    onEnter: null,
    onExit: null,
  };

  isModal;

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      const isModal = location.state && location.state.modal;

      if (this.isModal && !isModal) {
        this.handleEvent('onExit', location, action);
      }

      if (!this.isModal && isModal) {
        this.handleEvent('onEnter', location, action);
      }

      this.isModal = isModal;
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleEvent(event, location, action) {
    if (this.props[event]) {
      this.props[event](location, action);
    }
  }

  render() {
    return this.props.children || '';
  }
}
