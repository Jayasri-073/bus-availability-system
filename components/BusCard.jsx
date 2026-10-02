function BusCard({ bus }) {
  const handleBook = () => {
    alert("Bus selected successfully!");
  };

  return (
    <article className="bus-card">
      <div className="bus-top">
        <div>
          <h3>{bus.bus_name}</h3>
          <p className="bus-number">{bus.bus_number}</p>
        </div>
        <span className="bus-type">{bus.bus_type}</span>
      </div>

      <div className="route">
        <div>
          <p className="city">{bus.from_location}</p>
          <p className="time">{bus.departure_time}</p>
        </div>
        <div className="route-line"><span>🚌</span></div>
        <div className="right">
          <p className="city">{bus.to_location}</p>
          <p className="time">{bus.arrival_time}</p>
        </div>
      </div>

      <div className="bus-bottom">
        <p className="seats">{bus.available_seats} seats available</p>
        <p className="price">₹{bus.price}</p>
        <button className="btn btn-primary" onClick={handleBook}>Book Now</button>
      </div>
    </article>
  );
}

export default BusCard;
