import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import BusCard from "./components/BusCard";
import { buses } from "./data/buses";

function App() {
  // null = user has not searched yet
  const [results, setResults] = useState(null);
  const [searchInfo, setSearchInfo] = useState(null);

  const handleSearch = ({ from, to, date }) => {
    const matches = buses.filter((bus) => bus.from === from && bus.to === to);
    setResults(matches);
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

        {results !== null && (
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

      <footer className="footer">Bus Availability System · Frontend project</footer>
    </>
  );
}

export default App;
