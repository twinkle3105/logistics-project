# Mini Logistics Management System

A full-stack logistics management system built with React, Spring Boot, and MySQL.

## Features

- **Customer Management**: Add, edit, delete, and view customers
- **Driver Management**: Manage driver information and availability status
- **Vehicle Management**: Track vehicles, their types, and availability
- **Shipment Management**: Create and track shipments with real-time status updates
- **Dashboard**: Overview of all logistics operations with statistics

## Technology Stack

### Backend
- Spring Boot 3.1.5
- Java 17
- MySQL 8.0
- Maven
- Spring Data JPA
- Hibernate

### Frontend
- React 18.2.0
- React Router 6.20.0
- Axios 1.6.2
- CSS3

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## Setup Instructions

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE logistics_db;
```

The application will automatically create the required tables on startup.

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Update database credentials in `src/main/resources/application.properties` if needed:

```properties
spring.datasource.username=root
spring.datasource.password=root
```

Build and run the Spring Boot application:

```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer

### Drivers
- `GET /api/drivers` - Get all drivers
- `GET /api/drivers/{id}` - Get driver by ID
- `GET /api/drivers/status/{status}` - Get drivers by status
- `POST /api/drivers` - Create new driver
- `PUT /api/drivers/{id}` - Update driver
- `DELETE /api/drivers/{id}` - Delete driver

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/{id}` - Get vehicle by ID
- `GET /api/vehicles/status/{status}` - Get vehicles by status
- `POST /api/vehicles` - Create new vehicle
- `PUT /api/vehicles/{id}` - Update vehicle
- `DELETE /api/vehicles/{id}` - Delete vehicle

### Shipments
- `GET /api/shipments` - Get all shipments
- `GET /api/shipments/{id}` - Get shipment by ID
- `GET /api/shipments/tracking/{trackingNumber}` - Get shipment by tracking number
- `GET /api/shipments/status/{status}` - Get shipments by status
- `POST /api/shipments` - Create new shipment
- `PUT /api/shipments/{id}` - Update shipment
- `DELETE /api/shipments/{id}` - Delete shipment

## Usage

1. **Access the application**: Open your browser and navigate to `http://localhost:3000`

2. **Manage Customers**: Navigate to the Customers page to add new customers

3. **Manage Drivers**: Add drivers with their license information and status

4. **Manage Vehicles**: Register vehicles with their registration numbers and types

5. **Create Shipments**: Create new shipments by selecting a customer, assigning drivers and vehicles, and setting origin/destination

6. **Track Shipments**: Monitor shipment status from PENDING → IN_TRANSIT → DELIVERED

7. **Dashboard**: View real-time statistics of your logistics operations

## Project Structure

```
logistics-project/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/logistics/
│   │       │   ├── controller/      # REST Controllers
│   │       │   ├── model/          # JPA Entities
│   │       │   ├── repository/     # JPA Repositories
│   │       │   ├── service/        # Business Logic
│   │       │   ├── config/         # Configuration
│   │       │   └── LogisticsApplication.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   ├── pages/              # Page Components
    │   ├── services/           # API Services
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Status Values

### Driver Status
- `AVAILABLE` - Driver is available for assignments
- `BUSY` - Driver is currently on a delivery
- `OFF_DUTY` - Driver is not working

### Vehicle Status
- `AVAILABLE` - Vehicle is available for use
- `IN_USE` - Vehicle is currently being used
- `MAINTENANCE` - Vehicle is under maintenance

### Shipment Status
- `PENDING` - Shipment is created but not yet dispatched
- `IN_TRANSIT` - Shipment is on the way
- `DELIVERED` - Shipment has been delivered
- `CANCELLED` - Shipment has been cancelled

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
