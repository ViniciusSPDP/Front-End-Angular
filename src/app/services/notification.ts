import { Injectable } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private container: HTMLElement | null = null;

  constructor() {
    this.createContainer();
  }

  private createContainer(): void {
    if (typeof document === 'undefined') return;
    
    this.container = document.createElement('div');
    this.container.id = 'notification-container';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    `;
    document.body.appendChild(this.container);
  }

  show(message: string, type: NotificationType = 'info', duration: number = 3000): void {
    if (!this.container) return;

    const notification = this.createNotification(message, type);
    this.container.appendChild(notification);

    // Auto-remove após o tempo especificado
    setTimeout(() => {
      this.removeNotification(notification);
    }, duration);
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  private createNotification(message: string, type: NotificationType): HTMLElement {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };

    const colors = {
      success: '#26de81',
      error: '#ef5350',
      warning: '#ffa726',
      info: '#42a5f5'
    };

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <i class="material-icons" style="font-size: 24px;">${icons[type]}</i>
        <span style="flex: 1;">${message}</span>
        <button class="close-btn" style="
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        ">
          <i class="material-icons" style="font-size: 18px;">close</i>
        </button>
      </div>
    `;

    notification.style.cssText = `
      display: flex;
      align-items: center;
      padding: 16px 20px;
      background: ${colors[type]};
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease;
      font-weight: 500;
      font-size: 0.95rem;
      min-width: 300px;
      cursor: pointer;
      transition: transform 0.2s ease;
    `;

    // Efeito hover
    notification.addEventListener('mouseenter', () => {
      notification.style.transform = 'translateX(-5px)';
    });

    notification.addEventListener('mouseleave', () => {
      notification.style.transform = 'translateX(0)';
    });

    // Botão de fechar
    const closeBtn = notification.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeNotification(notification);
      });
    }

    // Click para fechar
    notification.addEventListener('click', () => {
      this.removeNotification(notification);
    });

    return notification;
  }

  private removeNotification(notification: HTMLElement): void {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
}

// Adicione estas animações no seu styles.scss global
/*

*/