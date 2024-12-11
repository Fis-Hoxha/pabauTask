import Link from 'next/link';


export default async function Details({ params }: { params: { id: number } }) {
  const { id } = params;


  const res = await fetch(`http://host.docker.internal:5000/api/booking/${id}`);
  if (!res.ok) {
    return <div>Booking not found...</div>;
  }

  const booking = await res.json();

  return (
    <div>
      <h1>Booking Details</h1>
      <p><strong>This booking is with:</strong> {booking.doctor_name} For {booking.service}  and it ends on {booking.end_time}  </p>
      <Link href="/">
      <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border: 'none', backgroundColor: 'blue', color: 'white' }}>
        Home
      </button>
    </Link>
    </div>
  );
}
