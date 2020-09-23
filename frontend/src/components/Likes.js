import React from 'react';
import './Likes.scss';
import { IoIosThumbsUp } from "react-icons/io";

export default function Likes() {
  return (
    <div className="likes__container">
      <span className="icon__wrapper">
        <IoIosThumbsUp />
      </span>
      <span>100</span>
    </div>
  )
}