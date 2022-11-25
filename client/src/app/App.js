/** @format */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, Outlet } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../routes/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import ManageAccount from '../components/Account/ManageAccount/ManageAccount';
import MyAccount from '../components/Account/MyAccount/MyAccount';
import Shop from '../components/Shop/Shop';

import ItemView from '../routes/ItemView';
import CategoryView from '../routes/CategoryView';
import SearchView from '../routes/Search';

import CartItemsProvider from '../Context/CartItemsProvider';
import Wishlist from '../components/Wishlist';
import WishItemsProvider from '../Context/WishItemsProvider';
import SearchProvider from '../Context/SearchProvider';

import Login from '../components/Authentication/Login/Login';
import Register from '../components/Authentication/Register/Register';

import { isLoggedIn, isAdmin } from '../utils/auth';
import Cart from '../components/Card/Cart/Cart';

// import DrawerNav from '../components/Nav/DrawerNav/DrawerNav';
// import Checkout from '../components/Checkout/Checkout';

function App() {
  const [login, setLogin] = useState(false);
  const [admin, setAdmnin] = useState(false);

  async function checkLogin() {
    const bool = await isLoggedIn();

    if (!bool) {
      setLogin(false);
      return;
    }

    setLogin(true);
  }

  async function checkAdmin() {
    const bool = await isAdmin();

    if (!login) {
      setAdmnin(false);
      return;
    }

    if (!bool) {
      setAdmnin(false);
      return;
    }

    setAdmnin(true);
  }

  useEffect(() => {
    checkLogin();
    checkAdmin();
  });

  const AdminProtectedComponent = (Component) =>
    login && admin ? (
      <Component />
    ) : (
      <Navigate
        to={{
          pathname: '/admin',
        }}
      />
    );

  const ProtectedComponent = ({ children }) => {
    return login ? children : <Navigate to="/account/login" replace />;
  };

  const LoginProtect = ({ children }) => {
    return login ? <Navigate to="/account/me" replace /> : children;
  };

  return (
    <CartItemsProvider>
      <WishItemsProvider>
        <SearchProvider>
          <Router>
            <Header />
            <Routes>
              {/* <Route exact path="/" element={<Home />} /> */}
              <Route index element={<Home />} />

              <Route path="/account">
                {/* <Route path="me" element={<MyAccount />} /> */}
                <Route
                  path="manage"
                  element={
                    <ProtectedComponent>
                      <ManageAccount />
                    </ProtectedComponent>
                  }
                />
                <Route
                  path="me"
                  element={
                    <ProtectedComponent>
                      <MyAccount />
                    </ProtectedComponent>
                  }
                />
                <Route
                  path="login"
                  element={
                    <LoginProtect>
                      <Login />
                    </LoginProtect>
                  }
                />
                {/* TODO can add cart route here   */}
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Login />} />
              </Route>
              <Route path="/shop" element={<Shop />} />
              <Route path="/category">
                <Route path=":id" element={<CategoryView />} />
              </Route>
              <Route path="/item">
                <Route path="/item/saree">
                  <Route path=":id" element={<ItemView />} />
                </Route>
                <Route path="/item/lehnga">
                  <Route path=":id" element={<ItemView />} />
                </Route>
                <Route path="/item/kurti">
                  <Route path=":id" element={<ItemView />} />
                </Route>
                <Route path="/item/featured">
                  <Route path=":id" element={<ItemView />} />
                </Route>
              </Route>

              <Route
                path="/wishlist"
                element={
                  <ProtectedComponent>
                    <Wishlist />
                  </ProtectedComponent>
                }
              />

              <Route path="/search/*" element={<SearchView />} />
            </Routes>
            <Footer />
            <Routes></Routes>
          </Router>
        </SearchProvider>
      </WishItemsProvider>
    </CartItemsProvider>
  );
}

export default App;
