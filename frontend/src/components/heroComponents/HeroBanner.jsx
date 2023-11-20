import React from 'react';
import styles from './Hero.module.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from '../DatePicker';

const HeroBanner = () => {

  const [selectedPackageType, setSelectedPackageType] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);

  const navigate = useNavigate();

  const handleFilterPackages = (e) => {
    e.preventDefault();

    setIsFiltering(true);

    if (selectedPackageType === 'all') {
      navigate('/bookable');
    } else {
      navigate(`/bookable/packages/${selectedPackageType}`);
    }
  };

  const handleDateChange = (dates) => {
    
    console.log('Selected date updated:', dates);
  };


  return (
    <div className={styles.hero}>


      <form>

        <div className={styles.when}>
          <span className={styles.border}></span>
          <label htmlFor="">When?</label>
          <div className={styles.datePickerContainer}>
            <DatePicker onDateChange={handleDateChange} />
          </div>
        </div>

        <div className={styles.text}>
          <label htmlFor="packageType">Select Package:</label>
          <div>

            <select id="packageType" className={styles.text_select} value={selectedPackageType} onChange={(e) => setSelectedPackageType(e.target.value)}>
              <option value="All">All</option>
              <option value="Luxure">Luxury</option>
              <option value="Standard">Standard</option>
              <option value="Budget">Budget</option>
            </select>

          </div>
        </div>

        <div className={styles.search_btn}>
          <button onClick={handleFilterPackages} className={styles.btn}>
            <span className={styles.search_text}>SEARCH</span>
            <AiOutlineSearch className={styles.icon} />
          </button>
        </div>

      </form>
    </div>

  );
};

export default HeroBanner;
