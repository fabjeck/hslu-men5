import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './ImageDetail.scss';

export default function ImageDetail() {

  const [data, setData] = useState();
  const history = useHistory();
  const { image } = useParams();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/posts/${image}`,
          { cancelToken: source.token }
        );
        setData(data.post[0]);
      } catch (error) {
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
    <article className="image-detail__wrapper modal__box">
      <div className="detail__container">
        <div className="profil__wrapper image__frame">
          <Link className="image__link" to={`/${data && data.publisher.username}`} />
          {data?.publisher?.profile && <img
            srcSet={`${data.publisher.profile[50]} 50w, ${data.publisher.profile[100]} 100w`}
            src={data.publisher.profile[50]}
            alt={data.publisher.username} />}
        </div>
        <div className="text__wrapper">
          <h3>{data && data.title}</h3>
          <span>by </span>
          <Link className="autor__link" to={`/${data && data.publisher.username}`}>{data && data.publisher.username}</Link>
        </div>
      </div>
      <div className="image__wrapper image__frame">
      {data && <img
            srcSet={`${data.image[300]} 300w, ${data.image[500]} 500w, ${data.image[800]} 800w`}
            src={data.image[500]}
            alt={data.title} />}
      </div>
    </article>
  )
}