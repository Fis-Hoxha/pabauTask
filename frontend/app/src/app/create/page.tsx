'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BookingForm = () => {
  const [service, setService] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = { service, doctor_name: doctorName, start_time: startTime, end_time: endTime, date };
    console.log(bookingData);

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        router.push('/'); 
      } else {
        const errorData = await res.text();
        setError(errorData); 
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Booking Form</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Service:</label>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>
        <div>
          <label>Doctor Name:</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
