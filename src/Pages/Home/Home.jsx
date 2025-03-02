import React from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar.jsx';
import './Home.css';
import passwordImage from '../../components/Assets/passManagerPF.png'; // Import image
import calculator from '../../components/assets/calcPF.png'

const Home = () => {
    const navigate = useNavigate();

    const handlePassClick = () => {
        navigate('/Home/pass'); // Navigate on click
    };

    const handleCalcClick = () =>{
        navigate('/Home/Calc')
    };

    return (
        <div className="HomeContainer">
            <Navbar />
            <div className="apps-container">
                <h1>Welcome to the Dashboard</h1>
                <div className="app-links">
                    <div className="achievement-container" onClick={handlePassClick}>
                        <img 
                            src={passwordImage} 
                            alt="Password Manager" 
                            className="achievement-image"
                        />
                        <div className="achievement-overlay">
                            <p>View Password Manager</p>
                        </div>
                    </div>
                    <div className="achievement-container" onClick={handleCalcClick}>
                        <img 
                            src={calculator} 
                            alt="calculatorr" 
                            className="achievement-image"
                        />
                        <div className="achievement-overlay">
                            <p>Calculator</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
