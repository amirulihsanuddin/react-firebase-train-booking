import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase'; // Make sure to import your Firebase configuration
import './styles.css';

const TrainSelection = () => {
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {}; // Fetch data from HomeScreen
  const { departureDate } = formData;

  useEffect(() => {
    const trainsRef = ref(db, `trains/${departureDate}`);
    onValue(trainsRef, (snapshot) => {
      const data = snapshot.val();
      setTrains(data ? Object.values(data) : []);
    });
  }, []);

  const selectTrain = (train) => {
    // Navigate to the train seat selection page, passing selected train and form data
    navigate('/train', { state: { selectedTrain: train, formData } });
  };

  return (
    <div className="container">
      <h2 className="cta-form">Select a Train</h2>
      {trains.length === 0 ? (
        <p>No trains available for the selected route.</p>
      ) : (
        trains.map((train, index) => (
          <div key={index} className="form">
            <p>
              Train {train.trainNumber}: {train.origin} to {train.destination}
            </p>
            <p>Departure: {train.departureTime} | Arrival: {train.arrivalTime}</p>
            <button className="form__submit" onClick={() => selectTrain(train)}>Select</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TrainSelection;
