import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';
import './styles.css';

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTrain, selectedSeats, formData } = location.state;

  const handleConfirmBooking = () => {
    // Navigate to the payment confirmation page
    navigate('/payment-confirmation', { state: { selectedTrain, selectedSeats, formData } });
  };

  const handleCancelSelection = async () => {
    try {
      // Cancel all selected seats by updating Firebase
      const cancelPromises = selectedSeats.map(seat => {
        const seatRef = ref(db, `trains/${formData.departureDate}/${seat.trainKey}/coaches/${seat.coachNumber}/seats/${seat.seatNumber}`);
        return update(seatRef, { isBooked: false }).then(() => {
          // Update local state to reflect cancellation
          selectedTrain.coaches[seat.coachNumber].seats[seat.seatNumber].isBooked = false;
        });
      });
  
      // Wait for all updates to complete
      await Promise.all(cancelPromises);
  
      // Navigate back to the train selection page after all cancellations are confirmed
      navigate('/train', { state: { selectedTrain, formData } });
    } catch (error) {
      console.error('Error canceling seat selection:', error);
      alert('Failed to cancel the seat selection. Please try again.');
    }
  };
  

  return (
    <div className="container">
      <div className="cta-form">
        <h2>Booking Summary</h2>
        <p>Train Number: {selectedTrain.trainNumber}</p>
        <p>Origin: {selectedTrain.origin}</p>
        <p>Destination: {selectedTrain.destination}</p>
        <p>Departure Time: {selectedTrain.departureTime}</p>
        <p>Arrival Time: {selectedTrain.arrivalTime}</p>
        <p>Coach Number: {selectedSeats.map(seat=> `Coach ${seat.coachNumber}`).join(', ')}</p> 
        <p>Selected Seats: {selectedSeats.map(seat => `Seat ${seat.seatNumber}`).join(', ')}</p>
        <p>Number of Passengers: {formData.numberOfPassengers}</p>
        <button type="button" className="form__input" onClick={handleConfirmBooking}>Confirm and Proceed to Payment</button>
        <button type="button" className="form__input" onClick={handleCancelSelection}>Cancel Selection</button>
      </div>
    </div>
  );
};

export default BookingSummary;
