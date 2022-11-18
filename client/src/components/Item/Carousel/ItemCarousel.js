import Carousel from 'react-bootstrap/Carousel';
import './ItemCarousel.css';

const ProductCarousel = (props) => {
  return (
    <div className="product__carousel__container">
      <div className="product__carousel">
        <Carousel variant="dark" interval={4000}>
          <Carousel.Item>
            <div className="carousel__image__container">
              {/* TODO Add image of products URL here**/}
              <img className="carousel__image" src={''} alt="item" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel__image__container">
              {/* TODO Add image of products URL here*/}
              <img className="carousel__image" src={''} alt="item" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel__image__container">
              {/* TODO Add image of products URL here */}
              <img className="carousel__image" src={''} alt="item" />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
