import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import TrainSelection from './components/TrainSelection';
import Train from './components/Train';
import BookingSummary from './components/BookingSummary';
import PaymentConfirmation from './components/PaymentConfirmation';
import './components/styles.css';

function App() {
  return (
    <Router>
      <div className="App container">
        <h1 className="cta-form">Train Seat Booking System</h1>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/train-selection" element={<TrainSelection />} />
          <Route path="/train" element={<Train />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
