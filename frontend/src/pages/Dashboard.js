import React, { useState, useEffect } from 'react';
import { customerService, driverService, vehicleService, shipmentService } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalDrivers: 0,
    totalVehicles: 0,
    totalShipments: 0,
    pendingShipments: 0,
    inTransitShipments: 0,
    deliveredShipments: 0,
    availableDrivers: 0,
    availableVehicles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [customers, drivers, vehicles, shipments] = await Promise.all([
        customerService.getAll(),
        driverService.getAll(),
        vehicleService.getAll(),
        shipmentService.getAll(),
      ]);

      const pendingShipments = shipments.data.filter(s => s.status === 'PENDING').length;
      const inTransitShipments = shipments.data.filter(s => s.status === 'IN_TRANSIT').length;
      const deliveredShipments = shipments.data.filter(s => s.status === 'DELIVERED').length;
      const availableDrivers = drivers.data.filter(d => d.status === 'AVAILABLE').length;
      const availableVehicles = vehicles.data.filter(v => v.status === 'AVAILABLE').length;

      setStats({
        totalCustomers: customers.data.length,
        totalDrivers: drivers.data.length,
        totalVehicles: vehicles.data.length,
        totalShipments: shipments.data.length,
        pendingShipments,
        inTransitShipments,
        deliveredShipments,
        availableDrivers,
        availableVehicles,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Overview of logistics operations</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Customers</h3>
          <div className="stat-value">{stats.totalCustomers}</div>
        </div>
        <div className="stat-card">
          <h3>Total Drivers</h3>
          <div className="stat-value">{stats.totalDrivers}</div>
        </div>
        <div className="stat-card">
          <h3>Total Vehicles</h3>
          <div className="stat-value">{stats.totalVehicles}</div>
        </div>
        <div className="stat-card">
          <h3>Total Shipments</h3>
          <div className="stat-value">{stats.totalShipments}</div>
        </div>
      </div>

      <h3>Shipment Status</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Pending</h3>
          <div className="stat-value">{stats.pendingShipments}</div>
        </div>
        <div className="stat-card">
          <h3>In Transit</h3>
          <div className="stat-value">{stats.inTransitShipments}</div>
        </div>
        <div className="stat-card">
          <h3>Delivered</h3>
          <div className="stat-value">{stats.deliveredShipments}</div>
        </div>
      </div>

      <h3>Resource Availability</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Available Drivers</h3>
          <div className="stat-value">{stats.availableDrivers}</div>
        </div>
        <div className="stat-card">
          <h3>Available Vehicles</h3>
          <div className="stat-value">{stats.availableVehicles}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
