import React from 'react'
import logo from '../assets/logo.svg';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';
import location from '../assets/location.png';
import phone from '../assets/phone.png';
import mail from '../assets/mail.png';

const Footer = () => {
    const email = 'contact@northennest.com';
    return (
        <div className='footer-container'>
            <div className='footer'>
                <div className='sb-footer section-padding'>
                    <div className='sb-footer-contact'>
                        <div className='sb-footer-contact-div'>
                            <h4>Contact us</h4>
                            <ul>
                                <li className='gold-text'>Northennest Retreats</li>
                                <li><img src={location} alt="location" />Norrskogsvägen 235</li>
                                <li>235 Åre Sweden</li>
                                <li> <img src={phone} alt="phone" />+46 123 423 024</li>
                                <li>
                                    <div className='mail-section'>
                                        <img src={mail} alt="email" className='mail-icon' />
                                        <a href={`mailto:${email}`}>{email}</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='sb-footer-contact_div'>
                            <h4>Sign up for newsletter</h4>
                            <ul className='footer-row-2'>

                                <li>
                                    <div className="input-container">
                                        <input type="text" placeholder="Email" />
                                        <button>Subscribe</button>
                                    </div>
                                </li>
                                <li> <img src={logo} alt="" height={70} width={170} /></li>
                                <li><p>© . 2023 NorthernNest Retreats. All Rights Reserved</p></li>
                            </ul>
                        </div>
                        <div className='sb-footer-contact_div'>
                            <h4>Social Media</h4>
                            <ul className='social-media'>
                                <li>
                                    <p><img src={facebook} alt="facebook" /></p>
                                </li>
                                <li>
                                    <p><img src={twitter} alt="twitter" /></p>
                                </li>
                                <li>
                                    <p><img src={instagram} alt="instagram" /></p>
                                </li>

                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer