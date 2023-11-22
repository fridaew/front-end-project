import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from './Bookable.module.css';
import { RiStarFill } from 'react-icons/ri';
import { PiHeartStraightFill } from 'react-icons/Pi';

const BookableCard = ({ bookable}) => {
  const navigate = useNavigate();
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [simulatedRating, setSimulatedRating] = useState(generateRandomRating());

  useEffect(() => {
    setSimulatedRating(generateRandomRating());
  }, []); 



  function generateRandomRating() {
    const minRating = 3;
    const maxRating = 5;
    const randomRating = Math.random() * (maxRating - minRating) + minRating;
    return parseFloat(randomRating.toFixed(1));
  }

  const handleViewDeal = () => {
    navigate(`/bookable/${bookable._id}`);
  };



  const renderSimulatedStarRating = () => {
    const filledStars = Math.round(simulatedRating);
    const totalStars = 5;
    const starArray = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < filledStars) {
        starArray.push(<span className={styles.gold_star} key={i}><RiStarFill /></span>);
      } else {
        starArray.push(<span className={styles.gray_star} key={i}><RiStarFill /></span>);
      }
    }

    return starArray;
  };

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.bookableContainer}>
          <NavLink to={`/bookable/${bookable._id}`}>
            {bookable.packages.image[0] && (
              <div className={styles.imageContainer}>
                <img src={bookable.packages.image[0]} alt={`Image 0`} className={styles.image} width={270} height={220} />
                <p className={styles.overlayText}>{bookable.packages.name}</p>
              </div>
            )}
          </NavLink>
        </div>
        <div className={styles.row1}>
          <p className={styles.price}>Price: {bookable.packages.price} SEK</p>
          <h4>{bookable.description}</h4>
          <div className={styles.guest_info}>
            <p className={styles.rooms}>{bookable.rooms} Bedroom</p>
            <p>{bookable.guests} Guests</p>
          </div>
          <p className={styles.rating}>{simulatedRating} {renderSimulatedStarRating()}</p>
        </div>
        <div>
          <p className={styles.heart} onClick={handleHeartClick} style={{ color: isHeartClicked ? 'red' : 'gray' }}><PiHeartStraightFill /></p>
          <button onClick={handleViewDeal} className={styles.btn}>View Deal</button>
        </div>
      </div>
    </div>
  );
}

export default BookableCard;






