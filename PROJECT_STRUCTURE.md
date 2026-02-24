# Project Structure

This document provides an overview of the Mini Logistics Management System project structure.

## Root Directory
```
logistics-project/
├── backend/              # Spring Boot backend application
├── frontend/             # React frontend application
├── database/             # Database setup scripts
├── README.md            # Main documentation
├── QUICKSTART.md        # Quick start guide
└── .gitignore          # Git ignore rules
```

## Backend Structure (Spring Boot)

```
backend/
├── src/
│   └── main/
│       ├── java/com/logistics/
│       │   ├── LogisticsApplication.java          # Main application entry point
│       │   ├── config/                            # Configuration classes
│       │   │   └── CorsConfig.java               # CORS configuration
│       │   ├── controller/                        # REST API controllers
│       │   │   ├── CustomerController.java       # Customer endpoints
│       │   │   ├── DriverController.java         # Driver endpoints
│       │   │   ├── VehicleController.java        # Vehicle endpoints
│       │   │   └── ShipmentController.java       # Shipment endpoints
│       │   ├── model/                            # JPA entities
│       │   │   ├── Customer.java                 # Customer entity
│       │   │   ├── Driver.java                   # Driver entity
│       │   │   ├── Vehicle.java                  # Vehicle entity
│       │   │   └── Shipment.java                 # Shipment entity
│       │   ├── repository/                       # Data access layer
│       │   │   ├── CustomerRepository.java       # Customer repository
│       │   │   ├── DriverRepository.java         # Driver repository
│       │   │   ├── VehicleRepository.java        # Vehicle repository
│       │   │   └── ShipmentRepository.java       # Shipment repository
│       │   ├── service/                          # Business logic layer
│       │   │   ├── CustomerService.java          # Customer service
│       │   │   ├── DriverService.java            # Driver service
│       │   │   ├── VehicleService.java           # Vehicle service
│       │   │   └── ShipmentService.java          # Shipment service
│       │   └── exception/                        # Exception handling
│       │       ├── ResourceNotFoundException.java
│       │       └── GlobalExceptionHandler.java
│       └── resources/
│           └── application.properties            # Application configuration
└── pom.xml                                       # Maven configuration
```

## Frontend Structure (React)

```
frontend/
├── public/
│   └── index.html                                # HTML template
├── src/
│   ├── pages/                                    # Page components
│   │   ├── Dashboard.js                         # Dashboard with statistics
│   │   ├── Customers.js                         # Customer management
│   │   ├── Drivers.js                           # Driver management
│   │   ├── Vehicles.js                          # Vehicle management
│   │   └── Shipments.js                         # Shipment management
│   ├── services/
│   │   └── api.js                               # API service layer
│   ├── App.js                                    # Main app component
│   ├── App.css                                   # Application styles
│   └── index.js                                  # React entry point
├── .env                                          # Environment variables
└── package.json                                  # NPM dependencies
```

## Database Structure

```
database/
└── setup.sql                                     # Database initialization script
```

## Key Technologies

### Backend
- **Spring Boot 3.1.5**: Framework for building Java applications
- **Spring Data JPA**: Data access abstraction
- **Hibernate**: ORM for database operations
- **MySQL Connector**: Database driver
- **Lombok**: Reduces boilerplate code
- **Maven**: Build and dependency management

### Frontend
- **React 18.2.0**: UI library
- **React Router 6.20.0**: Client-side routing
- **Axios 1.6.2**: HTTP client
- **CSS3**: Styling

### Database
- **MySQL 8.0+**: Relational database

## API Architecture

### REST API Pattern
All API endpoints follow REST conventions:
- `GET /api/{resource}` - List all resources
- `GET /api/{resource}/{id}` - Get specific resource
- `POST /api/{resource}` - Create new resource
- `PUT /api/{resource}/{id}` - Update existing resource
- `DELETE /api/{resource}/{id}` - Delete resource

### Response Format
Success responses return JSON:
```json
{
  "id": 1,
  "name": "Example",
  ...
}
```

Error responses include details:
```json
{
  "timestamp": "2024-01-01T12:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Resource not found with id: 1"
}
```

## Data Flow

1. **User Interaction**: User interacts with React frontend
2. **API Call**: Frontend makes HTTP request via Axios
3. **Controller**: Spring Boot controller receives request
4. **Service**: Business logic is executed in service layer
5. **Repository**: Data access through JPA repository
6. **Database**: MySQL stores/retrieves data
7. **Response**: Data flows back through the layers to frontend
8. **UI Update**: React updates the UI with new data

## Security Features

- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Bean validation on entities
- **Exception Handling**: Centralized error handling
- **No SQL Injection**: JPA parameterized queries
- **No Vulnerabilities**: Passed CodeQL security scan

## Configuration

### Backend Configuration
Located in `backend/src/main/resources/application.properties`:
- Database connection settings
- JPA/Hibernate configuration
- Server port configuration

### Frontend Configuration
Located in `frontend/.env`:
- API base URL
- Environment-specific settings

## Build and Deployment

### Backend Build
```bash
cd backend
mvn clean package
java -jar target/logistics-management-1.0.0.jar
```

### Frontend Build
```bash
cd frontend
npm run build
# Serves static files from the build/ directory
```

## Development Workflow

1. Start MySQL database
2. Run backend: `mvn spring-boot:run`
3. Run frontend: `npm start`
4. Make changes and test
5. Commit and push changes

## Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Extensibility

The system is designed for easy extension:
- Add new entities in the `model` package
- Create corresponding repositories
- Implement services for business logic
- Add controllers for API endpoints
- Create React pages for UI
- Update routing in App.js

## Performance Considerations

- Database indices on foreign keys
- Lazy loading for relationships
- Pagination support in repositories
- React component optimization
- CSS bundling and minification

## Maintenance

- Regular dependency updates
- Database backups
- Log monitoring
- Performance profiling
- Security audits
