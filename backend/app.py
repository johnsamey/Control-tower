from flask import Flask, jsonify
from flask_cors import CORS
import pyodbc
import os

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Database Configuration
config = {
    'server': '15.237.247.18',
    'database': 'Retail',
    'username': 'sa',
    # getting password from environment variable for security, or fallback to empty string if not set
    'password': 'Gr0c3r!StrongSA@Pass2025'
}

def sql_connect():
    """Create SQL Server connection."""
    try:
        conn = pyodbc.connect(
            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
            f"SERVER={config['server']};"
            f"DATABASE={config['database']};"
            f"UID={config['username']};"
            f"PWD={config['password']};"
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

@app.route('/api/hierarchy', methods=['GET'])
def get_hierarchy():
    conn = sql_connect()
    if not conn:
        return jsonify({"error": "Failed to connect to database"}), 500

    cursor = conn.cursor()
    
    query = """
    select c.a_name,c.l_name,s.a_name,s.l_name,g.a_name,g.l_name,sg.a_name,sg.l_name
    from sys_itemclass c
    Join sys_section s on s.itemClass = c.itemclass
    JOIN sys_group g on g.section = s.section
    JOIN sys_subgroup sg on sg.itemgroup = g.itemgroup
    """
    
    try:
        cursor.execute(query)
        rows = cursor.fetchall()
        
        # Transform flat rows into nested hierarchy
        hierarchy = {}
        
        for row in rows:
            # Row structure: 
            # 0: c.a_name (MacroCategory)
            # 1: c.l_name
            # 2: s.a_name (Category)
            # 3: s.l_name
            # 4: g.a_name (MicroCategory)
            # 5: g.l_name
            # 6: sg.a_name (Department)
            # 7: sg.l_name
            
            macro_cat = row[0]
            category = row[2]
            micro_cat = row[4]
            department = row[6]
            
            # Initialize MacroCategory
            if macro_cat not in hierarchy:
                hierarchy[macro_cat] = {}
            
            # Initialize Category
            if category not in hierarchy[macro_cat]:
                hierarchy[macro_cat][category] = {}
                
            # Initialize MicroCategory
            if micro_cat not in hierarchy[macro_cat][category]:
                hierarchy[macro_cat][category][micro_cat] = []
                
            # Add Department if not exists
            if department not in hierarchy[macro_cat][category][micro_cat]:
                hierarchy[macro_cat][category][micro_cat].append(department)
                
        return jsonify(hierarchy)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
