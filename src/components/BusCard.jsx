function BusCard({ bus }) {
  const handleBook = () => {
    alert("Bus selected successfully!");
  };

  return (
    <article className="bus-card">
      <div className="bus-top">
        <div>
          <h3>{bus.name}</h3>
          <p className="bus-number">{bus.number}</p>
        </div>
        <span className="bus-type">{bus.type}</span>
      </div>

      <div className="route">
        <div>
          <p className="city">{bus.from}</p>
          <p className="time">{bus.departure}</p>
        </div>
        <div className="route-line"><span>🚌</span></div>
        <div className="right">
          <p className="city">{bus.to}</p>
          <p className="time">{bus.arrival}</p>
        </div>
      </div>

      <div className="bus-bottom">
        <p className="seats">{bus.seats} seats available</p>
        <p className="price">₹{bus.price}</p>
        <button className="btn btn-primary" onClick={handleBook}>Book Now</button>
      </div>
    </article>
  );
}

export default BusCard;
