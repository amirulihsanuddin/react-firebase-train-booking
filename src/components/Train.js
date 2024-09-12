import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';
import Coach from './Coach';
import './styles.css';

const Train = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, selectedTrain: initialSelectedTrain } = location.state;
  const { departureDate, numberOfPassengers } = formData;

  // Use useState to store selectedTrain
  const [selectedTrain, setSelectedTrain] = useState(initialSelectedTrain);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber, coachNumber, trainKey) => {
    if (selectedSeats.length >= numberOfPassengers) {
      alert('You can only select seats matching the number of passengers');
      return;
    }

    const seatPath = `trains/${departureDate}/${trainKey}/coaches/${coachNumber}/seats/${seatNumber}`;
    const seatRef = ref(db, seatPath);

    // Update the seat booking status in Firebase
    update(seatRef, { isBooked: true }).then(() => {
      // Update state to reflect the change
      setSelectedTrain(prevTrain => {
        const updatedTrain = { ...prevTrain };
        updatedTrain.coaches[coachNumber].seats[seatNumber].isBooked = true;
        return updatedTrain;
      });

      // Add the selected seat to the state
      setSelectedSeats(prevSeats => [
        ...prevSeats,
        { coachNumber, seatNumber, trainKey }
      ]);
    });
  };

  const handleCancelAll = () => {
    selectedSeats.forEach(seat => {
      const seatPath = `trains/${departureDate}/${seat.trainKey}/coaches/${seat.coachNumber}/seats/${seat.seatNumber}`;
      const seatRef = ref(db, seatPath);
      
      // Update Firebase to mark the seat as not booked
      update(seatRef, { isBooked: false }).then(() => {
        // Update state to reflect the cancellation
        setSelectedTrain(prevTrain => {
          const updatedTrain = { ...prevTrain };
          updatedTrain.coaches[seat.coachNumber].seats[seat.seatNumber].isBooked = false;
          return updatedTrain;
        });
      });
    });

    // Clear the selected seats and force re-render
    setSelectedSeats([]);
  };

  const handleConfirmSelection = () => {
    navigate('/booking-summary', { state: { selectedTrain, selectedSeats, formData } });
  };

  return (
    <div className="container">
      <div className="cta-form">
        <h2>Select Your Train and Seats</h2>
      </div>
      <div className="form">
        <h3>{selectedTrain.departureTime} - {selectedTrain.arrivalTime} Train</h3>
        {Object.keys(selectedTrain.coaches).map(coachNumber => (
          <Coach
            key={coachNumber}
            coachNumber={coachNumber}
            seats={selectedTrain.coaches[coachNumber].seats}
            handleSeatClick={(seatNumber) => handleSeatClick(seatNumber, coachNumber, selectedTrain.trainNumber)}
          />
        ))}
      </div>
      <div className="form">
        <h4>Selected Seats:</h4>
        {selectedSeats.length > 0 ? (
          <ul>
            {selectedSeats.map((seat, index) => (
              <li key={index}>Train: {seat.trainKey}, Coach: {seat.coachNumber}, Seat: {seat.seatNumber}</li>
            ))}
          </ul>
        ) : (
          <p>No seats selected.</p>
        )}
      </div>
      <div className="form">
        <button className="form__submit" onClick={handleConfirmSelection} disabled={selectedSeats.length !== numberOfPassengers}>
          Confirm Selection
        </button>
        <button className="form__submit" onClick={handleCancelAll}>Cancel Selection</button>
      </div>
    </div>
  );
};

export default Train;
