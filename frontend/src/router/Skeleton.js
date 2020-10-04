import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import NormalscreenRoutes from './NormalscreenRoutes';

import userContext from '../helpers/userContext';

export default function Skeleton() {
  const { user, logout } = useContext(userContext);
  const isLoggedIn = Object.keys(user).length !== 0;

  return (
    <React.Fragment>
      <header>
        <div className="logo__wrapper">
          <Link className="logo" to="/">Gallery</Link>
        </div>
        <ul className="nav__container">
          {!isLoggedIn
            ?
            <React.Fragment>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup" className="button button__action">Sign up</Link>
              </li>
            </React.Fragment>
            :
            <React.Fragment>
              <li className="profil">
                <div className="profil__image image__frame">
                  <img src={user.image} alt={user.username}/>
                </div>
                <div className="profil__dropdown">
                  <p>{user.username}</p>
                  <hr/>
                  <ul>
                    <li>
                      <Link to={`/${user.username}`}>Edit</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={logout}>Logout</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link to="/edit" className="button button__action">Upload</Link>
              </li>
            </React.Fragment>
          }
        </ul>
      </header>
      <main>
        <NormalscreenRoutes />
      </main>
      <footer>
        <strong>Fabien Jeckelmann</strong> | BSc in Digital Ideation | Hochschule Luzern
      </footer>
    </React.Fragment>
  )
}