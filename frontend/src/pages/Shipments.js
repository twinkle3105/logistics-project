import React, { useState, useEffect } from 'react';
import { shipmentService, customerService, driverService, vehicleService } from '../services/api';

function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);
  const [formData, setFormData] = useState({
    trackingNumber: '',
    customerId: '',
    driverId: '',
    vehicleId: '',
    origin: '',
    destination: '',
    status: 'PENDING',
    weight: '',
    description: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [shipmentsRes, customersRes, driversRes, vehiclesRes] = await Promise.all([
        shipmentService.getAll(),
        customerService.getAll(),
        driverService.getAll(),
        vehicleService.getAll(),
      ]);
      setShipments(shipmentsRes.data);
      setCustomers(customersRes.data);
      setDrivers(driversRes.data);
      setVehicles(vehiclesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        trackingNumber: formData.trackingNumber || undefined,
        customer: { id: parseInt(formData.customerId) },
        driver: formData.driverId ? { id: parseInt(formData.driverId) } : null,
        vehicle: formData.vehicleId ? { id: parseInt(formData.vehicleId) } : null,
        origin: formData.origin,
        destination: formData.destination,
        status: formData.status,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        description: formData.description,
      };

      if (editingShipment) {
        await shipmentService.update(editingShipment.id, data);
      } else {
        await shipmentService.create(data);
      }
      setShowModal(false);
      setEditingShipment(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving shipment:', error);
      alert('Error saving shipment: ' + (error.response?.data?.message || error.message));
    }
  };

  const resetForm = () => {
    setFormData({
      trackingNumber: '',
      customerId: '',
      driverId: '',
      vehicleId: '',
      origin: '',
      destination: '',
      status: 'PENDING',
      weight: '',
      description: '',
    });
  };

  const handleEdit = (shipment) => {
    setEditingShipment(shipment);
    setFormData({
      trackingNumber: shipment.trackingNumber,
      customerId: shipment.customer?.id?.toString() || '',
      driverId: shipment.driver?.id?.toString() || '',
      vehicleId: shipment.vehicle?.id?.toString() || '',
      origin: shipment.origin,
      destination: shipment.destination,
      status: shipment.status,
      weight: shipment.weight?.toString() || '',
      description: shipment.description || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      try {
        await shipmentService.delete(id);
        loadData();
      } catch (error) {
        console.error('Error deleting shipment:', error);
        alert('Error deleting shipment');
      }
    }
  };

  const openNewModal = () => {
    setEditingShipment(null);
    resetForm();
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const statusClass = `status-badge status-${status.toLowerCase().replace('_', '-')}`;
    return <span className={statusClass}>{status}</span>;
  };

  if (loading) {
    return <div className="loading">Loading shipments...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h2>Shipments</h2>
        <button className="btn btn-primary" onClick={openNewModal}>
          Create New Shipment
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Tracking #</th>
              <th>Customer</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>Weight (kg)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>
                  No shipments found
                </td>
              </tr>
            ) : (
              shipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>{shipment.trackingNumber}</td>
                  <td>{shipment.customer?.name || 'N/A'}</td>
                  <td>{shipment.origin}</td>
                  <td>{shipment.destination}</td>
                  <td>{shipment.driver?.name || 'Unassigned'}</td>
                  <td>{shipment.vehicle?.registrationNumber || 'Unassigned'}</td>
                  <td>{shipment.weight || 'N/A'}</td>
                  <td>{getStatusBadge(shipment.status)}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEdit(shipment)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(shipment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingShipment ? 'Edit Shipment' : 'Create New Shipment'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tracking Number</label>
                <input
                  type="text"
                  value={formData.trackingNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, trackingNumber: e.target.value })
                  }
                  placeholder="Auto-generated if left empty"
                  disabled={!!editingShipment}
                />
              </div>
              <div className="form-group">
                <label>Customer *</label>
                <select
                  value={formData.customerId}
                  onChange={(e) =>
                    setFormData({ ...formData, customerId: e.target.value })
                  }
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Origin *</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) =>
                    setFormData({ ...formData, origin: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Destination *</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Driver</label>
                <select
                  value={formData.driverId}
                  onChange={(e) =>
                    setFormData({ ...formData, driverId: e.target.value })
                  }
                >
                  <option value="">Select Driver (Optional)</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Vehicle</label>
                <select
                  value={formData.vehicleId}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleId: e.target.value })
                  }
                >
                  <option value="">Select Vehicle (Optional)</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.registrationNumber} ({vehicle.type}) - {vehicle.status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  required
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_TRANSIT">In Transit</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingShipment ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shipments;
