import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrainsForDate } from './trainCreator';
import './styles.css';

const Home = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);

  const handleSubmit = () => {
    if (!origin || !destination || !departureDate) {
      alert('Please fill in all fields.');
      return;
    }

    createTrainsForDate(departureDate, origin, destination);

    const formData = { origin, destination, departureDate, returnDate, numberOfPassengers };
    navigate('/train-selection', { state: { formData } });
  };

  return (
    <div className="container">
      <h2 className="cta-form">Train Booking System</h2>
      <form className="form">
        <div>
          <label htmlFor="origin" className="form__label">Origin</label>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
            <option value="">Select City</option>
            <option value="London">London</option>
            <option value="Paris">Paris</option>
          </select>
        </div>

        <div>
          <label htmlFor="destination" className="form__label">Destination</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select City</option>
            <option value="London">London</option>
            <option value="Paris">Paris</option>
          </select>
        </div>

        <div>
          <label htmlFor="departureDate" className="form__label">Departure Date</label>
          <input
            type="date"
            placeholder="Departure Date"
            className="form__input"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            id="departureDate"
          />
    
        </div>

        <div>
          <label htmlFor="returnDate" className="form__label">Return Date</label>
          <input
            type="date"
            placeholder="Return Date"
            className="form__input"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            id="returnDate"
          />
        </div>

        <div>
          <label htmlFor="numberOfPassengers" className="form__label">Number of Passengers</label>
          <input
            type="number"
            placeholder="Number of Passengers"
            className="form__input"
            value={numberOfPassengers}
            onChange={(e) => setNumberOfPassengers(e.target.value)}
            id="numberOfPassengers"
            min="1"
          />
      
        </div>

        <button className="form__submit" onClick={handleSubmit}>Search Train</button>
      </form>
    </div>
  );
};

export default Home;
