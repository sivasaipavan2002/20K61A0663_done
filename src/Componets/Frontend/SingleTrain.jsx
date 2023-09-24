import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleTrain() {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    async function fetchTrainData() {
      try {
        const response = await axios.get(`http://20.244.56.144/train/trains/${trainNumber}`);
        setTrain(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setTrain(null);
      }
    }

    fetchTrainData();
  }, [trainNumber]);

  return (
    <div>
      {train ? (
        <div>
          <h1>{train.trainName}</h1>
          <p>Train Number: {train.trainNumber}</p>
          {train.departureTime ? (
            <p>Departure Time: {`${train.departureTime.Hours}:${train.departureTime.Minutes}`}</p>
          ) : (
            <p>Departure Time: N/A</p>
          )}
          <p>Seats Available (Sleeper): {train.seatsAvailable?.sleeper}</p>
          <p>Seats Available (AC): {train.seatsAvailable?.AC}</p>
          <p>Price (Sleeper): {train.price?.sleeper}</p>
          <p>Price (AC): {train.price?.AC}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleTrain;
