import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import sliderImage1 from '../../assets/sliderImage-1.png';
import sliderImage2 from '../../assets/sliderImage-2.png';
import sliderImage3 from '../../assets/sliderImage-3.png';
import sliderImage4 from '../../assets/sliderImage-4.png';

import styles from '../homePageCards/ImageHomeSlider.module.css'


const ImageHomeSlider = () => {
  return (
    <div className={styles.carousel_wrapper}>

      <div className={styles.container}>
        <h3>Explore our activities</h3>

        <Carousel data-bs-theme="light" interval={null} indicators={false}>
          <Carousel.Item>
            <img className="d-block w-100" src={sliderImage4} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={sliderImage2} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={sliderImage1} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  )
}

export default ImageHomeSlider