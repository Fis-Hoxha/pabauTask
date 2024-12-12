
import Link from 'next/link';
async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store'})
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const Home: React.FC = async () => {

  const bookings = await getBookings()

  return (
    <div style={{
      backgroundColor: 'turquoise',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',  
      margin: 0,
      padding: '20px',
      boxSizing: 'border-box',  
    }}>
      <h1 style={{ color: 'white', marginBottom: '20px' }}>
        Current Booking Count: {bookings.length}
      </h1>
      <ul style={{ listStyleType: 'none', padding: 0, width: '100%', maxWidth: '600px' }}>
        {bookings.map((booking: any) => (
          <li key={booking.id} style={{
            padding: '15px',
            marginBottom: '10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #ddd',
          }}>
            <Link href={`/${booking.id}`} style={{
              color: 'blue',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}>
              A Booking on {booking.date}, starting at {booking.start_time}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/create">
        <button style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          border: 'none',
          backgroundColor: 'blue',
          color: 'white',
          borderRadius: '8px',
        }}>
          Make a Booking
        </button>
      </Link>
    </div>
  );
  

};

export default Home;
