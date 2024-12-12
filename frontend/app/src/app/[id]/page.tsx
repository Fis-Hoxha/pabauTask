import Link from 'next/link';


export default async function Details({ params }: { params: { id: number } }) {
  const { id } = params;


  const res = await fetch(`http://host.docker.internal:5000/api/booking/${id}`);
  if (!res.ok) {
    return <div>Booking not found...</div>;
  }

  const booking = await res.json();

  return (
    <div style={{
        backgroundColor: 'turquoise',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        color: 'white'
    }}>
        <div style={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            width: '50%',
            textAlign: 'center'
        }}>
            <h1 style={{ marginBottom: '20px', color: 'GrayText' }}>Booking Details</h1>
            <p style={{ marginBottom: '10px' }}><strong>Booking ID:</strong> {booking.id}</p>
            <p style={{ marginBottom: '10px' }}><strong>This booking is with:</strong> {booking.doctor_name}</p>
            <p style={{ marginBottom: '10px' }}><strong>Service:</strong> {booking.service}</p>
            <p style={{ marginBottom: '10px' }}><strong>Ends At:</strong> {booking.end_time}</p>
        </div>
        <Link href="/">
            <button style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'blue',
                color: 'white',
                borderRadius: '8px'
            }}>
                Home
            </button>
        </Link>
    </div>
);
}
