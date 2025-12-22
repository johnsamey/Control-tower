# The Grocer - Inventory Platform

A web-based inventory management system for The Grocer retail company to manage stock across multiple branches and integrate with e-commerce platforms (Instashop & Talabat).

## 🎯 Features

### Core Functionality
- **Dashboard Overview**: Real-time metrics and system status
- **Capping Rules Management**: Hierarchical threshold configuration
- **File Upload System**: Excel file processing for branch inventory
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
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with design system
├── app.js              # Application logic and functionality
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - pure HTML/CSS/JavaScript

### Installation

1. Clone or download the project files
2. Open `index.html` in your web browser
3. That's it! The application is ready to use

### Running Locally

Simply open the `index.html` file in your browser:
```bash
# Using Python's built-in server (optional)
python3 -m http.server 8000

# Or using Node.js http-server (optional)
npx http-server -p 8000
```

Then navigate to `http://localhost:8000`

## 💡 Usage Guide

### Managing Capping Rules

1. Navigate to **Capping Rules** section
2. Select classification level (MacroCategory, Category, MicroCategory, or Department)
3. Enter the value name and threshold
4. Set priority (1 = highest priority)
5. Click "Add Rule"

**Priority Logic**: Department > MicroCategory > Category > MacroCategory

### Uploading Files

1. Go to **Upload Files** section
2. Select the branch from the branch selector
3. Drag & drop Excel files or click to browse
4. Review uploaded files
5. Click "Process Files" to start processing

**Supported Formats**: `.xlsx`, `.xls`

### Processing Data

1. Navigate to **Processing** section
2. Configure export destinations (Instashop/Talabat)
3. Set schedule type (Hourly/Custom/Manual)
4. Click "Start Manual Processing" for immediate processing

### Viewing Logs

All system activities are automatically logged in the **Audit Logs** section, including:
- Rule additions/modifications/deletions
- File uploads
- Processing jobs
- System events

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (#667eea → #764ba2)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Components
- Responsive grid layout
- Animated transitions
- Interactive hover effects
- Modern card-based design
- Glassmorphism elements

## 🔧 Customization

### Adding New Branches

Edit the branch selector in `index.html`:
```html
<div class="branch-chip" data-branch="New Branch">New Branch</div>
```

### Modifying Colors

Update CSS variables in `styles.css`:
```css
:root {
    --primary-purple: #667eea;
    --success-green: #10b981;
    /* ... other variables */
}
```

### Extending Functionality

The modular JavaScript structure in `app.js` makes it easy to add new features:
- Add new sections in HTML
- Create corresponding functions in JS
- Update navigation in `initNavigation()`

## 📱 Responsive Design

The platform is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔐 Security Considerations

For production deployment, consider:
- Implementing user authentication
- Adding CSRF protection
- Validating file uploads server-side
- Encrypting sensitive data
- Using HTTPS

## 🚀 Future Enhancements

Potential features for future versions:
- Backend API integration
- Real-time data synchronization
- Advanced analytics dashboard
- Email notifications
- Multi-user support with roles
- Export to multiple formats (CSV, PDF)
- Automated scheduling system
- Mobile app version

## 📊 Business Logic

### Capping Rule Application

```
IF item_stock < threshold THEN
    item_availability = 0
ELSE
    item_availability = 1
END IF
```

### Priority Resolution

When multiple rules apply to an item:
1. Check Department-level rule (Priority 4)
2. Check MicroCategory-level rule (Priority 3)
3. Check Category-level rule (Priority 2)
4. Check MacroCategory-level rule (Priority 1)
5. Use the highest priority rule found

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

- **v1.0.0** (2024-12-22)
  - Initial release
  - Core functionality implemented
  - Dashboard, rules, upload, processing, logs, branches
  - Responsive design
  - Modern UI/UX

---

**Built with ❤️ for The Grocer**
