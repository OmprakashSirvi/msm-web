/** @format */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Category from '../components/Category/Category';

const CategoryView = () => {
  const param = useParams();
  const [sareeItems, setSareeItems] = useState();
  const [lehngaItems, setLehngaItems] = useState();
  const [kurtiItems, setKutiItems] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/v1/items')
      .then((res) => {
        setSareeItems(res.data.data.filter((item) => item.category === 'saree'));
        setLehngaItems(res.data.data.filter((item) => item.category === 'lehnga'));
        setKutiItems(res.data.data.filter((item) => item.category === 'kurti'));
        setLoading(false);
      })
      .catch((err) => console.log(err));

    window.scrollTo(0, 0);
  }, [param.id]);

  return (
    <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
      {loading && (
        <ReactLoading type="balls" color="#FFE26E" height={100} width={100} className="m-auto" />
      )}
      {sareeItems && param.id === 'Saree' && (
        <Category name="Saree" items={sareeItems} category="saree" />
      )}
      {lehngaItems && param.id === 'Lenga' && (
        <Category name="Lehnga" items={lehngaItems} category="lehnga" />
      )}
      {kurtiItems && param.id === 'kurti' && (
        <Category name="Kurti" items={kurtiItems} category="kurti" />
      )}
    </div>
  );
};

export default CategoryView;
