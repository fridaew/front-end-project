import Select from 'react-select';
import styles from './Hero.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from '../DatePicker';
import Navbar from '../Navbar';

const HeroBanner = () => {
  const [selectedPackageType, setSelectedPackageType] = useState('All');
  const [isFiltering, setIsFiltering] = useState(false);
  const navigate = useNavigate();

  const options = [
    { value: 'All', label: 'All' },
    { value: 'Deluxe', label: 'Deluxe' },
    { value: 'Standard', label: 'Standard' },
    { value: 'Budget', label: 'Budget' },
  ];

  const handleFilterPackages = (e) => {
    e.preventDefault();

    setIsFiltering(true);

    console.log('Selected Package Type:', selectedPackageType);

    if (selectedPackageType === 'All') {
      navigate('/bookable');
    } else {
      navigate(`/bookable/packages/${selectedPackageType}`);
    }
  };

  const handleDateChange = (dates) => {
    console.log('Selected date updated:', dates);
  };


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      background: 'transparent',
      boxShadow: state.isFocused ? 'none' : provided.boxShadow,
      color:'red',
      cursor:'pointer'
    }),
    input: (provided) => ({
      ...provided,
      display: 'none', 
    
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'gray', // Set the color of the selected value
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'gray',
    }),
    option: (provided, state) => ({
      ...provided,
      border: 'none',
      backgroundColor: state.isFocused ? 'gray' : 'transparent',
      color: state.isFocused ? 'white' : 'black',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: 'black', 
      },
    }),
  };
  
  
  

  return (
    <div className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.navbarContainer}>
          <Navbar transparent={true} />
        </div>

        <form className={styles.hero_form}>
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
              <Select
                options={options}
                className={styles.text_select}
                value={options.find((option) => option.value.toLowerCase() === selectedPackageType.toLowerCase())}
                onChange={(selectedOption) => {
                  console.log('Selected Option:', selectedOption);
                  setSelectedPackageType(selectedOption.value);   
                }}
                styles={customStyles}
              />

            </div>
          </div>

          <div className={styles.search_btn}>
            <button onClick={handleFilterPackages} className={styles.btn}>
              <span className={styles.search_text}>SEARCH</span>
              <AiOutlineSearch className={styles.icon} />
            </button>
          </div>
        </form>

        <p className={styles.hero_text}>Explore our luxury & <br />romantic cabins for couples</p>
      </div>
    </div>
  );
};

export default HeroBanner;




