import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Trains() {
  const [trains, setTrains] = useState([]);
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU0NTI3MDAsImNvbXBhbnlOYW1lIjoiVHJhaW5DZW50cmFsIiwiY2xpZW50SUQiOiI5Yjk4YjRlNS1hNTA5LTRlNGMtOWI1YS1mMWMwOTQ0MTg4ZTYiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiMzMzIn0._rj-GYO8Yd_Si5m-PPhzoxNeOLATxDv6ATCboWMRCjw"

  useEffect(() => {
    const apiUrl = 'http://20.244.56.144/train/trains';

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios.get(apiUrl, axiosConfig)
      .then((response) => {
        const filteredTrains = response.data.filter(train => !train.delayedBy || train.delayedBy >= 30);

        const sortedTrains = filteredTrains.sort((a, b) => {
          const priceDiff = a.price.sleeper - b.price.sleeper;
          if (priceDiff !== 0) {
            return priceDiff;
          }

          const ticketsDiff = b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
          if (ticketsDiff !== 0) {
            return ticketsDiff;
          }

          const departureTimeA = (a.departureTime.Hours * 60 + a.departureTime.Minutes) + (a.delayedBy || 0);
          const departureTimeB = (b.departureTime.Hours * 60 + b.departureTime.Minutes) + (b.delayedBy || 0);
          return departureTimeB - departureTimeA;
        });

        setTrains(sortedTrains);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [accessToken]);

  return (
    <div>
      <h1>All Trains</h1>
      {Array.isArray(trains) && trains.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Train Name</th>
              <th>Train Number</th>
              <th>Departure Time</th>
              <th>Seats Available (Sleeper)</th>
              <th>Price (Sleeper)</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train) => (
              <tr key={train.trainNumber}>
                <td>{train.trainName}</td>
                <td>{train.trainNumber}</td>
                <td>{`${train.departureTime.Hours}:${train.departureTime.Minutes}`}</td>
                <td>{train.seatsAvailable.sleeper}</td>
                <td>{train.price.sleeper}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No train data available.</p>
      )}
    </div>
  );
}

export default Trains;
