import React from 'react';

const Seat = ({ seatNumber, isBooked, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isBooked ? 'red' : 'green',
        margin: '6px',
        padding: '12px',
        border: '1px solid #ccc',
        cursor: isBooked ? 'not-allowed' : 'pointer',
      }}
      disabled={isBooked}
    >
      {seatNumber}
    </button>
  );
};

export default Seat;
