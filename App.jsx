import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import BusCard from "./components/BusCard";
import { supabase } from "./lib/supabaseClient";

function App() {
  const [results, setResults] = useState(null); // null = not searched yet
  const [searchInfo, setSearchInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async ({ from, to, date }) => {
    if (!supabase) {
      setError("Supabase is not configured. Check your environment variables.");
      return;
    }

    setLoading(true);
    setError("");

    // Ask Supabase for buses matching From, To and Date
    const { data, error: queryError } = await supabase
      .from("buses")
      .select("*")
      .eq("from_location", from)
      .eq("to_location", to)
      .eq("travel_date", date)
      .order("price", { ascending: true });

    setLoading(false);

    if (queryError) {
      setError("Could not load buses. Please try again.");
      return;
    }

    setResults(data);
    setSearchInfo({ from, to, date });
  };

  return (
    <>
      <Navbar />

      <section className="hero" id="home">
        <div className="hero-text">
          <h1>Find Your Bus</h1>
          <p>Search and find available buses easily.</p>
        </div>
        <div className="road" aria-hidden="true">
          <span className="road-bus">🚌</span>
        </div>
      </section>

      <main className="container" id="search">
        <SearchForm onSearch={handleSearch} />

        {loading && <p className="status">Searching buses...</p>}
        {error && <p className="status status-error">{error}</p>}

        {!loading && results !== null && (
          <section className="results">
            <h2>
              {searchInfo.from} to {searchInfo.to} on {searchInfo.date}
            </h2>

            {results.length === 0 ? (
              <p className="no-results">No buses available for this route.</p>
            ) : (
              <div className="bus-list">
                {results.map((bus) => (
                  <BusCard key={bus.id} bus={bus} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">Bus Availability System · React + Supabase</footer>
    </>
  );
}

export default App;
