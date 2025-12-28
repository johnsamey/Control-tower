import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CappingRulesComponent } from '../capping-rules/capping-rules.component';
import { InventoryUploadComponent } from '../inventory-upload/inventory-upload.component';
import { ProcessingComponent } from '../processing/processing.component';
import { AuditLogsComponent } from '../audit-logs/audit-logs.component';
import { BranchManagementComponent } from '../branch-management/branch-management.component';
import { AppStateService, AppSection } from '../../services/app-state.service';

@Component({
  selector: 'grocer-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NavigationComponent,
    DashboardComponent,
    CappingRulesComponent,
    InventoryUploadComponent,
    ProcessingComponent,
    AuditLogsComponent,
    BranchManagementComponent
  ],
  template: `
    <div class="container">
      <grocer-header></grocer-header>
      
      <div class="main-grid">
        <grocer-navigation></grocer-navigation>
        
        <main class="content-area">
          <grocer-dashboard *ngIf="currentSection() === 'dashboard'"></grocer-dashboard>
          <grocer-capping-rules *ngIf="currentSection() === 'rules'"></grocer-capping-rules>
          <grocer-inventory-upload *ngIf="currentSection() === 'upload'"></grocer-inventory-upload>
          <grocer-processing *ngIf="currentSection() === 'processing'"></grocer-processing>
          <grocer-audit-logs *ngIf="currentSection() === 'logs'"></grocer-audit-logs>
          <grocer-branch-management *ngIf="currentSection() === 'branches'"></grocer-branch-management>
        </main>
      </div>

      <!-- Notification Toasts -->
      <div class="notification-container">
        <div 
          *ngFor="let n of notifications()" 
          class="notification" 
          [class]="n.type"
        >
          {{ n.message }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .main-grid {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
    }

    .content-area {
      background: white;
      border-radius: var(--radius-xl);
      padding: var(--spacing-xl);
      box-shadow: var(--shadow-md);
      min-height: 600px;
      animation: fadeIn 0.5s ease;
    }

    .notification-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .notification {
      padding: 12px 24px;
      border-radius: var(--radius-lg);
      color: white;
      box-shadow: var(--shadow-lg);
      animation: slideInRight 0.3s ease;
      min-width: 200px;
      font-weight: 500;
    }

    .success { background: var(--success-green); }
    .error { background: var(--danger-red); }
    .info { background: var(--primary-purple); }

    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @media (max-width: 1024px) {
      .main-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LayoutComponent {
  currentSection = this.appState.currentSection;
  notifications = this.appState.notifications;

  constructor(private appState: AppStateService) { }
}
