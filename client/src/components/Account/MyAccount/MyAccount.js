/** @format */
import { useState } from 'react';

import Account from '../Account';
import './MyAccount.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MyAccount = () => {
  const navigate = useNavigate();
  const initData = { name: '', email: '' };
  const [user, setUser] = useState(initData);

  async function userInfo() {
    try {
      const res = await fetch('/api/v1/user', {
        method: 'GET',
        headers: { accept: 'application/jsson', 'content-type': 'application/json' },
        credentials: 'include',
      });

      const resData = await res.json();
      console.log(resData);

      if (resData.error && resData.error.statusCode === 401) {
        navigate('/account/login');
        window.alert(resData.message);
      }

      setUser(resData.data);

      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    userInfo();
  }, []);

  function handleLogout(e) {
    e.preventDefault();
    console.log('Logout button clicked');
  }

  return (
    <Account>
      <div className="order__history__container">
        <div className="order__history">
          <div className="order__history__header">Order History</div>
          <div className="order__history__detail">You have not place any orders yet</div>
        </div>
      </div>
      <div className="account__details__container">
        <div className="account__details__header">
          <div className="details__header">Account Details</div>
          <div className="logout__action">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <br />
        <div className="account__details">
          <div className="account__holder__name">Account holder name</div>
          <p>{user.name}</p>
          <div className="account__holder__email">Account holder email</div>
          <p>{user.email}</p>
          <div className="manage__account__action">
            <button>
              <Link to="/account/manage">Manage account</Link>
            </button>
          </div>
        </div>
      </div>
    </Account>
  );
};

export default MyAccount;
