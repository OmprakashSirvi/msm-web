/** @format */

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import './CartCard.css';
import { CartItemsContext } from '../../../../Context/CartItemsContext';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReactLoading from 'react-loading';

import axios from 'axios';
import { Button } from 'bootstrap';

const CartCard = (props) => {
  const URL = process.env.REACT_APP_API_URL;

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [size, setSize] = useState(props.item.refToItem.size[0]);

  const handelQuantityIncrement = (event) => {
    event.preventDefault();
    setQuantity(quantity + 1);

    props.setAmount(props.amount + props.item.refToItem.price);
    // cartItems.quantity(props.item.id, 'INC');
  };

  const handelQuantityDecrement = (event) => {
    event.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
      props.setAmount(props.amount - props.item.refToItem.price);
      // cartItems.quantity(props.item.id, 'DEC');
    } else {
      window.alert('This will delete the item.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/v1/user/cart/${props.item._id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });

    if (res.status === 201) console.log('Cart quantity updated');

    props.setAmount(props.amount);

    window.alert('Cart item is updated');
    setLoading(false);
  };

  const handelRemoveItem = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/v1/user/cart/${props.item._id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' },
      });
      if (res.status === 204) console.log('Deleted successfully');
      props.setAmount(props.amount - quantity * props.item.refToItem.price);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }

    // cartItems.removeItem(props.item);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  if (loading)
    return (
      <ReactLoading
        type="balls"
        color="#FFE26E"
        height={100}
        width={100}
        className="container h-100 w-10 justify-self-center align-self-center m-auto"
      />
    );

  return (
    <div className="cart__item__card">
      <div className="cart__item__detail">
        <div className="cart__item__image">
          <img src={`${URL}/images/${props.item.refToItem.images[0].filename}`} alt="item" className="item__image" />
        </div>
        <div className="cart__item__name">{props.item.refToItem.name}</div>
      </div>

      <div className="cart__item__quantity">
        <IconButton onClick={handelQuantityIncrement}>
          <AddCircleIcon />
        </IconButton>
        <div type="text" name="quantity" className="quantity__input">
          {quantity}
        </div>
        <IconButton onClick={handelQuantityDecrement}>
          <RemoveCircleIcon fontSize="medium" />
        </IconButton>
      </div>
      <div className="product size">
        <Box sx={{ minWidth: 80 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Size</InputLabel>
            <Select value={size} label="size" onChange={handleSizeChange}>
              {props.item.refToItem.size.map((size) => (
                <MenuItem value={size}>{size}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="cart__item__price">₹{props.item.refToItem.price}</div>
      <div>
        <IconButton onClick={handleUpdate}>
          <UpgradeIcon></UpgradeIcon>
        </IconButton>
      </div>
      <div className="remove__item__icon">
        <IconButton onClick={handelRemoveItem}>
          <HighlightOffIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CartCard;
