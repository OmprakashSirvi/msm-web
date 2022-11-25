import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Account from '../Account';
import './ManageAccount.css';

const ManageAccount = () => {
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

      if (resData.error && resData.error.statusCode === 401) {
        navigate('/account/login');
        window.alert(resData.message);
      }

      setUser(resData.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    userInfo();
  }, []);

  return (
    <Account>
      <div className="manage__account__container">
        <div className="edit__account__container">
          <div className="edit__account">
            <div className="edit__account__header">Edit account</div>
            <div className="edit__account__form__container">
              <div className="edit__account__form">
                <div className="fname__input__container edit__input__container">
                  <label className="fname__label input__label">Name</label>
                  <input type="text" className="fname__input edit__account__input" />
                </div>
                <div className="lname__input__container edit__input__container">
                  <label className="lname__label input__label">Email</label>
                  <input type="email" className="lname__input edit__account__input" />
                </div>
                <div className="save__changes__button__container">
                  {/**
                   * // TODO update user here */}
                  <button className="save__changes__button">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="separator__line"></div>
        <div className="delete_account__container">
          <div className="delete__account">
            <div className="delete__account__header">Delete account</div>
            <div className="delete__account__prompt">Do you want to cancel subscription?</div>
            <div className="delete__account__button__container">
              {/**
               * // TODO deactivate user here */}
              <button className="delete__account__button">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </Account>
  );
};

export default ManageAccount;
