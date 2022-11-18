/** @format */

import { Link } from 'react-router-dom';
import './CategoryCard.css';
import { Button } from '@mui/material';

import image from '../../../asset/brand/saree1.png';

const CategoryCard = (props) => {
   return (
      <div className="category__card__card">
         <div className="category__image">
            <img src={image} alt="image" className="product__img" />
         </div>
         <div className="category__card__detail">
            <div className="category__name">
               {/* <span>{props.data.name}</span> */}
            </div>
            <div className="category__card__action">
               <>
                  <Button
                     variant="outlined"
                     sx={[
                        {
                           '&:hover': {
                              backgroundColor: 'none',
                              borderColor: '#FFE26E',
                              color: '#FFE26E',
                           },
                           borderRadius: '20px',
                           borderColor: '#FFE26E',
                           backgroundColor: '#FFE26E',
                           color: '#000',
                           fontWeight: '700',
                        },
                     ]}
                  >
                     SHOP NOW
                  </Button>
               </>
            </div>
         </div>
      </div>
   );
};

export default CategoryCard;
