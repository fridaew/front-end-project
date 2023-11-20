import React from 'react';
import styles from '../reviewComponent/ReviewsCard.module.css';
import {RiStarFill} from 'react-icons/ri'

const ReviewCard = ({ review }) => {
    if (!review) {
        return null;
    }

    const renderStarRating = () => {
        const filledStars = Math.round(review.rating);
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
    }

    return (
        <div className={styles.card}>
            <img src={review.image} alt="review Image" className={styles.image} width={20} height={90}/>
            <p className={styles.font_name}>{review.name}</p>
            <p className={styles.rating}>{renderStarRating()}</p>
            <p className={styles.text}>{review.text}</p>
        <div className={styles.row1}>
              
               
      </div>
 
        </div>
    );
};

export default ReviewCard;







