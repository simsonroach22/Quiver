import React from "react";
import './contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../Navbar/navbar.jsx'

const Contact = () => {

    return (
        <div className="contactPage-container">
            <Navbar></Navbar>
            <div className="contact">
                <div className="content">
                    <h2>Contact Us</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius.</p>
                </div>
                <div className="container">
                    <div className="contactInfo">
                        <div className="box">
                            <div className="icon"><FontAwesomeIcon icon={faLocationDot} /></div>
                            <div className="text">
                                <h3>Address</h3>
                                <p>373/H1/H2 anna nagar sweet colony kongunadu america.</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon"><FontAwesomeIcon icon={faEnvelope} /></div>
                            <div className="text">
                                <h3>Email</h3>
                                <p>quiversupport@gamil.in</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon"><FontAwesomeIcon icon={faPhone} /></div>
                            <div className="text">
                                <h3>Phone</h3>
                                <p>9116996119</p>
                            </div>
                        </div>
                    </div>
                    <div className="contactForm">
                        <h2>Send Message</h2>
                        <div className="inputBox">

                            <input type="text" required="required"/>
                            <span>FullName</span>

                        </div>
                        <div className="inputBox">

                            <input type="text" required="required"/>
                            <span>Email</span>

                        </div>
                        <div className="inputBox">

                            <textarea name="" id="" required="required"></textarea>
                            <span>Type your Message...</span>

                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Send" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;