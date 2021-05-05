import React from 'react';
import {Switch, withRouter} from 'react-router';
import ModalView from './ModalView';
import PropTypes from 'prop-types';

export const ModalContext = React.createContext({});

/**
 * @link https://reacttraining.com/react-router/web/example/modal-gallery
 */
export default @withRouter
class ModalSwitch extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    children: PropTypes.node,
  };

  length = 1;
  previousLocation = this.props.location;

  UNSAFE_componentWillUpdate(nextProps) {
    let {location} = this.props;

    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }

    const modal = location.state && location.state.modal;
    const nextModal = nextProps.location.state && nextProps.location.state.modal;
    if (modal && nextModal) {
      if (nextProps.history.action === 'PUSH') {
        // modal 中下一页
        this.length++;
      } else if (nextProps.history.action === 'POP') {
        // modal 中上一页
        this.length--;
      }
    }

    if (!nextModal) {
      // 退出 modal
      this.length = 1;
    }
  }

  isModal() {
    let {location} = this.props;
    return location.state &&
      location.state.modal &&
      this.previousLocation !== location; // not initial render
  }

  render() {
    const isModal = this.isModal();

    return (
      <ModalContext.Provider value={{isModal: isModal}}>
        <Switch location={isModal ? this.previousLocation : this.props.location}>
          {this.props.children}
        </Switch>
        {isModal && <ModalView length={this.length}>
          <Switch>
            {this.props.children}
          </Switch>
        </ModalView>}
      </ModalContext.Provider>
    );
  }
}
