import React, { useState } from 'react'
import styles from '../components/Reservation.module.css'

export const ReserveUserForm = ({setUserEmail, setEmailError, emailError}) => {

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);

    if (!e.target.value) {
      setEmailError('Email is required');
    } else {
      setEmailError('');
    }
  };

    return (
        <div className={styles.form_wrapper}>
         <form  className={styles.form} id='form' noValidate>
          <div className={styles.form_control}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="email"/>
        
          </div>
          <div className={styles.form_control}>
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" onChange={handleEmailChange}  />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          <div className={styles.form_control}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="phone" id="phone"/>
          </div>

          <div className={styles.form_control}>
            <p>Adress</p>
            <label htmlFor="street"></label>
          <input type="text" id="street" placeholder='Street adress' />
        
          </div>
          <div className={styles.form_control}>
            <label htmlFor="city"></label>
            <input type="text" id="city" placeholder='City' />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="state"></label>
            <input type="text" id="state" placeholder='State/Province' />
          </div>
        </form>
        </div>
       
    )
}
