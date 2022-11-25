/** @format */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './LoginCard.css';

const LoginCard = () => {
  const navigate = useNavigate();
  const initialValues = { email: '', password: '' };

  const [formValue, setFormValue] = useState(initialValues);
  const [formError, setFormError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(formValue);

    try {
      const res = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formValue),
      });
      const resData = res.json();
      if (res.status === 400 || !resData) console.log('Username or password incorrect');

      if (res.status === 200) {
        console.log('Login successful');
        navigate('/');
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  }

  function validate(val) {
    let error = { email: '', password: '' };
    if (!val.email) error.email = 'Provide valid email address';

    if (!val.password) error.password = 'Provide valid password';

    return error;
  }

  return (
    <div className="login__card__container">
      <div className="login__card">
        <div className="login__header">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login__inputs">
            <div className="email__input__container input__container">
              <label className="email__label input__label">Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                className="email__input login__input"
                placeholder="example@gmail.com"
              />
            </div>

            <div className="password__input__container input__container">
              <label className="password__label input__label">Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                className="password__input login__input"
                placeholder="**********"
              />
            </div>
            <div className="login__button__container">
              <button type="submit" className="login__button">
                LOGIN
              </button>
            </div>
          </div>
        </form>
        <div className="login__other__actions">
          <div className="login__forgot__password">Forgot password?</div>
          <div className="login__new__account">
            Don't have account? <Link to="/account/register">Create account</Link>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
