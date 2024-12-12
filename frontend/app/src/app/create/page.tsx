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
        alert('Form submitted successfully!');
        setTimeout(() => {
          
          router.push('/'); 
        }, 1000);
      } else {
        const errorData = await res.text();
        setError(errorData); 
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again later.';
    
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      else if (error?.response) {
        const status = error.response.status;
        const errorDetail = error.response.data?.message || 'No details available';
        
        if (status === 400) {
          errorMessage = `Bad Request: ${errorDetail}`;
        } else if (status === 404) {
          errorMessage = `Not Found: ${errorDetail}`;
        } else if (status === 500) {
          errorMessage = `Server Error: ${errorDetail}`;
        } else {
          errorMessage = `Error ${status}: ${errorDetail}`;
        }
      }
      
      else if (error?.message) {
        errorMessage = `Network Error: ${error.message}`;
      }
    
      setError(errorMessage);
    }
  };

  return (
    <div style={{
        backgroundColor: 'turquoise',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        padding: 0
    }}> 
        <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            color: 'GrayText',
            width: '30%',
            minWidth: '300px'
        }}>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h1 style={{ color: '#333', fontSize: '24px' }}>Booking Form</h1>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>Service:</label>
                    <input
                        type="text"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            color: 'GrayText',
                            border: '1px solid #ccc',
                            outline: 'none'
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>Doctor Name:</label>
                    <input
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            color: 'GrayText',
                            border: '1px solid #ccc',
                            outline: 'none'
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>Start Time:</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            color: 'GrayText',
                            border: '1px solid #ccc',
                            outline: 'none'
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>End Time:</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            color: 'GrayText',
                            border: '1px solid #ccc',
                            outline: 'none'
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            color: 'GrayText',
                            border: '1px solid #ccc',
                            outline: 'none'
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: 'turquoise',
                        color: 'white',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    
                >
                    Submit Booking
                </button>
                <button
                    onClick={() => router.push('/')}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: 'turquoise',
                        color: 'white',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    
                >
                    Cancel Booking
                </button>
                
            </form>
        </div>
    </div>
);

};

export default BookingForm;
