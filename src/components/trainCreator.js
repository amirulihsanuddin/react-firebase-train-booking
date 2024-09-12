import { ref, set } from 'firebase/database';
import { db } from '../firebase'; // Firebase configuration

// Function to create two trains for a selected date
export const createTrainsForDate = (date, origin, destination) => {
  const trainsRef = ref(db, `trains/${date}`);

  const trainData = {
    morningTrain: createTrainStructure('1234', '08:00 AM', '10:00 AM', origin, destination),
    eveningTrain: createTrainStructure('5678', '08:00 PM', '10:00 PM', origin, destination),
  };

  // Write the train data to Firebase
  set(trainsRef, trainData);
};

// Helper function to generate the structure of a train
const createTrainStructure = (trainNumber, departureTime, arrivalTime, origin, destination) => {
  const train = {
    trainNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
    coaches: {}
  };

  // Create 6 coaches, each with 20 seats
  for (let i = 1; i <= 6; i++) {
    train.coaches[i] = { seats: {} };
    for (let j = 1; j <= 20; j++) {
      train.coaches[i].seats[j] = { seatNumber: j, isBooked: false };
    }
  }

  return train;
};
