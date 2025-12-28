import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'grocer-audit-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section active">
      <div class="section-header">
        <h2 class="section-title">Audit Logs</h2>
        <p class="section-subtitle">System activity and rule change history</p>
      </div>

      <div class="logs-container">
        <div *ngFor="let log of logs" class="log-entry">
          <div class="log-time">{{ log.time }}</div>
          <div class="log-message" [innerHTML]="log.message"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .log-entry { padding: var(--spacing-md); background: white; border-left: 4px solid var(--primary-purple); margin-bottom: var(--spacing-sm); border-radius: var(--radius-sm); transition: all var(--transition-normal); border-bottom: 1px solid var(--gray-100); }
    .log-entry:hover { box-shadow: var(--shadow-sm); transform: translateX(5px); }
    .log-time { color: var(--gray-500); font-size: 12px; margin-bottom: var(--spacing-xs); }
    .log-message { color: var(--gray-700); font-size: 14px; }
  `]
})
export class AuditLogsComponent {
  logs = [
    { time: '2024-12-22 14:32:15', message: '<strong>Rule Added:</strong> Department "Imported Cheese" with threshold 3' },
    { time: '2024-12-22 14:00:00', message: '<strong>Processing Complete:</strong> Garden 8 - 847 items processed, 23 rules applied' },
    { time: '2024-12-22 13:45:22', message: '<strong>File Uploaded:</strong> garden8_inventory.xlsx by user@thegrocer.com' },
    { time: '2024-12-22 13:00:00', message: '<strong>Processing Complete:</strong> Lake View - 923 items processed, 23 rules applied' },
    { time: '2024-12-22 12:15:08', message: '<strong>Rule Modified:</strong> MicroCategory "Cheese" threshold changed from 8 to 5' }
  ];
}
