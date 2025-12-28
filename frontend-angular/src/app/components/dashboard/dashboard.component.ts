import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'grocer-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section active">
      <div class="section-header">
        <h2 class="section-title">Dashboard Overview</h2>
        <p class="section-subtitle">Real-time system metrics and status</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">847</div>
          <div class="stat-label">Active Items</div>
        </div>
        <div class="stat-card stat-card-green">
          <div class="stat-value">12</div>
          <div class="stat-label">Active Branches</div>
        </div>
        <div class="stat-card stat-card-orange">
          <div class="stat-value">64</div>
          <div class="stat-label">Active Rules</div>
        </div>
        <div class="stat-card stat-card-red">
          <div class="stat-value">2h</div>
          <div class="stat-label">Next Sync</div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Recent Processing Jobs</h3>
        <table class="rules-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Branch</th>
              <th>Items Processed</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let job of recentJobs">
              <td>{{ job.id }}</td>
              <td>{{ job.branch }}</td>
              <td>{{ job.items }}</td>
              <td><span class="badge" [class.badge-success]="job.status === 'Completed'">{{ job.status }}</span></td>
              <td>{{ job.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .section-header {
      margin-bottom: 25px;
      padding-bottom: var(--spacing-md);
      border-bottom: 2px solid var(--gray-200);
    }

    .section-title {
      font-size: 24px;
      color: var(--gray-800);
      margin-bottom: 8px;
      font-weight: 700;
    }

    .section-subtitle {
      color: var(--gray-500);
      font-size: 14px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .stat-card {
      background: linear-gradient(135deg, var(--primary-purple) 0%, var(--secondary-purple) 100%);
      color: white;
      padding: var(--spacing-lg);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      transition: transform var(--transition-normal);
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }

    .stat-card-green {
      background: linear-gradient(135deg, var(--success-green) 0%, var(--success-green-dark) 100%);
    }

    .stat-card-orange {
      background: linear-gradient(135deg, var(--warning-orange) 0%, var(--warning-orange-dark) 100%);
    }

    .stat-card-red {
      background: linear-gradient(135deg, var(--danger-red) 0%, var(--danger-red-dark) 100%);
    }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: var(--spacing-xs);
    }

    .stat-label {
      font-size: 14px;
      opacity: 0.9;
    }

    .card {
      background: var(--gray-50);
      padding: var(--spacing-lg);
      border-radius: var(--radius-lg);
      margin-bottom: var(--spacing-lg);
      border: 1px solid var(--gray-200);
      transition: all var(--transition-normal);
    }

    .card-title {
      margin-bottom: var(--spacing-md);
      color: var(--gray-800);
      font-size: 18px;
      font-weight: 600;
    }

    .rules-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: var(--spacing-lg);
      background: white;
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .rules-table th {
      background: var(--gray-100);
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: var(--gray-700);
      border-bottom: 2px solid var(--gray-200);
      font-size: 14px;
    }

    .rules-table td {
      padding: 12px;
      border-bottom: 1px solid var(--gray-200);
      font-size: 14px;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .badge-success {
      background: #dcfce7;
      color: #166534;
    }
  `]
})
export class DashboardComponent {
  recentJobs = [
    { id: '#JOB-1234', branch: 'Garden 8', items: 847, status: 'Completed', time: '2 hours ago' },
    { id: '#JOB-1233', branch: 'Lake View', items: 923, status: 'Completed', time: '3 hours ago' },
    { id: '#JOB-1232', branch: 'Maadi', items: 756, status: 'Completed', time: '4 hours ago' }
  ];
}
