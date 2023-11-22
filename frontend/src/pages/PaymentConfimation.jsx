import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentConfirm from '../assets/PaymentConfirm.png';

import styles from '../components/PaymentConfirmation.module.css';

const PaymentConfirmation = () => {
  const location = useLocation();

  const { totalPrice, image, bookingReference, userEmail } = location.state || {};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.geen_header}>
          <img src={PaymentConfirm} alt="" width={40} />
        </div>
        <h2>Thank you for your payment!</h2>
        <div>
          <p>
            Total payment amount: <br />
            <span className={styles.bold}>{totalPrice}</span>
          </p>
        </div>

        <div className={styles.reference_number}>
          <p>
            Your booking reference: <br />
            <span className={styles.bold}>{bookingReference}</span>
          </p>
        </div>

        <div className={styles.user_email}>
          <p>A Receipt for this transaction has been sent to this email:</p>
          <div>
            <p>
              Your email: <br />
              <span className={styles.bold}>{userEmail}</span>
            </p>
          </div>
        </div>

        <div className={styles.paymentImage}>
          {image && image[0] && image[1] && (
            <div>
              <img src={image[0]} alt="Cabin" width={350} height={250} className={styles.booking_image} />
              <img src={image[1]} alt="Cabin" width={350} height={250} className={styles.booking_image} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;





