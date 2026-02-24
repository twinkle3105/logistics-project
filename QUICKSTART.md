# Quick Start Guide

This guide will help you get the Logistics Management System up and running quickly.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Java 17+ installed (`java -version`)
- ✅ Maven 3.6+ installed (`mvn -version`)
- ✅ Node.js 16+ installed (`node -version`)
- ✅ MySQL 8.0+ running

## 5-Minute Setup

### Step 1: Database Setup (1 minute)

```bash
# Login to MySQL
mysql -u root -p

# Run the setup script
source database/setup.sql

# Or manually create the database
CREATE DATABASE logistics_db;
```

### Step 2: Start Backend (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies and start server
mvn spring-boot:run
```

Wait for the message: "Started LogisticsApplication in X.XXX seconds"
Backend will be available at: http://localhost:8080

### Step 3: Start Frontend (2 minutes)

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Browser will automatically open at: http://localhost:3000

## Verify Installation

1. Open http://localhost:3000 in your browser
2. You should see the Logistics Management System dashboard
3. Try creating a customer from the Customers page
4. Check the dashboard to see the statistics update

## Default Configuration

### Database
- Host: localhost:3306
- Database: logistics_db
- Username: root
- Password: root

### Servers
- Backend API: http://localhost:8080
- Frontend: http://localhost:3000

## Troubleshooting

### Backend won't start
- Check if MySQL is running: `systemctl status mysql` or `brew services list | grep mysql`
- Verify database credentials in `backend/src/main/resources/application.properties`
- Check if port 8080 is available: `lsof -i :8080`

### Frontend won't start
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 3000 is available: `lsof -i :3000`

### Database connection issues
- Ensure MySQL is running
- Update username/password in application.properties
- Grant permissions: `GRANT ALL PRIVILEGES ON logistics_db.* TO 'root'@'localhost';`

## Next Steps

1. **Add Customers**: Navigate to Customers page and click "Add New Customer"
2. **Register Drivers**: Go to Drivers page to add driver information
3. **Register Vehicles**: Add vehicles in the Vehicles section
4. **Create Shipments**: Create shipments and assign them to drivers and vehicles
5. **Track Status**: Update shipment status as they progress through delivery

## Sample Data

You can quickly test the system by creating:
- 2-3 customers
- 2-3 drivers
- 2-3 vehicles
- Create shipments and assign resources

## API Testing

You can also test the API directly:

```bash
# Get all customers
curl http://localhost:8080/api/customers

# Create a customer
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"1234567890","address":"123 Main St"}'
```

## Need Help?

- Check the main README.md for detailed documentation
- Review the API endpoints section
- Check backend logs in the terminal where Spring Boot is running
- Check browser console for frontend errors

Enjoy using the Logistics Management System! 🚚📦
