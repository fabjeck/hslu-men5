import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Likes.scss';
import { IoIosThumbsUp } from "react-icons/io";

import userContext from '../helpers/userContext';

export default function Likes({ likes, postID }) {
  const { user } = useContext(userContext);
  const [isLiked, setIsLiked] = useState(user.token && likes.includes(user.userID));
  const [nLikes, setNLikes] = useState(likes.length);
  const history = useHistory();

  async function handleClick() {
    if (!user.token) {
      return history.push('/signin');
    }
    try {
      await axios.patch(
        `http://localhost:8080/posts/likes/${postID}`,
        JSON.stringify({ isLiked: !isLiked }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          }
        }
      );
      setIsLiked(!isLiked);
      if (!isLiked) {
        setNLikes(nLikes + 1);
      } else {
        setNLikes(nLikes - 1);
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div className={`likes__container ${isLiked && user.token ? 'liked' : ''}`}>
      <span onClick={handleClick} className={`icon__wrapper ${user.token ? 'logged' : ''}`}>
        <IoIosThumbsUp />
      </span>
      <span>{nLikes}</span>
    </div>
  )
}