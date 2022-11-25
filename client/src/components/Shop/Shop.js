/** @format */

import { useEffect, useState } from 'react';
import { TabTitle } from '../../utils/General';
import axios from 'axios';
import ShopCategory from './Container/ShopCategory';
import './Shop.css';
import ReactLoading from 'react-loading';

const Shop = () => {
  TabTitle('Shop - msm-web');

  const [sareeItems, setSareeItems] = useState();
  const [kurtiItems, setKurtiItems] = useState();
  const [lehngaItems, setLehngaItems] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/v1/items')
      .then((res) => {
        setSareeItems(res.data.data.filter((item) => item.category === 'saree'));
        setLehngaItems(res.data.data.filter((item) => item.category === 'lehnga'));
        setKurtiItems(res.data.data.filter((item) => item.category === 'kurti'));
        setLoading(false);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shop__contianer">
      {loading && (
        <ReactLoading
          type="balls"
          color="#FFE26E"
          height={100}
          width={100}
          className="container h-100 w-10 justify-self-center align-self-center m-auto"
        />
      )}

      {sareeItems && <ShopCategory name="Saree" key="saree" items={sareeItems} />}
      {kurtiItems && <ShopCategory name="Kurti" key="kurti" items={kurtiItems} />}
      {lehngaItems && <ShopCategory name="Lehnga" key="lehnga" items={lehngaItems} />}
    </div>
  );
};

export default Shop;
