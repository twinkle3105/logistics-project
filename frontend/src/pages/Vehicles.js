import React, { useState, useEffect } from 'react';
import { vehicleService } from '../services/api';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    registrationNumber: '',
    type: 'TRUCK',
    model: '',
    capacity: '',
    status: 'AVAILABLE',
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await vehicleService.getAll();
      setVehicles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading vehicles:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        capacity: parseFloat(formData.capacity),
      };
      if (editingVehicle) {
        await vehicleService.update(editingVehicle.id, data);
      } else {
        await vehicleService.create(data);
      }
      setShowModal(false);
      setEditingVehicle(null);
      setFormData({
        registrationNumber: '',
        type: 'TRUCK',
        model: '',
        capacity: '',
        status: 'AVAILABLE',
      });
      loadVehicles();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      alert('Error saving vehicle');
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      registrationNumber: vehicle.registrationNumber,
      type: vehicle.type,
      model: vehicle.model,
      capacity: vehicle.capacity?.toString() || '',
      status: vehicle.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehicleService.delete(id);
        loadVehicles();
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        alert('Error deleting vehicle');
      }
    }
  };

  const openNewModal = () => {
    setEditingVehicle(null);
    setFormData({
      registrationNumber: '',
      type: 'TRUCK',
      model: '',
      capacity: '',
      status: 'AVAILABLE',
    });
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const statusClass = `status-badge status-${status.toLowerCase().replace('_', '-')}`;
    return <span className={statusClass}>{status}</span>;
  };

  if (loading) {
    return <div className="loading">Loading vehicles...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h2>Vehicles</h2>
        <button className="btn btn-primary" onClick={openNewModal}>
          Add New Vehicle
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Registration</th>
              <th>Type</th>
              <th>Model</th>
              <th>Capacity (tons)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  No vehicles found
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.registrationNumber}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.capacity || 'N/A'}</td>
                  <td>{getStatusBadge(vehicle.status)}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEdit(vehicle)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(vehicle.id)}
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
            <h3>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Registration Number *</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, registrationNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                >
                  <option value="TRUCK">Truck</option>
                  <option value="VAN">Van</option>
                  <option value="BIKE">Bike</option>
                </select>
              </div>
              <div className="form-group">
                <label>Model *</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Capacity (tons)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
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
                  <option value="AVAILABLE">Available</option>
                  <option value="IN_USE">In Use</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
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
                  {editingVehicle ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vehicles;
