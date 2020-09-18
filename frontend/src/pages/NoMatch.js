import React from 'react';
import './NoMatch.scss';

export default class NoMatch extends React.Component {
  render() {
    return (
      <div className="no-match__wrapper flex-stretch">
        <p><strong>Error 404</strong> Page not found</p>
      </div>
    )
  }
}