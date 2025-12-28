import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'grocer-branch-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section active">
      <div class="section-header">
        <h2 class="section-title">Branch Management</h2>
        <p class="section-subtitle">Configure and monitor branch-specific settings</p>
      </div>

      <div class="branches-grid">
        <div *ngFor="let branch of branches" class="card branch-card">
          <h3>🏪 {{ branch.name }}</h3>
          <p class="branch-info">Last sync: {{ branch.lastSync }}</p>
          <p><strong>Active Items:</strong> {{ branch.items }}</p>
          <p><strong>Status:</strong> <span class="badge badge-success">{{ branch.status }}</span></p>
          <button class="btn btn-primary btn-full">Configure</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .branches-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-lg); }
    .branch-card h3 { color: var(--gray-800); margin-bottom: var(--spacing-sm); font-size: 18px; }
    .branch-info { color: var(--gray-500); margin: var(--spacing-sm) 0; font-size: 14px; }
    .branch-card p { margin-bottom: 8px; font-size: 14px; }
    .btn-full { width: 100%; margin-top: var(--spacing-md); }
    .badge-success { background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; }
  `]
})
export class BranchManagementComponent {
  branches = [
    { name: 'Garden 8', lastSync: '2 hours ago', items: 847, status: 'Active' },
    { name: 'Lake View', lastSync: '3 hours ago', items: 923, status: 'Active' },
    { name: 'Maadi', lastSync: '4 hours ago', items: 756, status: 'Active' }
  ];
}
