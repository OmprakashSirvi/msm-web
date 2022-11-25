import Carousel from 'react-bootstrap/Carousel';
import './ItemCarousel.css';

const ProductCarousel = (props) => {
  const URL = process.env.REACT_APP_API_URL;
  return (
    <div className="product__carousel__container">
      <div className="product__carousel">
        <Carousel variant="dark" interval={4000}>
          <Carousel.Item>
            <div className="carousel__image__container">
              <img className="carousel__image" src={`${URL}/images/${props.item.images[0].filename}`} alt="item" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel__image__container">
              <img className="carousel__image" src={`${URL}/images/${props.item.images[0].filename}`} alt="item" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel__image__container">
              <img className="carousel__image" src={`${URL}/images/${props.item.images[0].filename}`} alt="item" />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
