import { Injectable, signal } from '@angular/core';

export type AppSection = 'dashboard' | 'rules' | 'upload' | 'processing' | 'logs' | 'branches';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  currentSection = signal<AppSection>('dashboard');
  selectedBranch = signal<string>('Garden 8');
  notifications = signal<Notification[]>([]);

  private notificationId = 0;

  setSection(section: AppSection) {
    this.currentSection.set(section);
  }

  setBranch(branch: string) {
    this.selectedBranch.set(branch);
  }

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = this.notificationId++;
    const notification: Notification = { message, type, id };

    this.notifications.update(prev => [...prev, notification]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      this.notifications.update(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }

  constructor() { }
}
