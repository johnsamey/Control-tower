// ===================================
// Application State
// ===================================
const AppState = {
    currentSection: 'dashboard',
    selectedBranch: 'Garden 8',
    uploadedFiles: [],
    rules: []
};

// ===================================
// Hierarchical Product Data Structure
// ===================================
const ProductHierarchy = {
    "Fresh": {
        "Dairy": {
            "Cheese": ["Imported Cheese", "Local Cheese", "Soft Cheese"],
            "Milk": ["Fresh Milk", "UHT Milk", "Flavored Milk"],
            "Yogurt": ["Greek Yogurt", "Regular Yogurt", "Drinking Yogurt"]
        },
        "Fruits": {
            "Citrus": ["Oranges", "Lemons", "Grapefruits"],
            "Tropical": ["Mangoes", "Pineapples", "Bananas"],
            "Berries": ["Strawberries", "Blueberries", "Raspberries"]
        },
        "Vegetables": {
            "Leafy Greens": ["Lettuce", "Spinach", "Kale"],
            "Root Vegetables": ["Carrots", "Potatoes", "Onions"],
            "Herbs": ["Parsley", "Cilantro", "Mint"]
        }
    },
    "Frozen": {
        "Frozen Vegetables": {
            "Mixed Vegetables": ["Peas & Carrots", "Stir Fry Mix", "Soup Mix"],
            "Single Vegetables": ["Green Peas", "Corn", "Green Beans"]
        },
        "Frozen Meat": {
            "Chicken": ["Chicken Breasts", "Chicken Wings", "Whole Chicken"],
            "Beef": ["Ground Beef", "Beef Steaks", "Beef Cubes"]
        },
        "Ice Cream": {
            "Premium": ["Häagen-Dazs", "Ben & Jerry's", "Magnum"],
            "Regular": ["Local Brands", "Store Brand"]
        }
    },
    "Grocery": {
        "Pasta & Rice": {
            "Pasta": ["Spaghetti", "Penne", "Fusilli"],
            "Rice": ["Basmati Rice", "Egyptian Rice", "Brown Rice"]
        },
        "Canned Goods": {
            "Vegetables": ["Canned Tomatoes", "Canned Corn", "Canned Beans"],
            "Fruits": ["Canned Peaches", "Canned Pineapple", "Fruit Cocktail"]
        },
        "Oils & Sauces": {
            "Cooking Oils": ["Olive Oil", "Sunflower Oil", "Corn Oil"],
            "Sauces": ["Tomato Sauce", "Soy Sauce", "Hot Sauce"]
        }
    },
    "Beverages": {
        "Soft Drinks": {
            "Carbonated": ["Cola", "Lemon-Lime", "Orange Soda"],
            "Juice": ["Orange Juice", "Apple Juice", "Mixed Fruit"]
        },
        "Water": {
            "Still Water": ["Local Brands", "Imported Brands"],
            "Sparkling Water": ["Plain", "Flavored"]
        }
    }
};

// ===================================
// Navigation Handler
// ===================================
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));

            // Remove active class from all sections
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');

            // Show corresponding section
            const section = item.getAttribute('data-section');
            const sectionElement = document.getElementById(section);

            if (sectionElement) {
                sectionElement.classList.add('active');
                AppState.currentSection = section;
            }
        });
    });
}

// ===================================
// Hierarchical Dropdown Functions
// ===================================
function getMacroCategories() {
    return Object.keys(ProductHierarchy);
}

function getCategories(macroCategory) {
    if (!macroCategory || !ProductHierarchy[macroCategory]) return [];
    return Object.keys(ProductHierarchy[macroCategory]);
}

function getMicroCategories(macroCategory, category) {
    if (!macroCategory || !category || !ProductHierarchy[macroCategory] || !ProductHierarchy[macroCategory][category]) return [];
    return Object.keys(ProductHierarchy[macroCategory][category]);
}

function getDepartments(macroCategory, category, microCategory) {
    if (!macroCategory || !category || !microCategory) return [];
    if (!ProductHierarchy[macroCategory] || !ProductHierarchy[macroCategory][category] || !ProductHierarchy[macroCategory][category][microCategory]) return [];
    return ProductHierarchy[macroCategory][category][microCategory];
}

function updateDropdownOptions(selectId, options, placeholder = "Select...") {
    const select = document.getElementById(selectId);
    if (!select) return;

    select.innerHTML = `<option value="">${placeholder}</option>`;
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

function handleLevelChange() {
    const level = document.getElementById('ruleLevel').value;
    const valueContainer = document.getElementById('ruleValueContainer');

    // Clear existing dropdowns
    valueContainer.innerHTML = '';

    if (level === 'MacroCategory') {
        valueContainer.innerHTML = `
            <div class="form-group">
                <label for="macroCategory">MacroCategory</label>
                <select id="macroCategory" required>
                    <option value="">Select MacroCategory...</option>
                    ${getMacroCategories().map(mc => `<option value="${mc}">${mc}</option>`).join('')}
                </select>
            </div>
        `;
    } else if (level === 'Category') {
        valueContainer.innerHTML = `
            <div class="form-group">
                <label for="macroCategory">MacroCategory</label>
                <select id="macroCategory" required>
                    <option value="">Select MacroCategory...</option>
                    ${getMacroCategories().map(mc => `<option value="${mc}">${mc}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" required disabled>
                    <option value="">Select Category...</option>
                </select>
            </div>
        `;

        document.getElementById('macroCategory').addEventListener('change', function () {
            const categorySelect = document.getElementById('category');
            categorySelect.disabled = false;
            updateDropdownOptions('category', getCategories(this.value), 'Select Category...');
        });
    } else if (level === 'MicroCategory') {
        valueContainer.innerHTML = `
            <div class="form-group">
                <label for="macroCategory">MacroCategory</label>
                <select id="macroCategory" required>
                    <option value="">Select MacroCategory...</option>
                    ${getMacroCategories().map(mc => `<option value="${mc}">${mc}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" required disabled>
                    <option value="">Select Category...</option>
                </select>
            </div>
            <div class="form-group">
                <label for="microCategory">MicroCategory</label>
                <select id="microCategory" required disabled>
                    <option value="">Select MicroCategory...</option>
                </select>
            </div>
        `;

        document.getElementById('macroCategory').addEventListener('change', function () {
            const categorySelect = document.getElementById('category');
            categorySelect.disabled = false;
            document.getElementById('microCategory').disabled = true;
            updateDropdownOptions('category', getCategories(this.value), 'Select Category...');
        });

        document.getElementById('category').addEventListener('change', function () {
            const macroCategory = document.getElementById('macroCategory').value;
            const microCategorySelect = document.getElementById('microCategory');
            microCategorySelect.disabled = false;
            updateDropdownOptions('microCategory', getMicroCategories(macroCategory, this.value), 'Select MicroCategory...');
        });
    } else if (level === 'Department') {
        valueContainer.innerHTML = `
            <div class="form-group">
                <label for="macroCategory">MacroCategory</label>
                <select id="macroCategory" required>
                    <option value="">Select MacroCategory...</option>
                    ${getMacroCategories().map(mc => `<option value="${mc}">${mc}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" required disabled>
                    <option value="">Select Category...</option>
                </select>
            </div>
            <div class="form-group">
                <label for="microCategory">MicroCategory</label>
                <select id="microCategory" required disabled>
                    <option value="">Select MicroCategory...</option>
                </select>
            </div>
            <div class="form-group">
                <label for="department">Department</label>
                <select id="department" required disabled>
                    <option value="">Select Department...</option>
                </select>
            </div>
        `;

        document.getElementById('macroCategory').addEventListener('change', function () {
            const categorySelect = document.getElementById('category');
            categorySelect.disabled = false;
            document.getElementById('microCategory').disabled = true;
            document.getElementById('department').disabled = true;
            updateDropdownOptions('category', getCategories(this.value), 'Select Category...');
        });

        document.getElementById('category').addEventListener('change', function () {
            const macroCategory = document.getElementById('macroCategory').value;
            const microCategorySelect = document.getElementById('microCategory');
            microCategorySelect.disabled = false;
            document.getElementById('department').disabled = true;
            updateDropdownOptions('microCategory', getMicroCategories(macroCategory, this.value), 'Select MicroCategory...');
        });

        document.getElementById('microCategory').addEventListener('change', function () {
            const macroCategory = document.getElementById('macroCategory').value;
            const category = document.getElementById('category').value;
            const departmentSelect = document.getElementById('department');
            departmentSelect.disabled = false;
            updateDropdownOptions('department', getDepartments(macroCategory, category, this.value), 'Select Department...');
        });
    }
}

// ===================================
// Branch Selection Handler
// ===================================
function initBranchSelector() {
    const branchChips = document.querySelectorAll('.branch-chip');

    branchChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove selected class from all chips
            branchChips.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked chip
            chip.classList.add('selected');

            // Update app state
            AppState.selectedBranch = chip.getAttribute('data-branch');

            console.log('Selected branch:', AppState.selectedBranch);
        });
    });
}

// ===================================
// File Upload Handler
// ===================================
function initFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // File selection
    fileInput.addEventListener('change', handleFileSelection);

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-purple)';
        uploadArea.style.background = '#f0f4ff';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--gray-300)';
        uploadArea.style.background = 'transparent';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--gray-300)';
        uploadArea.style.background = 'transparent';

        const files = e.dataTransfer.files;
        handleFiles(files);
    });
}

function handleFileSelection(event) {
    const files = event.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    const filesList = document.getElementById('filesList');
    const uploadedFilesSection = document.getElementById('uploadedFiles');

    Array.from(files).forEach(file => {
        // Validate file type
        if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
            alert('Please upload only Excel files (.xlsx or .xls)');
            return;
        }

        // Add to state
        AppState.uploadedFiles.push({
            name: file.name,
            size: file.size,
            branch: AppState.selectedBranch,
            uploadDate: new Date()
        });

        // Create file item element
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div>
                <strong>📄 ${file.name}</strong>
                <p class="file-info">${(file.size / 1024).toFixed(2)} KB • Branch: ${AppState.selectedBranch}</p>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFile('${file.name}')">Remove</button>
        `;

        filesList.appendChild(fileItem);
    });

    // Show uploaded files section
    if (AppState.uploadedFiles.length > 0) {
        uploadedFilesSection.style.display = 'block';
    }

    // Add log entry
    addLog(`File(s) uploaded for branch: ${AppState.selectedBranch}`);
}

function removeFile(fileName) {
    // Remove from state
    AppState.uploadedFiles = AppState.uploadedFiles.filter(f => f.name !== fileName);

    // Refresh file list
    refreshFileList();

    // Hide section if no files
    if (AppState.uploadedFiles.length === 0) {
        document.getElementById('uploadedFiles').style.display = 'none';
    }
}

function clearFiles() {
    AppState.uploadedFiles = [];
    document.getElementById('filesList').innerHTML = '';
    document.getElementById('uploadedFiles').style.display = 'none';
    addLog('All uploaded files cleared');
}

function refreshFileList() {
    const filesList = document.getElementById('filesList');
    filesList.innerHTML = '';

    AppState.uploadedFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div>
                <strong>📄 ${file.name}</strong>
                <p class="file-info">${(file.size / 1024).toFixed(2)} KB • Branch: ${file.branch}</p>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFile('${file.name}')">Remove</button>
        `;
        filesList.appendChild(fileItem);
    });
}

// ===================================
// Rule Management
// ===================================
function initRuleForm() {
    const ruleForm = document.getElementById('ruleForm');
    const ruleLevelSelect = document.getElementById('ruleLevel');

    // Initialize with MacroCategory level
    handleLevelChange();

    // Listen for level changes
    ruleLevelSelect.addEventListener('change', handleLevelChange);

    ruleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addRule();
    });
}

function addRule() {
    const level = document.getElementById('ruleLevel').value;
    const threshold = document.getElementById('ruleThreshold').value;
    const priority = document.getElementById('rulePriority').value;

    // Validation
    if (!threshold) {
        alert('Please fill in the threshold value');
        return;
    }

    // Get values based on level
    let macroCategory = '';
    let category = '';
    let microCategory = '';
    let department = '';
    let displayName = '';

    if (level === 'MacroCategory') {
        macroCategory = document.getElementById('macroCategory')?.value;
        if (!macroCategory) {
            alert('Please select a MacroCategory');
            return;
        }
        displayName = macroCategory;
    } else if (level === 'Category') {
        macroCategory = document.getElementById('macroCategory')?.value;
        category = document.getElementById('category')?.value;
        if (!macroCategory || !category) {
            alert('Please select all required fields');
            return;
        }
        displayName = `${macroCategory} > ${category}`;
    } else if (level === 'MicroCategory') {
        macroCategory = document.getElementById('macroCategory')?.value;
        category = document.getElementById('category')?.value;
        microCategory = document.getElementById('microCategory')?.value;
        if (!macroCategory || !category || !microCategory) {
            alert('Please select all required fields');
            return;
        }
        displayName = `${macroCategory} > ${category} > ${microCategory}`;
    } else if (level === 'Department') {
        macroCategory = document.getElementById('macroCategory')?.value;
        category = document.getElementById('category')?.value;
        microCategory = document.getElementById('microCategory')?.value;
        department = document.getElementById('department')?.value;
        if (!macroCategory || !category || !microCategory || !department) {
            alert('Please select all required fields');
            return;
        }
        displayName = `${macroCategory} > ${category} > ${microCategory} > ${department}`;
    }

    // Add to state
    const rule = {
        level,
        macroCategory,
        category,
        microCategory,
        department,
        displayName,
        threshold: parseInt(threshold),
        priority: parseInt(priority),
        createdAt: new Date()
    };

    AppState.rules.push(rule);

    // Add to table
    const table = document.getElementById('rulesTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(0);

    const badgeClass = {
        'MacroCategory': 'badge-macro',
        'Category': 'badge-category',
        'MicroCategory': 'badge-micro',
        'Department': 'badge-department'
    }[level];

    const priorityBars = Array(4).fill(0).map((_, i) =>
        `<div class="priority-bar ${i < priority ? 'active' : ''}"></div>`
    ).join('');

    newRow.innerHTML = `
        <td><span class="badge ${badgeClass}">${level}</span></td>
        <td>${displayName}</td>
        <td>${threshold}</td>
        <td>
            <div class="priority-indicator">
                ${priorityBars}
            </div>
        </td>
        <td>
            <button class="btn btn-danger btn-sm" onclick="deleteRule(this)">Delete</button>
        </td>
    `;

    // Clear form
    document.getElementById('ruleThreshold').value = '';
    document.getElementById('rulePriority').value = '1';

    // Trigger level change to reset dropdowns
    handleLevelChange();

    // Add to logs
    addLog(`Rule Added: ${level} "${displayName}" with threshold ${threshold} (applies to all child levels)`);

    // Show success feedback
    showNotification('Rule added successfully! This rule will cascade to all child levels.', 'success');
}

// ===================================
// Get Applicable Capping for an Item
// ===================================
function getApplicableCapping(itemMacro, itemCategory, itemMicro, itemDepartment) {
    // Priority: Department > MicroCategory > Category > MacroCategory
    // Check from most specific to least specific

    // Check Department level
    const deptRule = AppState.rules.find(r =>
        r.level === 'Department' &&
        r.macroCategory === itemMacro &&
        r.category === itemCategory &&
        r.microCategory === itemMicro &&
        r.department === itemDepartment
    );
    if (deptRule) return deptRule.threshold;

    // Check MicroCategory level
    const microRule = AppState.rules.find(r =>
        r.level === 'MicroCategory' &&
        r.macroCategory === itemMacro &&
        r.category === itemCategory &&
        r.microCategory === itemMicro
    );
    if (microRule) return microRule.threshold;

    // Check Category level
    const catRule = AppState.rules.find(r =>
        r.level === 'Category' &&
        r.macroCategory === itemMacro &&
        r.category === itemCategory
    );
    if (catRule) return catRule.threshold;

    // Check MacroCategory level
    const macroRule = AppState.rules.find(r =>
        r.level === 'MacroCategory' &&
        r.macroCategory === itemMacro
    );
    if (macroRule) return macroRule.threshold;

    // No rule found, return null
    return null;
}

function deleteRule(button) {
    const row = button.closest('tr');
    const ruleName = row.cells[1].textContent;

    if (confirm(`Are you sure you want to delete the rule for "${ruleName}"?`)) {
        row.remove();
        addLog(`Rule Deleted: ${ruleName}`);
        showNotification('Rule deleted successfully!', 'success');
    }
}

// ===================================
// Processing Functions
// ===================================
function processFiles() {
    if (AppState.uploadedFiles.length === 0) {
        alert('Please upload files before processing');
        return;
    }

    // Simulate processing
    showNotification('Processing files...', 'info');

    setTimeout(() => {
        const itemsProcessed = Math.floor(Math.random() * 500) + 500;
        const rulesApplied = AppState.rules.length || 23;

        addLog(`Processing Complete: ${AppState.selectedBranch} - ${itemsProcessed} items processed, ${rulesApplied} rules applied`);
        showNotification('Processing completed successfully!', 'success');

        // Clear uploaded files
        clearFiles();
    }, 2000);
}

function startProcessing() {
    showNotification('Manual processing started...', 'info');

    setTimeout(() => {
        addLog('Manual processing job initiated');
        showNotification('Processing job queued successfully!', 'success');
    }, 1000);
}

// ===================================
// Logging System
// ===================================
function addLog(message) {
    const logsContainer = document.getElementById('logsContainer');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';

    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);

    logEntry.innerHTML = `
        <div class="log-time">${timestamp}</div>
        <div class="log-message"><strong>Action:</strong> ${message}</div>
    `;

    // Insert at the beginning
    logsContainer.insertBefore(logEntry, logsContainer.firstChild);

    // Keep only last 50 logs
    while (logsContainer.children.length > 50) {
        logsContainer.removeChild(logsContainer.lastChild);
    }
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'var(--success-green)' : type === 'error' ? 'var(--danger-red)' : 'var(--primary-purple)'};
        color: white;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Utility Functions
// ===================================
function formatDate(date) {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// ===================================
// Data Export Functions
// ===================================
function exportToExcel(data, filename) {
    // This would integrate with a library like SheetJS in production
    console.log('Exporting to Excel:', filename, data);
    showNotification('Export functionality would be implemented here', 'info');
}

// ===================================
// Initialization
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🛒 The Grocer Platform - Initializing...');

    // Initialize all components
    initNavigation();
    initBranchSelector();
    initFileUpload();
    initRuleForm();

    // Add initial log
    addLog('System initialized successfully');

    console.log('✅ Platform ready!');
});

// ===================================
// Auto-save functionality (optional)
// ===================================
function saveState() {
    try {
        localStorage.setItem('grocerAppState', JSON.stringify(AppState));
        console.log('State saved');
    } catch (error) {
        console.error('Error saving state:', error);
    }
}

function loadState() {
    try {
        const savedState = localStorage.getItem('grocerAppState');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            Object.assign(AppState, parsed);
            console.log('State loaded');
        }
    } catch (error) {
        console.error('Error loading state:', error);
    }
}

// Auto-save every 30 seconds
setInterval(saveState, 30000);

// Load state on startup
window.addEventListener('load', loadState);
