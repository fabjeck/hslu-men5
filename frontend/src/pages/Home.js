import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.scss';

import Grid from '../components/Grid';
import ImagePreview from '../components/ImagePreview';



export default function Home() {

  const [data, setData] = useState();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function fetchData() {
      try {
        const { data } = await axios.get(
          'http://localhost:8080/posts',
          { cancelToken: source.token }
        );
        setData(data.posts.map((item) =>
          <ImagePreview key={item.postID} item={item} />));
      } catch (error) {
        return error;
      }
    }
    fetchData();

    // Cancel HTTP Request on React lifecycle method "componentWillUnmount"
    return () => source.cancel();
  }, []);

  return (
    <div className="home__wrapper">
      <Grid>
        {data}
      </Grid>
    </div>
  )
}