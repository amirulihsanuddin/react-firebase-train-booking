import React from 'react';
import Seat from './Seat';

const Coach = ({ coachNumber, seats, handleSeatClick }) => {
  return (
    <div>
      <h3>Coach {coachNumber}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.keys(seats).map((seatKey) => {
          const seat = seats[seatKey];
          return (
            <Seat
              key={seat.seatNumber}
              seatNumber={seat.seatNumber}
              isBooked={seat.isBooked}
              handleClick={() => handleSeatClick(seat.seatNumber)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Coach;
