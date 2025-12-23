# Backend API for The Grocer Inventory Platform

This is a Flask-based backend that connects to the SQL Server database to fetch product hierarchy data.

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
   Note: You might need to install the ODBC Driver 17 for SQL Server on your system if not already installed.

2. **Environment Variables**:
   Set the database password as an environment variable for security:
   ```bash
   export DB_PASSWORD='your_password_here'
   ```
   (Or edit `config` dictionary in `app.py` directly for development)

3. **Run the Server**:
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`.

## Endpoints

- `GET /api/hierarchy`: Returns the nested product hierarchy structure used by the frontend.
- `GET /health`: Health check endpoint.

## Data Structure

The `/api/hierarchy` endpoint returns JSON in the following format:

```json
{
    "MacroCategory": {
        "Category": {
            "MicroCategory": ["Department1", "Department2"]
        }
    }
}
```
