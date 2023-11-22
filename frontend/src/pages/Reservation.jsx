import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ReserveUserForm } from '../components/ReserveUserForm';

import styles from '../components/Reservation.module.css'

const Reservation = () => {
  const [reservations, setReservations] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/reservation/${id}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setReservations(data);
  
          console.log(data);
        } else {
          console.error('Error fetching reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [id]);


  const handleCancellationChange = (e) => {
    const selected = e.target.checked;
    const updatedReservation = { ...reservations };
    updatedReservation.cancellation_protection.selected = selected;

    if (selected) {
      updatedReservation.totalPrice = reservations.bookableId.packages.price + 500;
    } else {
      updatedReservation.totalPrice = reservations.bookableId.packages.price;
    }

    setReservations(updatedReservation);
  };

  const handlePaymentOptionChange = (e) => {
    const selectedPaymentOption = e.target.value;
    setReservations((prevState) => ({
      ...prevState,
      paymentOption: selectedPaymentOption,
    }));
    setPaymentError('')
    console.log('Is it checked:', e.target.checked);
  };

  const navigateToPaymentConfirmation = () => {

    if (!userEmail) {
      setEmailError('Email is required'); 
      return;
    }
  
    if (!reservations.paymentOption) {
      setPaymentError('* Please select a payment option');
      return;
    }
    const state = { ...reservations, userEmail };
  
    if (!reservations.cancellation_protection.selected) {
      state.totalPrice = reservations.totalPrice || reservations.bookableId.packages.price;
    }
    state.image = reservations.bookableId.packages.image;
    state.bookingReference = reservations.bookingReference;
  
  
    navigate('/payment-confirmation', { state });
  };

  return (
    <div className={styles.container}>
      <div className={styles.reservations_infoCard}>
        <div className={styles.reservations_card}>
          <h2 className={styles.green_header}>Booking Information</h2>
          <div className="bookableInfo">
            {reservations.bookableId ? (
              <>
                {reservations.checkInDate && reservations.checkOutDate && (
                  <div className={styles.dates}>
                    <div className={styles.date_column}>
                      <h4>Check-in date: </h4>
                      <p>{format(parseISO(reservations.checkInDate), 'yyyy-MM-dd')} From 12 AM</p>
                    </div>
                    <div className={styles.date_column}>
                      <h4>Check-out date:</h4>
                      <p className={styles.date_right}>{format(parseISO(reservations.checkOutDate), 'yyyy-MM-dd')} From 12 AM</p>
                    </div>
                  </div>
                )}
                <div className={styles.row}>
                  <div>
                    <h4>Chosen Cabin:</h4>
                    <p>{reservations.bookableId.description} - {reservations.bookableId.location}</p>
                    <p></p>
                  </div>
                  <div className={styles.guests_row}>
                    <h4>Guests</h4>
                    <p>{reservations.bookableId.guests} Pers</p>
                  </div>
                </div>

                {reservations.bookableId.packages && (
                  <div className={styles.packages_items}>
                    <h4>Cabin Package:</h4>
                    <p className={styles.package_name}>{reservations.bookableId.packages.name}: </p>

                    <div className={styles.inclusions_items}>
                      {reservations.bookableId.packages.inclusions.map((inclusion, index) => (
                        <p key={index}>{inclusion}</p>
                      ))}
                    </div>
                  </div>
                )}

                {reservations.cancellation_protection && (
                  <div>

                    <h4>Cancellation Protection:</h4>
                    <div className={styles.cancellation_protection}>
                      <p>{reservations.cancellation_protection.price} SEK</p>
                      <label className={styles.label_container}>
                        <input type="checkbox" id="cancellationProtection" name="cancellationProtection" checked={reservations.cancellation_protection.selected} onChange={handleCancellationChange} />
                        <span className={styles.checkmark}></span>
                      </label>
                    </div>

                    <div className={styles.totalPrice}>
                      <h4>Total cost</h4>
                      <p>{reservations.totalPrice || reservations.bookableId.packages.price}: SEK</p>
                    </div>
                  </div>
                )}

              </>
            ) : (
              <p>No bookable information for this reservation</p>
            )}
          </div>
        </div>

        <div className={styles.form_row}>


          <div>
          <ReserveUserForm setUserEmail={setUserEmail} setEmailError={setEmailError} emailError={emailError}/>
          </div>

          <div className={styles.payment_card}>
          <h4>Payment Methods: *</h4>
    
          <div className={styles.payment_control}>
            <input type="radio" id="optionCard" name="paymentOption" value="Card" checked={reservations.paymentOption === "Card"} onChange={handlePaymentOptionChange} />
            <label htmlFor="option1"></label>
            <img src="https://static.feber.se/article_images/29/69/21/296921_980.jpg" alt="Card" height={35} />
          </div>
          <div className={styles.payment_control} >
            <input type="radio" id="optionKlarna" name="paymentOption" value="Klarna" checked={reservations.paymentOption === "Klarna"} onChange={handlePaymentOptionChange} />
            <label htmlFor="option2"></label>
            <img src="https://www.creades.se/media/zh1pre2u/klarna-payment-ny-logga-juni-2019.png" alt="Klarna" height={50} />
          </div>
          <div className={styles.payment_control}>
            <input type="radio" id="optionPayPal" name="paymentOption" value="PayPal" checked={reservations.paymentOption === "PayPal"} onChange={handlePaymentOptionChange} />
            <label htmlFor="option3"></label>
            <img src="https://www.sviv.se/wp-content/uploads/2021/01/paypal-784404_1280.png" alt="Pay Pal" height={50} />
          </div>
          <div className={styles.payment_control}>
            <input type="radio" id="optionAmex" name="paymentOption" value="American Express" checked={reservations.paymentOption === "American Express"} onChange={handlePaymentOptionChange} />
            <label htmlFor="option4"></label>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIcRgyszWWsQ9UzurbaUZQlYGcwXOF5Gmcjw&usqp=CAU" alt="American Express" height={50} />
          </div>  
          {paymentError && <p className={styles.error}>{paymentError}</p>}     
        </div>
      </div>
      
  
    </div>
    <button className={styles.confirm_btn} onClick={navigateToPaymentConfirmation}>Confirm booking</button>
  </div>    
  );
};

export default Reservation;





