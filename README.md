# The Grocer - Inventory Platform

A web-based inventory management system for The Grocer retail company to manage stock across multiple branches and integrate with e-commerce platforms (Instashop & Talabat). This project consists of a .NET 8 Web API backend and an Angular frontend, orchestrated via Docker Compose.

## 🎯 Features

### Core Functionality
- **Dashboard Overview**: Real-time metrics and system status
- **Capping Rules Management**: Hierarchical threshold configuration
- **File Upload System**: Excel/CSV file processing for branch inventory
- **Data Processing**: Automated transformation and export
- **Audit Logs**: Complete activity tracking and history
- **Branch Management**: Multi-branch configuration and monitoring

### Item Classification Hierarchy
The system supports four hierarchical levels for item classification:
1. **MacroCategory** (e.g., Fresh)
2. **Category** (e.g., Dairy)
3. **MicroCategory** (e.g., Cheese)
4. **Department** (e.g., Imported Cheese)

Each level can have its own capping threshold with priority-based override logic.

## 📁 Project Structure

```
E-Commerce/
├── backend_dotnet/     # .NET 8 Web API
├── frontend-angular/   # Angular 17+ Frontend
├── docker-compose.yml  # Docker orchestration
├── nginx.conf          # Nginx configuration for frontend
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running with Docker

1. Clone the repository:
   ```bash
   git clone git@github.com:johnsamey/Control-tower.git
   cd Control-tower
   ```

2. Build and run the containers:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - **Frontend**: http://localhost:80
   - **Backend API**: http://localhost:8080/api

### Manual Development Setup

#### Backend (.NET)
```bash
cd backend_dotnet
dotnet restore
dotnet run
```
Access Swagger UI at `http://localhost:5273/swagger` (if configured in dev environment).

#### Frontend (Angular)
```bash
cd frontend-angular
npm install
npm start
```
Access at `http://localhost:4200`.

## 💡 Usage Guide

### Managing Capping Rules
1. Navigate to **Capping Rules** section
2. Select classification level
3. Enter value name, threshold, and priority
4. Click "Add Rule"

### Uploading Files
1. Go to **Upload Files** section
2. Select the branch
3. Upload CSV/Excel inventory files
4. Process files

## 🤝 Contributing

This is an internal tool for The Grocer. For modifications or improvements:
1. Test thoroughly in development
2. Document all changes
3. Update this README if needed
4. Coordinate with the IT team

## 📝 License

Internal use only - The Grocer retail company

## 📞 Support

For technical support or questions:
- Contact: IT Department
- Email: it@thegrocer.com

## 🔄 Version History

- **v2.0.0** (2025-12-31)
  - Dockerized application (Frontend + Backend)
  - .NET 8 Backend API implementation
  - Angular Frontend integration
  - CSV Upload Endpoint added
- **v1.0.0** (2024-12-22)
  - Initial release
  - Core functionality implemented
  - Dashboard, rules, upload, processing, logs, branches
  - Responsive design
  - Modern UI/UX

---

**Built with ❤️ for The Grocer**
