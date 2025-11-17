import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface DialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="dialog-container" [ngClass]="'dialog-' + (data.type || 'warning')">
      <div class="dialog-icon">
        <mat-icon *ngIf="data.type === 'danger'">delete_forever</mat-icon>
        <mat-icon *ngIf="data.type === 'warning'">warning</mat-icon>
        <mat-icon *ngIf="data.type === 'info'">info</mat-icon>
        <mat-icon *ngIf="!data.type">help_outline</mat-icon>
      </div>
      
      <h1 mat-dialog-title class="dialog-title">{{ data.title }}</h1>
      
      <div mat-dialog-content class="dialog-content">
        <p>{{ data.message }}</p>
      </div>
      
      <div mat-dialog-actions class="dialog-actions">
        <button mat-stroked-button (click)="onNoClick()" class="btn-cancel-dialog">
          <mat-icon>close</mat-icon>
          {{ data.cancelText || 'Cancelar' }}
        </button>
        <button mat-raised-button [mat-dialog-close]="true" cdkFocusInitial 
                [class.btn-danger]="data.type === 'danger'"
                [class.btn-warning]="data.type === 'warning'"
                [class.btn-primary]="!data.type || data.type === 'info'">
          <mat-icon>check</mat-icon>
          {{ data.confirmText || 'Confirmar' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 1rem;
      min-width: 400px;
    }

    .dialog-icon {
      text-align: center;
      margin-bottom: 1rem;
    }

    .dialog-icon mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      animation: scaleIn 0.3s ease;
    }

    .dialog-danger .dialog-icon mat-icon {
      color: #ef5350;
    }

    .dialog-warning .dialog-icon mat-icon {
      color: #ffa726;
    }

    .dialog-info .dialog-icon mat-icon {
      color: #42a5f5;
    }

    @keyframes scaleIn {
      from {
        transform: scale(0);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    .dialog-title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .dialog-content {
      text-align: center;
      color: #666;
      font-size: 1rem;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .dialog-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      padding: 0;
    }

    button {
      min-width: 120px;
      padding: 10px 20px;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .btn-cancel-dialog {
      border: 2px solid #90a4ae;
      color: #90a4ae;
    }

    .btn-cancel-dialog:hover {
      background-color: #90a4ae;
      color: white;
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef5350 0%, #e53935 100%);
      color: white;
    }

    .btn-danger:hover {
      background: linear-gradient(135deg, #e53935 0%, #c62828 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(239, 83, 80, 0.3);
    }

    .btn-warning {
      background: linear-gradient(135deg, #ffa726 0%, #fb8c00 100%);
      color: white;
    }

    .btn-warning:hover {
      background: linear-gradient(135deg, #fb8c00 0%, #f57c00 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(255, 167, 38, 0.3);
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #5568d3 0%, #653a8b 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
    }

    @media (max-width: 600px) {
      .dialog-container {
        min-width: auto;
        width: 100%;
      }

      .dialog-actions {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  `],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}