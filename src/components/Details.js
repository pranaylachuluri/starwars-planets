import React, { useState, useEffect } from 'react';
import './Details.css';
import { useLocation } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const planetData = location.state?.planetData;
  const link = location.state?.link;

  const residents = planetData.residents;
  const [residentDetails, setResidentDetails] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentPromises = residents.map(residentUrl =>
          fetch(residentUrl).then(response => response.json())
        );

        const residentResults = await Promise.all(residentPromises);
        setResidentDetails(residentResults);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, [residents]);

  if (!planetData) {
    return <div>No data available</div>;
  }

  if (residentDetails.length === 0) {
    return (
      <div className='Container'>
        <img src={link} className='image' alt='planet'></img>
        <div className='details' style={{ position: 'relative' }}>
          <h1 style={{ position: 'absolute', top: '0', marginTop: '30px' }}>
            Details for {planetData.name}
          </h1>
          <p>Climate: {planetData.climate}</p>
          <p>Population: {planetData.population}</p>
          <p>Terrain: {planetData.terrain}</p>
          <p>Gravity: {planetData.gravity}</p>
          <p>Diameter: {planetData.diameter}</p>
          <p>Rotation Period: {planetData.rotation_period}</p>
        </div>
        <div className='residents mx-2' style={{ position: 'relative' }}>
          <h1 style={{ position: 'absolute', top: '0', marginTop: '30px' }}>
            Details of Residents
          </h1>
          <h2>N/A</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='Container'>
      <img src={link} className='image mx-3' alt='planet'></img>
      <div className='details' style={{ position: 'relative' }}>
        <h1 style={{ position: 'absolute', top: '0', marginTop: '30px' }}>
          Details for {planetData.name}
        </h1>
        <p>Climate: {planetData.climate}</p>
        <p>Population: {planetData.population}</p>
        <p>Terrain: {planetData.terrain}</p>
        <p>Gravity: {planetData.gravity}</p>
        <p>Diameter: {planetData.diameter}</p>
        <p>Rotation Period: {planetData.rotation_period}</p>
      </div>
      <div className='residents mx-2' style={{ position: 'relative' }}>
        <h1 style={{ position: 'absolute', top: '0', marginTop: '30px' }}>
          Details of Residents
        </h1>
        <div className='res'>
          {residentDetails.map((resident, index) => (
            <div className='resident' key={index}>
              <span>Name:</span> {resident.name} <span>, Birth Year:</span> {resident.birth_year}, <span>Gender:</span> {resident.gender}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
