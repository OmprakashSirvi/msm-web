/** @format */

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './RegisterCard.css';

const RegisterCard = () => {
  const navigate = useNavigate();

  const initValues = { name: '', email: '', password: '', passwordConf: '' };

  const [formValue, setFormValue] = useState(initValues);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/user/signUp', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formValue),
      });

      const resData = res.json();

      if (res.status === 500 || !resData) console.log('Not logged in !! Details entered are wrong');

      if (res.status === 405 || !resData)
        console.log('Something went wrong while signing in the user');

      if (res.status === 200) {
        console.log('Login successful');
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  }

  return (
    <div className="register__card__container">
      <div className="register__card">
        <div className="register__header">
          <h1>Create Account</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="register__inputs">
            <div className="fname__input__container reg__input__container">
              <label className="fname__label input__label" name="name" onChange={handleChange}>
                Name
              </label>
              <input type="text" className="fname__input register__input" />
            </div>
            <div className="lname__input__container reg__input__container">
              <label className="email__label input__label" name="email" onChange={handleChange}>
                Email
              </label>
              <input
                type="email"
                className="email__input register__input"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="email__input__container reg__input__container">
              <label
                className="password__label input__label"
                name="password"
                onChange={handleChange}
              >
                Password
              </label>
              <input type="password" className="password__input register__input" />
            </div>
            <div className="password__input__container reg__input__container">
              <label
                className="password__label input__label"
                name="confirm_password"
                onChange={handleChange}
              >
                Confirm Password
              </label>
              <input type="password" className="password__input register__input" />
            </div>
            <div className="register__button__container">
              {/* TODO Connect with signUp route with API*/}
              <button className="register__button">Create Account</button>
            </div>
          </div>
        </form>
        <div className="register__other__actions">
          <div className="register__login__account">
            Already have account? <Link to="/account/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
