import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar.jsx'; // Optional if you want to add a navbar
import './calc.css'; // Make sure to create this CSS file

const Home = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
  
    const handleClick = (value) => {
        setInput(input + value);
    };

    const clearDisplay = () => {
        setInput('');
    };

    const calculateResult = () => {
        try {
            setInput(eval(input).toString()); // Evaluate the expression (use cautiously)
        } catch (error) {
            setInput('Error');
        }
    };

    return (
        <div className="cal-container-main">
            <Navbar/>
            <div className="calculator">
                <div className="display">{input || '0'}</div>

                <div className="buttons">
                    <button onClick={clearDisplay} className="span-two">C</button>
                    <button onClick={() => handleClick('/')}>/</button>
                    <button onClick={() => handleClick('*')}>*</button>
                    <button onClick={() => handleClick('7')}>7</button>
                    <button onClick={() => handleClick('8')}>8</button>
                    <button onClick={() => handleClick('9')}>9</button>
                    <button onClick={() => handleClick('-')}>-</button>
                    <button onClick={() => handleClick('4')}>4</button>
                    <button onClick={() => handleClick('5')}>5</button>
                    <button onClick={() => handleClick('6')}>6</button>
                    <button onClick={() => handleClick('+')}>+</button>
                    <button onClick={() => handleClick('1')}>1</button>
                    <button onClick={() => handleClick('2')}>2</button>
                    <button onClick={() => handleClick('3')}>3</button>
                    <button onClick={calculateResult} className="span-two">=</button>
                    <button onClick={() => handleClick('0')}>0</button>
                    <button onClick={() => handleClick('.')}>.</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
