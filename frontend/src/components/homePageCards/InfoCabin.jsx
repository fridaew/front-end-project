import React from 'react'
import styles from '../homePageCards/InfoCabin.module.css'

const InfoCabin = () => {
 
    return (
        <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.cabin_info}>
                <div>
                <h4>About Our Cabins</h4>
                <p>Welcome to our cozy cabin rentals, nestled in the heart of nature. Our cabins offer a perfect blend of comfort and rustic charm, providing you with a memorable retreat experience.</p>
                <hr />
                </div>
                
                <div>
                <h4>Activities and Features</h4>
                <p>Explore a wide range of outdoor activities during your stay. Our cabins are also equipped with cozy fireplaces, fully stocked kitchen and comfortable living spaces for a delightful stay.</p>
                <hr />
                </div>

                <div>
                <h4>Booking and Reservations</h4>
                <p>Booking with us is easy and convenient. Simply select your desired dates and cabin, and we'll take care of the rest. We offer flexible options to suit your preferences and ensure a seamless reservation process.</p>
                </div>
            </div>
      </div>
        </div>



    )
  
}

export default InfoCabin