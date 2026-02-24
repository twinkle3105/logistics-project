import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Drivers from './pages/Drivers';
import Vehicles from './pages/Vehicles';
import Shipments from './pages/Shipments';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">
            <h1>📦 Logistics Management System</h1>
          </div>
          <ul className="nav-menu">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/drivers">Drivers</Link></li>
            <li><Link to="/vehicles">Vehicles</Link></li>
            <li><Link to="/shipments">Shipments</Link></li>
          </ul>
        </nav>
        
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/shipments" element={<Shipments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
