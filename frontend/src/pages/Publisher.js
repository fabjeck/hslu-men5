import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Publisher.scss';
import { IoMdMail } from "react-icons/io";

import Grid from '../components/Grid';
import ImagePreview from '../components/ImagePreview';

export default function Publisher() {

  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const history = useHistory();
  const { username } = useParams();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/users/${username}`,
          { cancelToken: source.token }
        );
        const { posts, ...rest } = data.user;
        setUser({ ...rest });
        setPosts(posts.map((post) => <ImagePreview key={post.postID} item={post} />));
      } catch (error) {
        console.log(error.response);
        if (error.response?.status === 404) {
          history.push('/');
        }
        return error;
      }
    }
    fetchData();

    // Cancel HTTP Request on React lifecycle method "componentWillUnmount"
    return () => source.cancel();
  }, []);


  return (
    <div className="publisher__container">
      <div className="publisher__box">
        <div className="profil-image__wrapper image__frame">
          <img src={user && user.profile?.[100]} alt={user && user.username} />
        </div>
        <div className="info__container">
          <h1>{user && user.username}</h1>
          <a className="button button__passive button__contact" href={`mailto:${user && user.mail}`}>
            <span><IoMdMail /></span>Contact
          </a>
        </div>
      </div>
      <h2>This artists' work</h2>
      <Grid>
        {posts}
      </Grid>
    </div>
  )
}