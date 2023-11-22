import React from 'react'
import styles from '../homePageCards/PackageInfoCard.module.css'

import budget from '../../assets/budget-cabin.png';
import standard from '../../assets/standard-cabin.png';
import deluxe from '../../assets/deluxe-cabin.png';

import bed from '../../assets/bed-icon.png';
import outside from '../../assets/outside-icon.png';
import wifi from '../../assets/wifi-icon.png';

export const PackageInfoCard = () => {
  return (
    <div className={styles.container}>
      <h3>Tailored Retreats for Every Budget</h3>
 <div className={styles.card_wrapper}>
    <div className={styles.card}>
        <img src={budget} alt="budget-img" className={styles.package_img}/>
        <h4>BUDGET</h4>
        <p>Experience a memorable getaway without breaking the bank with our budget-friendly cabin rental package. Unwind in the midst of nature, surrounded by the peaceful ambiance of the outdoors, making it an ideal escape for the budget-conscious traveler.</p>
        <div className={styles.icon}>
        <img src={bed} alt="bed-icon" width={20} />
        <img src={outside} alt="outsida-icon" width={20} />
        <img src={wifi} alt="wifi-icon" width={20} />
        </div>
    </div>
    <div className={styles.card}>
        <img src={standard} alt="budget-img" className={styles.package_img}/>
        <h4>STANDARD</h4>
        <p>Experience a memorable getaway without breaking the bank with our budget-friendly cabin rental package. Unwind in the midst of nature, surrounded by the peaceful ambiance of the outdoors, making it an ideal escape for the budget-conscious traveler.</p>
        <div className={styles.icon}>
        <img src={bed} alt="bed-icon" width={20} />
        <img src={outside} alt="outsida-icon" width={20} />
        <img src={wifi} alt="wifi-icon" width={20} />
        </div>
    </div>
    <div className={styles.card}>
        <img src={deluxe} alt="budget-img" className={styles.package_img}/>
        <h4>DELUXE</h4>
        <p>Experience a memorable getaway without breaking the bank with our budget-friendly cabin rental package. Unwind in the midst of nature, surrounded by the peaceful ambiance of the outdoors, making it an ideal escape for the budget-conscious traveler.</p>
        <div className={styles.icon}>
        <img src={bed} alt="bed-icon" width={20} />
        <img src={outside} alt="outsida-icon" width={20}/>
        <img src={wifi} alt="wifi-icon" width={20}/>
        </div>
    </div>
    </div>
    </div>
    
   

    

  )
}

export default PackageInfoCard
