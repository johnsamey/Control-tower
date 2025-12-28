import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HierarchyService, CappingRule } from '../../services/hierarchy.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'grocer-capping-rules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="section active">
      <div class="section-header">
        <h2 class="section-title">Capping Rules Management</h2>
        <p class="section-subtitle">Configure hierarchical thresholds for inventory availability</p>
      </div>

      <div class="card">
        <h3 class="card-title">Add New Capping Rule</h3>
        <form (submit)="onAddRule()" class="rule-form">
          <div class="form-grid">
            <div class="form-group">
              <label>Classification Level</label>
              <select [(ngModel)]="newRule.level" name="level" (change)="onLevelChange()">
                <option value="MacroCategory">MacroCategory</option>
                <option value="Category">Category</option>
                <option value="MicroCategory">MicroCategory</option>
                <option value="Department">Department</option>
              </select>
            </div>
            <div class="form-group">
              <label>Capping Threshold</label>
              <input type="number" [(ngModel)]="newRule.threshold" name="threshold" placeholder="e.g., 10" min="0" required>
            </div>
            <div class="form-group">
              <label>Priority (1=Highest)</label>
              <input type="number" [(ngModel)]="newRule.priority" name="priority" min="1" max="4">
            </div>
          </div>

          <!-- Dynamic dropdowns -->
          <div class="form-grid" style="margin-top: 20px;">
            <div class="form-group">
              <label>MacroCategory</label>
              <select [(ngModel)]="selectedValues.macro" name="macro" (change)="onMacroChange()">
                <option value="">Select MacroCategory</option>
                <option *ngFor="let m of getMacros()" [value]="m">{{ m }}</option>
              </select>
            </div>

            <div class="form-group" *ngIf="['Category', 'MicroCategory', 'Department'].includes(newRule.level)">
              <label>Category</label>
              <select [(ngModel)]="selectedValues.category" name="category" (change)="onCategoryChange()">
                <option value="">Select Category</option>
                <option *ngFor="let c of getCategories()" [value]="c">{{ c }}</option>
              </select>
            </div>

            <div class="form-group" *ngIf="['MicroCategory', 'Department'].includes(newRule.level)">
              <label>MicroCategory</label>
              <select [(ngModel)]="selectedValues.micro" name="micro" (change)="onMicroChange()">
                <option value="">Select MicroCategory</option>
                <option *ngFor="let mc of getMicros()" [value]="mc">{{ mc }}</option>
              </select>
            </div>

            <div class="form-group" *ngIf="newRule.level === 'Department'">
              <label>Department</label>
              <select [(ngModel)]="selectedValues.department" name="department">
                <option value="">Select Department</option>
                <option *ngFor="let d of getDepartments()" [value]="d">{{ d }}</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="margin-top: 20px;">Add Rule</button>
        </form>
      </div>

      <div class="card">
        <h3 class="card-title">Active Capping Rules</h3>
        <table class="rules-table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Value</th>
              <th>Threshold</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let rule of rules()">
              <td><span class="badge" [class]="getBadgeClass(rule.level)">{{ rule.level }}</span></td>
              <td>{{ rule.displayName }}</td>
              <td>{{ rule.threshold }}</td>
              <td>
                <div class="priority-indicator">
                  <div *ngFor="let i of [1,2,3,4]" class="priority-bar" [class.active]="i <= rule.priority"></div>
                </div>
              </td>
              <td>
                <button class="btn btn-danger btn-sm" (click)="deleteRule(rule.createdAt)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .form-group { margin-bottom: var(--spacing-lg); }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); }
    label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px; }
    select, input { width: 100%; padding: 10px 14px; border: 1px solid var(--gray-300); border-radius: var(--radius-md); }
    
    .rules-table { width: 100%; border-collapse: collapse; margin-top: var(--spacing-lg); }
    .rules-table th { background: var(--gray-100); padding: 12px; text-align: left; }
    .rules-table td { padding: 12px; border-bottom: 1px solid var(--gray-200); }
    
    .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .badge-macro { background: #dbeafe; color: #1e40af; }
    .badge-category { background: #dcfce7; color: #166534; }
    .badge-micro { background: #fef3c7; color: #92400e; }
    .badge-department { background: #fce7f3; color: #9f1239; }

    .priority-indicator { display: flex; gap: 4px; }
    .priority-bar { width: 20px; height: 4px; border-radius: 2px; background: var(--gray-300); }
    .priority-bar.active { background: var(--primary-purple); }
  `]
})
export class CappingRulesComponent implements OnInit {
  rules = this.hierarchyService.rules;
  hierarchy = this.hierarchyService.hierarchy;

  newRule = {
    level: 'MacroCategory',
    threshold: 10,
    priority: 1
  };

  selectedValues = {
    macro: '',
    category: '',
    micro: '',
    department: ''
  };

  constructor(
    private hierarchyService: HierarchyService,
    private appState: AppStateService
  ) { }

  ngOnInit() {
    this.hierarchyService.fetchHierarchy().subscribe();
  }

  getMacros() {
    return this.hierarchy() ? Object.keys(this.hierarchy()!) : [];
  }

  getCategories() {
    const h = this.hierarchy();
    if (!h || !this.selectedValues.macro) return [];
    return Object.keys(h[this.selectedValues.macro]);
  }

  getMicros() {
    const h = this.hierarchy();
    if (!h || !this.selectedValues.macro || !this.selectedValues.category) return [];
    return Object.keys(h[this.selectedValues.macro][this.selectedValues.category]);
  }

  getDepartments() {
    const h = this.hierarchy();
    if (!h || !this.selectedValues.macro || !this.selectedValues.category || !this.selectedValues.micro) return [];
    return h[this.selectedValues.macro][this.selectedValues.category][this.selectedValues.micro];
  }

  onLevelChange() {
    // Reset selections when level changes? Or keep what makes sense.
  }

  onMacroChange() {
    this.selectedValues.category = '';
    this.selectedValues.micro = '';
    this.selectedValues.department = '';
  }

  onCategoryChange() {
    this.selectedValues.micro = '';
    this.selectedValues.department = '';
  }

  onMicroChange() {
    this.selectedValues.department = '';
  }

  onAddRule() {
    let name = '';
    let displayName = '';

    const { macro, category, micro, department } = this.selectedValues;

    if (this.newRule.level === 'MacroCategory' && macro) {
      name = macro;
      displayName = macro;
    } else if (this.newRule.level === 'Category' && category) {
      name = category;
      displayName = `${macro} > ${category}`;
    } else if (this.newRule.level === 'MicroCategory' && micro) {
      name = micro;
      displayName = `${macro} > ${category} > ${micro}`;
    } else if (this.newRule.level === 'Department' && department) {
      name = department;
      displayName = `${macro} > ${category} > ${micro} > ${department}`;
    }

    if (!name) {
      this.appState.showNotification('Please select all required levels', 'error');
      return;
    }

    const rule: CappingRule = {
      ...this.newRule,
      name,
      displayName,
      createdAt: new Date().toISOString(),
      macroCategory: macro,
      category: category,
      microCategory: micro,
      department: department
    };

    this.hierarchyService.addRule(rule);
    this.appState.showNotification('Rule added successfully', 'success');
  }

  deleteRule(createdAt: string) {
    this.hierarchyService.deleteRule(createdAt);
    this.appState.showNotification('Rule deleted', 'info');
  }

  getBadgeClass(level: string) {
    return `badge-${level.toLowerCase()}`;
  }
}
