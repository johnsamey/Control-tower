import { Component } from '@angular/core';

@Component({
  selector: 'grocer-header',
  standalone: true,
  template: `
    <header>
      <div>
        <h1>🛒 The Grocer - Inventory Platform</h1>
        <p class="header-subtitle">Retail Inventory Management System</p>
      </div>
      <div class="sync-status">
        <div class="status-dot"></div>
        <span>System Online</span>
      </div>
    </header>
  `,
  styles: [`
    header {
      background: white;
      padding: var(--spacing-lg) var(--spacing-xl);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-md);
      margin-bottom: var(--spacing-xl);
      display: flex;
      justify-content: space-between;
      align-items: center;
      animation: slideDown 0.5s ease;
    }

    h1 {
      color: var(--primary-purple);
      font-size: 28px;
      font-weight: 700;
    }

    .header-subtitle {
      color: var(--gray-500);
      margin-top: var(--spacing-xs);
      font-size: 14px;
    }

    .sync-status {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: 8px 16px;
      background: #f0f4ff;
      border-radius: var(--radius-md);
      font-size: 14px;
      font-weight: 500;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: var(--radius-full);
      background: var(--success-green);
      animation: pulse 2s infinite;
    }
  `]
})
export class HeaderComponent { }
