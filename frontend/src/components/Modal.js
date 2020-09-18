import React from 'react';
import './Modal.scss';

export default class Modal extends React.Component {
  componentDidMount() {
    document.body.classList.add('no-scroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('no-scroll');
  }

  render() {
    return (
      <div className="modal__overlay">
        {this.props.component}
      </div>
    )
  }
}