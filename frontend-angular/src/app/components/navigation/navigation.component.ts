import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService, AppSection } from '../../services/app-state.service';

@Component({
  selector: 'grocer-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="sidebar">
      <nav>
        <div 
          *ngFor="let item of navItems" 
          class="nav-item" 
          [class.active]="currentSection() === item.id"
          (click)="setSection(item.id)"
        >
          {{ item.icon }} {{ item.label }}
        </div>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      background: white;
      border-radius: var(--radius-xl);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-md);
      height: fit-content;
      animation: slideRight 0.5s ease;
    }

    .nav-item {
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-normal);
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-weight: 500;
      user-select: none;
    }

    .nav-item:hover {
      background: #f0f4ff;
      transform: translateX(5px);
    }

    .nav-item.active {
      background: var(--primary-purple);
      color: white;
      box-shadow: var(--shadow-sm);
    }

    @media (max-width: 1024px) {
      .sidebar {
        display: flex;
        overflow-x: auto;
        padding: var(--spacing-sm);
      }
      
      .nav-item {
        white-space: nowrap;
        margin-right: 8px;
        margin-bottom: 0;
      }
    }
  `]
})
export class NavigationComponent {
  currentSection = this.appState.currentSection;

  navItems: { id: AppSection; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'rules', label: 'Capping Rules', icon: '⚙️' },
    { id: 'upload', label: 'Upload Files', icon: '📤' },
    { id: 'processing', label: 'Processing', icon: '🔄' },
    { id: 'logs', label: 'Audit Logs', icon: '📋' },
    { id: 'branches', label: 'Branches', icon: '🏪' }
  ];

  constructor(private appState: AppStateService) { }

  setSection(section: AppSection) {
    this.appState.setSection(section);
  }
}
