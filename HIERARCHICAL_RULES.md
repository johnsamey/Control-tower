# Hierarchical Capping Rules System

## Overview
The Grocer Inventory Platform now implements a **hierarchical capping rules system** where classification levels depend on each other and rules cascade from parent to child levels.

## Hierarchy Structure

```
MacroCategory
    └── Category
        └── MicroCategory
            └── Department
```

### Example Hierarchy:
```
Fresh (MacroCategory)
    └── Dairy (Category)
        └── Cheese (MicroCategory)
            ├── Imported Cheese (Department)
            ├── Local Cheese (Department)
            └── Soft Cheese (Department)
```

## How It Works

### 1. **Dependent Dropdowns**
When creating a capping rule, the dropdowns are dependent on each other:

- **MacroCategory Level**: Select only MacroCategory
- **Category Level**: Select MacroCategory → then Category
- **MicroCategory Level**: Select MacroCategory → Category → MicroCategory
- **Department Level**: Select MacroCategory → Category → MicroCategory → Department

### 2. **Cascading Rules**
Rules cascade from parent to child levels. This means:

- A rule set at **MacroCategory** level applies to ALL Categories, MicroCategories, and Departments under it
- A rule set at **Category** level applies to ALL MicroCategories and Departments under it
- A rule set at **MicroCategory** level applies to ALL Departments under it
- A rule set at **Department** level applies only to that specific department

### 3. **Priority Resolution**
When determining which capping threshold to apply to an item, the system checks from most specific to least specific:

**Priority Order (Highest to Lowest):**
1. **Department** (Priority 4) - Most specific
2. **MicroCategory** (Priority 3)
3. **Category** (Priority 2)
4. **MacroCategory** (Priority 1) - Least specific

## Example Scenario

### Rules Configuration:
```
MacroCategory: Fresh → Threshold: 10
Category: Fresh > Dairy → Threshold: 7
MicroCategory: Fresh > Dairy > Cheese → Threshold: 5
Department: Fresh > Dairy > Cheese > Imported Cheese → Threshold: 3
```

### Item Capping Application:

| Item | Applicable Rule | Threshold Used |
|------|----------------|----------------|
| Fresh > Fruits > Citrus > Oranges | MacroCategory (Fresh) | 10 |
| Fresh > Dairy > Milk > Fresh Milk | Category (Fresh > Dairy) | 7 |
| Fresh > Dairy > Cheese > Local Cheese | MicroCategory (Fresh > Dairy > Cheese) | 5 |
| Fresh > Dairy > Cheese > Imported Cheese | Department (Fresh > Dairy > Cheese > Imported Cheese) | 3 |

## Business Logic

### Capping Rule Application:
```javascript
IF item_stock < applicable_threshold THEN
    item_availability = 0
ELSE
    item_availability = 1
END IF
```

### Finding Applicable Threshold:
```javascript
function getApplicableCapping(itemMacro, itemCategory, itemMicro, itemDepartment) {
    // Check Department level first (highest priority)
    if (departmentRuleExists) return departmentThreshold;
    
    // Check MicroCategory level
    if (microCategoryRuleExists) return microThreshold;
    
    // Check Category level
    if (categoryRuleExists) return categoryThreshold;
    
    // Check MacroCategory level (lowest priority)
    if (macroCategoryRuleExists) return macroThreshold;
    
    // No rule found
    return null;
}
```

## Product Hierarchy Data

The system includes sample data for the following MacroCategories:

### 1. **Fresh**
- Dairy
  - Cheese (Imported, Local, Soft)
  - Milk (Fresh, UHT, Flavored)
  - Yogurt (Greek, Regular, Drinking)
- Fruits
  - Citrus (Oranges, Lemons, Grapefruits)
  - Tropical (Mangoes, Pineapples, Bananas)
  - Berries (Strawberries, Blueberries, Raspberries)
- Vegetables
  - Leafy Greens (Lettuce, Spinach, Kale)
  - Root Vegetables (Carrots, Potatoes, Onions)
  - Herbs (Parsley, Cilantro, Mint)

### 2. **Frozen**
- Frozen Vegetables
  - Mixed Vegetables
  - Single Vegetables
- Frozen Meat
  - Chicken
  - Beef
- Ice Cream
  - Premium
  - Regular

### 3. **Grocery**
- Pasta & Rice
  - Pasta
  - Rice
- Canned Goods
  - Vegetables
  - Fruits
- Oils & Sauces
  - Cooking Oils
  - Sauces

### 4. **Beverages**
- Soft Drinks
  - Carbonated
  - Juice
- Water
  - Still Water
  - Sparkling Water

## Usage Guide

### Adding a New Rule

1. **Navigate to Capping Rules** section
2. **Select Classification Level** (MacroCategory, Category, MicroCategory, or Department)
3. **Select Values** from the dependent dropdowns:
   - Dropdowns will enable/disable based on your selections
   - Each dropdown depends on the previous selection
4. **Enter Threshold** (minimum stock quantity)
5. **Set Priority** (1-4, automatically determined by level)
6. **Click "Add Rule"**

### Understanding the Display

Rules are displayed in the format:
- **MacroCategory**: `Fresh`
- **Category**: `Fresh > Dairy`
- **MicroCategory**: `Fresh > Dairy > Cheese`
- **Department**: `Fresh > Dairy > Cheese > Imported Cheese`

This clearly shows the hierarchical path and makes it easy to understand which items the rule applies to.

## Benefits

1. **Flexibility**: Set broad rules at high levels, override with specific rules at lower levels
2. **Efficiency**: Don't need to set rules for every single item
3. **Maintainability**: Easy to update rules for entire categories
4. **Clarity**: Visual hierarchy makes it clear which rules apply where
5. **Scalability**: Easy to add new products within existing hierarchy

## Technical Implementation

### Key Functions

- `getMacroCategories()` - Returns all MacroCategories
- `getCategories(macroCategory)` - Returns Categories under a MacroCategory
- `getMicroCategories(macroCategory, category)` - Returns MicroCategories under a Category
- `getDepartments(macroCategory, category, microCategory)` - Returns Departments under a MicroCategory
- `handleLevelChange()` - Dynamically updates dropdowns based on selected level
- `getApplicableCapping(...)` - Determines which threshold applies to an item

### Data Structure

```javascript
const ProductHierarchy = {
    "MacroCategory": {
        "Category": {
            "MicroCategory": ["Department1", "Department2", ...]
        }
    }
};
```

### Rule Storage

```javascript
const rule = {
    level: "Department",
    macroCategory: "Fresh",
    category: "Dairy",
    microCategory: "Cheese",
    department: "Imported Cheese",
    displayName: "Fresh > Dairy > Cheese > Imported Cheese",
    threshold: 3,
    priority: 4,
    createdAt: Date
};
```

## Future Enhancements

1. **Import/Export Rules**: Bulk import rules from Excel
2. **Rule Templates**: Save and reuse common rule configurations
3. **Rule History**: Track changes to rules over time
4. **Conflict Detection**: Warn when rules might conflict
5. **Rule Analytics**: Show which rules are most frequently applied
6. **Batch Operations**: Apply same threshold to multiple items at once

---

**Last Updated**: 2024-12-22  
**Version**: 2.0
