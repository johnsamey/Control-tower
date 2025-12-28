import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'grocer-processing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section active">
      <div class="section-header">
        <h2 class="section-title">Data Processing</h2>
        <p class="section-subtitle">Transform and export inventory data</p>
      </div>

      <div class="card">
        <h3 class="card-title">Processing Configuration</h3>
        <div class="form-group">
          <label>Export Destination</label>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" checked> Instashop
            </label>
            <label class="checkbox-label">
              <input type="checkbox" checked> Talabat
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>Schedule Type</label>
          <select>
            <option>Hourly (Every Hour)</option>
            <option>Custom Interval</option>
            <option>Manual Only</option>
          </select>
        </div>
        <button class="btn btn-success" (click)="startProcessing()">Start Manual Processing</button>
      </div>

      <div class="card">
        <h3 class="card-title">Processing History</h3>
        <table class="rules-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Branch</th>
              <th>Items</th>
              <th>Rules Applied</th>
              <th>Export Status</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of history">
              <td>{{ item.timestamp }}</td>
              <td>{{ item.branch }}</td>
              <td>{{ item.items }}</td>
              <td>{{ item.rules }}</td>
              <td><span class="badge badge-success">{{ item.status }}</span></td>
              <td><button class="btn btn-primary btn-sm">📥 Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .checkbox-group { display: flex; gap: var(--spacing-lg); margin-top: var(--spacing-sm); }
    .checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 400; }
    input[type="checkbox"] { cursor: pointer; width: 16px; height: 16px; }
    .form-group { margin-bottom: var(--spacing-lg); }
    label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px; }
    select { width: 100%; padding: 10px 14px; border: 1px solid var(--gray-300); border-radius: var(--radius-md); }
  `]
})
export class ProcessingComponent {
  history = [
    { timestamp: '2024-12-22 14:00', branch: 'Garden 8', items: 847, rules: 23, status: 'Success' },
    { timestamp: '2024-12-22 13:00', branch: 'Lake View', items: 923, rules: 23, status: 'Success' }
  ];

  constructor(private appState: AppStateService) { }

  startProcessing() {
    this.appState.showNotification('Manual processing started...', 'info');
    setTimeout(() => {
      this.appState.showNotification('Processing complete!', 'success');
    }, 2000);
  }
}
