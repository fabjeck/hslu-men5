import React from 'react';
import './Modal.scss';

export default class Modal extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const isBackground = event.target.classList.contains('modal__overlay');
    const history = this.props.children.props.history;
    isBackground ? history.goBack() : event.preventDefault();
  }

  componentDidMount() {
    document.body.classList.add('no-scroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('no-scroll');
  }

  render() {
    return (
      <div className="modal__overlay" onClick={this.handleClick}>
        {this.props.children}
      </div>
    )
  }
}