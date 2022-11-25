/** @format */

import { Fragment, useContext, useState, useEffect } from 'react';
import { CartItemsContext } from '../../../Context/CartItemsContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import CartCard from './CartCard/CartCard';
import './Cart.css';
import Button from '@mui/material/Button';
import axios from 'axios';

import { isLoggedIn } from '../../../utils/auth';
import { Link } from 'react-router-dom';
import { getListItemSecondaryActionClassesUtilityClass, ListItemSecondaryAction } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '350px',
  width: '45%',
  height: '400px',
  bgcolor: 'background.paper',
  border: '5px solid #FFE26E',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState();

  function setParentValue(value) {
    setAmount(value);
  }

  async function checkLogin() {
    const bool = await isLoggedIn();

    if (!bool) {
      setLogin(false);
      return;
    }

    setLogin(true);
  }

  async function getItems() {
    const res = await axios.get('/api/v1/user/cart', {
      withCredentials: true,
      headers: { 'Content-type': 'application/json' },
    });

    setItems([...res.data.data]);
    console.log(items.length);
  }

  async function calcAmount() {
    let Amount = 0,
      temp = 0;
    items.map((ele) => {
      temp = ele.refToItem.price * ele.quantity;
      Amount += temp;
    });

    setAmount(Amount);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCheckout = async () => {
    if (items.length <= 0) return;

    console.log('Checkout button is clicked and I have noticed it');
    console.log('This is not yet configured');
    console.log('Hold it !!');
  };

  useEffect(() => {
    console.log('Updating stuff');
    checkLogin();
    getItems();
    calcAmount();
  }, [amount, CartItemsContext]);

  if (!login) {
    return (
      <Fragment>
        <Badge badgeContent={' '} color="error">
          <ShoppingCartIcon color="black" onClick={handleOpen} sx={{ width: '35px' }} />
        </Badge>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            You need to be logged in to access it <br />
            <Link to="account/login">
              <Button onClick={handleClose}>Login</Button>
            </Link>
          </Box>
        </Modal>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Badge badgeContent={items.length} color="error">
        <ShoppingCartIcon color="black" onClick={handleOpen} sx={{ width: '35px' }} />
      </Badge>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="cart__header">
            <h2>Your Cart</h2>
          </div>
          <div className="cart__items__container">
            <div className="cartItems">
              {items.length === 0 ? (
                <div className="cart__empty"> Empty cart!</div>
              ) : (
                <div className="shop__cart__items">
                  {items.map((item) => (
                    <CartCard key={item._id} item={item} amount={amount} setAmount={setParentValue} />
                  ))}
                </div>
              )}
              {items.length > 0 && (
                <div className="options">
                  <div className="total__amount">
                    <div className="total__amount__label">Total Amount:</div>
                    <div className="total__amount__value">₹{amount}.00</div>
                  </div>
                  <div className="checkout">
                    <Button variant="outlined" onClick={handleCheckout}>
                      Checkout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
      {/* <Modal open={openCheckoutModal} onClose={handleCheckoutClose}>
        <Box sx={style}>
          <div className="d-flex w-100 h-100 justify-content-center align-items-center">
            <h2>Your checkout was successful</h2>
          </div>
        </Box>
      </Modal> */}
    </Fragment>
  );
};

export default Cart;
