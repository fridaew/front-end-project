import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDate } from '../context/DatePickerContext';
import DateSelectionModal from './modal/DateSelectionModal';
import styles from './BookableDetail.module.css';


import { IoBedOutline, IoPawOutline, IoWifiOutline } from 'react-icons/io5'
import { TbToolsKitchen2 } from 'react-icons/tb'
import { MdOutlineDeck } from 'react-icons/md'
import { RiChargingPileLine } from 'react-icons/ri'
import { LuParkingSquare } from 'react-icons/lu'
import { GrLounge } from 'react-icons/gr'
import { BiSolidUser } from 'react-icons/bi'
import { RiStarFill } from 'react-icons/ri'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { BsFillCircleFill } from 'react-icons/bs'

import towel from '../assets/towel.png'
import tv from '../assets/tv.png'
import Washing from '../assets/washing.png'
import bedding from '../assets/bedding.png'


import LoadingComponent from '../components/statusComponents/LoadingComponent';
import ErrorComponenet from "./statusComponents/ErrorComponenet";


const BookableDetail = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [bookable, setBookable] = useState(null);
  const [reservation, setResarvetion] = useState(null);
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const { selectedDates } = useDate();
  const [sliderData, setSliderData] = useState(null);
  const [val, setVal] = useState(0);

  // const [showMore, setShowMore] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  // const isSmallScreen = window.innerWidth <= 600;

  useEffect(() => {
    const fetchBookableById = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/bookable/${id}`);
        const data = await response.json();
        setBookable(data);
        setLoading(false)
        console.log(data);
      } catch (error) {
        setError(error)
        setLoading(false)
        console.error('Error fetching bookable details:', error);
      }
    };

    fetchBookableById();
  }, [id]);

  useEffect(() => {
    if (bookable?.packages?.image.length > 0) {
      setSliderData(bookable.packages.image[0]);
    }
  }, [bookable]);

  if (bookable === null) {
    return <p>Loading...</p>;
  }

  const renderStarRating = (reviewIndex) => {
    const starArray = [];
    const filledStars = Math.round(bookable.reviews[reviewIndex].rating);
    const totalStars = 5;

    for (let i = 0; i < totalStars; i++) {
      if (i < filledStars) {
        starArray.push(<span className={styles.gold_star} key={i}><RiStarFill /></span>);
      } else {
        starArray.push(<span className={styles.gray_star} key={i}><RiStarFill /></span>);
      }
    }

    return starArray;
  };


  const handleReserveClick = async () => {

    if (!selectedDates.startDate || !selectedDates.endDate) {
      setModalOpen(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookableId: id,
          checkInDate: selectedDates.startDate,
          checkOutDate: selectedDates.endDate
        }),
      });
      if (response.ok) {
        const createdReservation = await response.json()
        setResarvetion(createdReservation)
        console.log('reservation created');
        navigate(`/reservation/${createdReservation._id}`);

      } else {
        console.error('Reservation creation failed');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };



  const handleClick = (index) => {
    console.log(index);
    setVal(index)
    const slider = bookable.packages.image[index]
    setSliderData(slider)
    console.log('slider set to ', slider);
  }

  const handleNext = () => {
    let index = val < bookable.packages.image.length - 1 ? val + 1 : val;
    setVal(index)
    const slider = bookable.packages.image[index]
    setSliderData(slider)

  }
  const handlePrevious = () => {
    let index = val > 0 ? val - 1 : bookable.packages.image.length - 1;

    setVal(index)
    const slider = bookable.packages.image[index]
    setSliderData(slider)

  }


  return (
    <div className={styles.container}>
      <div className={styles.image}>

        {sliderData && (
          <img className={styles.main_img} src={sliderData} alt={`Main Image`} width={570} height={500} />
        )}

        <div className={styles.slider_flex_row}>
          <button className={styles.prev_btn} onClick={handlePrevious}><AiOutlineArrowLeft /></button>
          {bookable.packages.image.map((image, index) => (
            <div key={index} className={styles.thumbnail}>
              <img src={image} alt={`Image ${index + 1}`} className={styles.thumbnail} onClick={() => handleClick(index)} />
            </div>

          ))}
          <button className={styles.next_btn} onClick={handleNext}><AiOutlineArrowRight /></button>
        </div>

      </div>

      <div className={styles.row1}>

        <div className={styles.facilities}>

          <h3>Facilities</h3>
          <div className={styles.flex_facilities}>

            <div className={styles.facilities_row}>
              <p><IoPawOutline style={{ fontSize: 30 }} /> Pets allowed</p>
              <p><TbToolsKitchen2 style={{ fontSize: 30 }} /> Kitchen</p>
              <p><IoBedOutline style={{ fontSize: 30 }} /> king size bed</p>
              <p><MdOutlineDeck style={{ fontSize: 30 }} /> Private deck</p>
              <p><img src={tv} alt="" width={20} /> TV</p>
              <p><img src={Washing} alt="" width={20} /> Wasching machine</p>
            </div>
            <div>
              <p><RiChargingPileLine style={{ fontSize: 28 }} /> Charging station for electric vehcles</p>
              <p><IoWifiOutline style={{ fontSize: 30 }} /> Free Wifi</p>
              <p><LuParkingSquare style={{ fontSize: 29 }} /> Private parking</p>
              <p><GrLounge style={{ fontSize: 29 }} /> Lounge</p>
              <p><img src={towel} alt="" width={20} /> Towels</p>
              <p><img src={bedding} alt="" width={19} /> Comfortable bedding  </p>
            </div>
          </div>

        </div>

        <div className={styles.reservation_card}>

          <div className={styles.dates}>
            <div className={styles.guests_bedroom}>
              <p>{bookable.rooms} Bedroom</p>
              <p className={styles.guests}>{bookable.guests} x <BiSolidUser /></p>
            </div>

            <div className={styles.selected_dates}>
              {selectedDates.startDate && (
                <p>Check-in Date: {selectedDates.startDate.toLocaleDateString()}</p>
              )}
              {selectedDates.endDate && (
                <p>Check-out Date: {selectedDates.endDate.toLocaleDateString()}</p>
              )}
              {!selectedDates.startDate && !selectedDates.endDate && (
                <>
                <p>No dates selected</p>
                <DateSelectionModal isOpen={isModalOpen} onClose={closeModal} onReserveClick={handleReserveClick} />
              </>
              )}
            </div>
          </div>

          <div className={styles.total}>
            <div className={styles.row}>
              <span>Total: </span>
              <p>{bookable.packages.price}: SEK</p>
            </div>
            <button onClick={handleReserveClick}>reserve</button>
          </div>
        </div>
      </div>

      {<div className={styles.package_included}>
        {bookable.packages ? (
          <>
            <h3>Included in the package:</h3>
            <div className={styles.package_items}>
              <div className={styles.column}>
                {bookable.packages.inclusions.slice(Math.floor(bookable.packages.inclusions.length / 2)).map((item, index) => (
                  <p key={index} className={styles.packageInclusions1}>
                    <BsFillCircleFill style={{ fontSize: 10, color: 'green', marginRight: 5 }} /> {item}
                  </p>
                ))}
              </div>
              <div className={styles.column}>
                {bookable.packages.inclusions.slice(0, Math.floor(bookable.packages.inclusions.length / 2)).map((item, index) => (
                  <p key={index} className={styles.packageInclusions}>
                    <BsFillCircleFill style={{ fontSize: 10, color: 'green', marginRight: 5 }} />{item}
                  </p>
                ))}
              </div>
            </div>

            {/* {showMore && isSmallScreen && (
              <button
                id="readMoreBtn"
                className={styles.read_more_btn}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Read Less' : 'Read More'}
              </button>
            )} */}
          </>
        ) : (
          <p>No package available.</p>
        )}
      </div>}


      <div className={styles.reviews_wrapper}>
        <h3>Reviews:</h3>
        <div className={styles.reviews}>

          {bookable && bookable.reviews.map((review, index) => (
            <div key={review._id} className={styles.review_items}>
              <div className={styles.rating_row}>
                <img src={review.image} alt={review.text} className={styles.review_image} />
                <p className={styles.rating}>{renderStarRating(index)}</p>
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}

export default BookableDetail;

