/** @format */

import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Landing from '../components/Landing/Landing';
import FeaturedItems from '../components/Featured/Items/FetauredItems';
import FeaturedCategories from '../components/Featured/Categories/FeaturedCategories';
import { TabTitle } from '../utils/General';

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState({});
  TabTitle('Home - msm-web');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/api/v1/items');

        setFeaturedItems(res.data);

        //  whindow.scrollTo(0, 0);
      } catch (err) {
        console.log('There was some error in Home.jsx');
        console.log(err.message);
      }
    }
    fetchData();
    //   window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Landing />
      <FeaturedCategories />
      {/* {console.log('From home')}
         {console.log(featuredItems.data)} */}
      <FeaturedItems items={featuredItems.data} />
    </Fragment>
  );
};

export default Home;
