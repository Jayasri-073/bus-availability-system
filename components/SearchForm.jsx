import { useState } from "react";
import { locations } from "../data/locations";

function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      setError("Please select From, To and Date.");
      return;
    }
    if (from === to) {
      setError("From and To locations cannot be the same.");
      return;
    }
    setError("");
    onSearch({ from, to, date });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="from">From</label>
        <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="">Select city</option>
          {locations.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="to">To</label>
        <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="">Select city</option>
          {locations.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="date">Date</label>
        <input id="date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-primary">Search Buses</button>

      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

export default SearchForm;
