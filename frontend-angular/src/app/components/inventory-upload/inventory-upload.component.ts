import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state.service';

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

@Component({
  selector: 'grocer-inventory-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section active">
      <div class="section-header">
        <h2 class="section-title">Upload Inventory Files</h2>
        <p class="section-subtitle">Upload Excel files from branches for processing</p>
      </div>

      <div class="card">
        <label>Select Branch</label>
        <div class="branch-selector">
          <div 
            *ngFor="let branch of branches" 
            class="branch-chip" 
            [class.selected]="selectedBranch() === branch"
            (click)="setBranch(branch)"
          >
            {{ branch }}
          </div>
        </div>
      </div>

      <div class="upload-area" (click)="fileInput.click()" (drop)="onDrop($event)" (dragover)="$event.preventDefault()">
        <div class="upload-icon">📁</div>
        <h3>Drop Excel file here or click to browse</h3>
        <p class="upload-subtitle">Supported formats: .xlsx, .xls</p>
        <input type="file" #fileInput (change)="onFileSelected($event)" accept=".xlsx,.xls" multiple hidden>
      </div>

      <div class="card" *ngIf="files.length > 0">
        <h3 class="card-title">Uploaded Files</h3>
        <div class="file-list">
          <div *ngFor="let file of files" class="file-item">
            <div>
              <strong>{{ file.name }}</strong>
              <div class="file-info">{{ file.type }} • {{ file.size }}</div>
            </div>
            <button class="btn btn-danger btn-sm" (click)="removeFile(file)">Remove</button>
          </div>
        </div>
        <div class="action-buttons">
          <button class="btn btn-primary" (click)="processFiles()">Process Files</button>
          <button class="btn btn-secondary" (click)="clearFiles()">Clear All</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .branch-selector { display: flex; gap: var(--spacing-sm); margin-bottom: var(--spacing-lg); flex-wrap: wrap; }
    .branch-chip { padding: 8px 16px; border: 2px solid var(--gray-200); border-radius: 20px; cursor: pointer; transition: all var(--transition-normal); font-size: 14px; font-weight: 500; }
    .branch-chip.selected { background: var(--primary-purple); color: white; border-color: var(--primary-purple); }
    
    .upload-area { border: 2px dashed var(--gray-300); border-radius: var(--radius-lg); padding: 40px; text-align: center; cursor: pointer; transition: all var(--transition-normal); margin-bottom: var(--spacing-lg); }
    .upload-area:hover { border-color: var(--primary-purple); background: #f0f4ff; }
    .upload-icon { font-size: 48px; color: var(--gray-400); }
    
    .file-item { padding: var(--spacing-md); background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-md); margin-bottom: var(--spacing-sm); display: flex; justify-content: space-between; align-items: center; }
    .action-buttons { display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-lg); }
  `]
})
export class InventoryUploadComponent {
  branches = ['Garden 8', 'Lake View', 'Maadi', 'Nasr City', 'Heliopolis'];
  selectedBranch = this.appState.selectedBranch;
  files: UploadedFile[] = [];

  constructor(private appState: AppStateService) { }

  setBranch(branch: string) {
    this.appState.setBranch(branch);
  }

  onFileSelected(event: any) {
    const selectedFiles = event.target.files;
    this.addFiles(selectedFiles);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  private addFiles(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      this.files.push({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.name.split('.').pop()?.toUpperCase() || ''
      });
    }
    this.appState.showNotification(`${fileList.length} file(s) added`, 'info');
  }

  removeFile(file: UploadedFile) {
    this.files = this.files.filter(f => f !== file);
  }

  clearFiles() {
    this.files = [];
  }

  processFiles() {
    if (this.files.length === 0) return;
    this.appState.showNotification('Start processing files for ' + this.selectedBranch(), 'success');
    this.appState.setSection('processing');
  }
}
