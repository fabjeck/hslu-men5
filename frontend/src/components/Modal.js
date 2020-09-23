import React from 'react';
import './Modal.scss';
import { IoIosClose } from "react-icons/io";

export default class Modal extends React.Component {
  constructor() {
    super();
    this.evaluateTarget = this.evaluateTarget.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  evaluateTarget(event) {
    const isBackground = event.target.classList.contains('modal__overlay');
    isBackground ? this.closeModal() : event.preventDefault();
  }

  closeModal() {
    const history = this.props.children.props.history;
    history.goBack();
  }

  componentDidMount() {
    document.body.classList.add('no-scroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('no-scroll');
  }

  render() {
    return (
      <div className="modal__overlay" onClick={this.evaluateTarget}>
        <span className="modal__close" onClick={this.closeModal}>
          <IoIosClose />
        </span>
        <div className="modal__box">
          {this.props.children}
        </div>
      </div>
    )
  }
}