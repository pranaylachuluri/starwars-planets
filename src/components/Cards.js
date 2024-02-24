import React, { useState } from 'react';
import './Card.css';
import {useNavigate } from 'react-router-dom';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// init Swiper:
const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],

});


const Cards = (props) => {
  const [planetData, setPlanetData] = useState(null);
  const api = props.api;
  const navigate = useNavigate();

  const cardDisplay = async () => {
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setPlanetData(result);
      localStorage.setItem("result", JSON.stringify(result));
      // console.log(result);
      console.log(localStorage.getItem("result"));
      
      // Navigate to the details page programmatically
      navigate("/details", { state: { planetData: result , link : props.imageUrl} });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="card">
            <img src={props.imageUrl} className="card-image" alt="planet" />
            <div className="card-content">
              <h2 style={{color:"white",fontStyle:"italic"}}>{props.title}</h2>
              <p>{props.content}</p>
              <button className='btn' onClick={cardDisplay}>Display</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
