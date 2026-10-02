function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#home" className="logo">🚌 Bus Availability System</a>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#search">Search Buses</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
