/** @format */

import './ItemCard.css';
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItemsContext } from '../../../Context/CartItemsContext';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { WishItemsContext } from '../../../Context/WishItemsContext';

import { isLoggedIn } from '../../../utils/auth';

const ItemCard = (props) => {
  // console.log('ItemCard is initialized');
  // console.log(props);

  const [login, setLogin] = useState(false);

  async function checkLogin() {
    const bool = await isLoggedIn();

    if (!bool) {
      setLogin(false);
      return;
    }

    setLogin(true);
  }

  useEffect(() => {
    checkLogin();
  });

  const navigate = useNavigate();

  const URL = process.env.REACT_APP_API_URL;

  const [isHovered, setIsHovered] = useState(false);
  const cartItemsContext = useContext(CartItemsContext);
  const wishItemsContext = useContext(WishItemsContext);

  const handleAddToWishList = () => {
    console.log('Add to wishlist called');
    wishItemsContext.addItem(props.item);
  };

  const handleAddToCart = async () => {
    if (!login) {
      window.alert('You are not logged in!!');
      navigate('/account/login');
      return;
    }
    const res = await fetch('/api/v1/user/cart/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ item_id: props.item._id }),
    });

    if (res.error) {
      if (res.error.statusCode === 401) {
        alert('User not logged in');
        navigate('/account/login');
        return;
      }
    }

    alert('cart item added successfully');

    cartItemsContext.addItem(props.item, 1);
  };

  // console.log(props.item.images[0]);

  return (
    <div className="product__card__card">
      <div className="product__card">
        <div
          className="product__image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            // Change the image of the product when hovered
            <img src={`${URL}/images/${props.item.images[0].filename}`} alt="itemimage2" className="product__img" />
          ) : (
            <img src={`${URL}/images/${props.item.images[0].filename}`} alt="itemimage1" className="product__img" />
          )}
        </div>
        <div className="product__card__detail">
          <div className="product__name">
            <Link to={`/item/${props.item.category}/${props.item._id}`}>{props.item.name}</Link>
          </div>
          <div className="product__description">
            <span>{props.item.description}</span>
          </div>
          <div className="product__price">
            <span>${props.item.price}</span>
          </div>
          <div className="product__card__action">
            <IconButton
              onClick={handleAddToWishList}
              sx={{
                borderRadius: '20px',
                width: '40px',
                height: '40px' /* borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */,
              }}
            >
              <FavoriteBorderIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
            </IconButton>
            <IconButton
              onClick={handleAddToCart}
              sx={{
                borderRadius: '20px',
                width: '40px',
                height: '40px' /*  borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */,
              }}
            >
              <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
