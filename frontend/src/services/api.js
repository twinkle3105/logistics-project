import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customerService = {
  getAll: () => api.get('/customers'),
  getById: (id) => api.get(`/customers/${id}`),
  create: (customer) => api.post('/customers', customer),
  update: (id, customer) => api.put(`/customers/${id}`, customer),
  delete: (id) => api.delete(`/customers/${id}`),
};

export const driverService = {
  getAll: () => api.get('/drivers'),
  getById: (id) => api.get(`/drivers/${id}`),
  getByStatus: (status) => api.get(`/drivers/status/${status}`),
  create: (driver) => api.post('/drivers', driver),
  update: (id, driver) => api.put(`/drivers/${id}`, driver),
  delete: (id) => api.delete(`/drivers/${id}`),
};

export const vehicleService = {
  getAll: () => api.get('/vehicles'),
  getById: (id) => api.get(`/vehicles/${id}`),
  getByStatus: (status) => api.get(`/vehicles/status/${status}`),
  create: (vehicle) => api.post('/vehicles', vehicle),
  update: (id, vehicle) => api.put(`/vehicles/${id}`, vehicle),
  delete: (id) => api.delete(`/vehicles/${id}`),
};

export const shipmentService = {
  getAll: () => api.get('/shipments'),
  getById: (id) => api.get(`/shipments/${id}`),
  getByTrackingNumber: (trackingNumber) => api.get(`/shipments/tracking/${trackingNumber}`),
  getByStatus: (status) => api.get(`/shipments/status/${status}`),
  create: (shipment) => api.post('/shipments', shipment),
  update: (id, shipment) => api.put(`/shipments/${id}`, shipment),
  delete: (id) => api.delete(`/shipments/${id}`),
};

export default api;
