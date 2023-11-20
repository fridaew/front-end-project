import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard'; // Update the path as needed
import styles from '../reviewComponent/ReviewsCard.module.css';


const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/bookable/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data || []); 
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    fetchReviews();
  }, []);


  const displayedReviews = reviews.slice(0, 3);// ändra till 3

  return (
    <div className={styles.container}>
      <h3>Discover Memorable Retreat Experiences</h3>
   <div className={styles.review_container}>
      {displayedReviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
    </div>
 
  );
};

export default Reviews;

