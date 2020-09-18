import React from 'react';
import './Searchbar.scss';

export default class Searchbar extends React.Component {
  render() {
    return (
      <div className="searchbar__container">
        <input className="searchbar" type="text" placeholder="Search by label..." />
        <ul className="search-results__box">
          <li>Label</li>
          <li>Label</li>
          <li>Label</li>
        </ul>
      </div>
    )
  }
}