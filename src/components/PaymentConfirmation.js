import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTrain, selectedSeats, formData } = location.state;

  const handlePayment = () => {
    // Simulate payment processing and confirmation
    alert('Payment successful! Booking confirmed.');
    
    // Redirect to home or a confirmation page
    navigate('/');
  };

  return (
    <div className="container">
      <div className="cta-form">
        <h2>Payment Confirmation</h2>
        <p>Train Number: {selectedTrain.trainNumber}</p>
        <p>Coach Number: {selectedSeats.map(seat=> `Coach ${seat.coachNumber}`).join(', ')}</p> 
        <p>Selected Seats: {selectedSeats.map(seat => `Seat ${seat.seatNumber}`).join(', ')}</p>
        <p>Total Amount: £{formData.numberOfPassengers*20}</p>
        <button type="button" className="form__input" onClick={handlePayment}>Confirm Payment</button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
