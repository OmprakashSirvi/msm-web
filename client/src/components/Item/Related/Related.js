import { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedCard from '../../Card/RelatedCard/RelatedCard';
import './Related.css';

const Related = (props) => {
  const [sareeItems, setSareeItems] = useState();
  const [kurtiItems, setKurtiItems] = useState();
  const [lehngaItems, setLehngaItems] = useState();

  const fetchUrl = `${process.env.REACT_APP_API_URL}/api/v1/items`;

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((res) => {
        setSareeItems(res.data.data.filter((item) => item.category === 'saree'));
        setKurtiItems(res.data.data.filter((item) => item.category === 'kurti'));
        setLehngaItems(res.data.data.filter((item) => item.category === 'lehnga'));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="related__products">
      <div className="related__header__container">
        <div className="related__header">
          <h2>Recommended Products</h2>
        </div>
        <div className="related__header__line"></div>
      </div>
      <div className="related__card__container">
        <div className="related__product__card">
          {sareeItems &&
            props.category === 'saree' &&
            sareeItems.map((item) => <RelatedCard item={item} />)}
          {kurtiItems &&
            props.category === 'kurti' &&
            kurtiItems.map((item) => <RelatedCard item={item} />)}
          {lehngaItems &&
            props.category === 'lehnga' &&
            lehngaItems.map((item) => <RelatedCard item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Related;
