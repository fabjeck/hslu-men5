import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NormalscreenRoutes from './NormalscreenRoutes';

import userContext from '../helpers/userContext';

export default function Skeleton() {
  const { user, logout } = useContext(userContext);
  const isLoggedIn = Object.keys(user).length !== 0;

  async function deleteAccount() {
    try {
      await axios.delete(
        'http://localhost:8080/user',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          }
        }
      );
      logout();
    } catch (error) {
      return error;
    }
  }

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
              <span className="profil">
                <li>
                  <div className="profil__image image__frame">
                    {user.image && <img src={user.image[50]} alt={user.username} />}
                  </div>
                </li>
                <div className="profil__dropdown">
                  <p>{user.username}</p>
                  <hr />
                  <ul>
                    <li>
                      <Link to={`/edit/${user.username}`}>Edit Profile</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={logout}>Logout</Link>
                    </li>
                    <li className="delete__anchor">
                      <Link to="/" onClick={deleteAccount}>Delete Account</Link>
                    </li>
                  </ul>
                </div>
              </span>
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