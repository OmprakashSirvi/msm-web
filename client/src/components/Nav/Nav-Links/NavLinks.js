/** @format */

import { Link } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = () => {
   return (
      <nav className="nav__bottom__container">
         <div className="bottom__container">
            <ul className="nav">
               <li className="nav-link">
                  <Link to="/">Home</Link>
               </li>
               <li className="nav-link">
                  <Link to="/shop">Shop</Link>{' '}
               </li>
               <li className="nav-link">
                  <Link to="/category/Saree">Saree</Link>
               </li>
               <li className="nav-link">
                  <Link to="/category/Lenga">Lenga</Link>
               </li>
               <li className="nav-link">
                  <Link to="/category/kurti">Kurti</Link>
               </li>
            </ul>
         </div>
      </nav>
   );
};

export default NavLinks;
