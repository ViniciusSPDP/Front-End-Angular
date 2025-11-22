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
      gap: 12px;
      max-width: 400px;
    `;
    document.body.appendChild(this.container);
  }

  show(message: string, type: NotificationType = 'info', duration: number = 4000): void {
    if (!this.container) return;

    const notification = this.createNotification(message, type);
    this.container.appendChild(notification);

    setTimeout(() => {
      this.removeNotification(notification);
    }, duration);
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration || 6000);
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
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    const colors = {
      success: { bg: '#10b981', text: 'white' },
      error: { bg: '#ef4444', text: 'white' },
      warning: { bg: '#f59e0b', text: 'white' },
      info: { bg: '#3b82f6', text: 'white' }
    };

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
        ">${icons[type]}</div>
        <span style="flex: 1; line-height: 1.5;">${message}</span>
        <button class="close-btn" style="
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          transition: background 0.2s;
        ">
          <span style="font-size: 18px;">×</span>
        </button>
      </div>
    `;

    notification.style.cssText = `
      display: flex;
      align-items: center;
      padding: 16px 20px;
      background: ${colors[type].bg};
      color: ${colors[type].text};
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      animation: slideInRight 0.3s ease;
      font-weight: 500;
      font-size: 0.95rem;
      min-width: 350px;
      cursor: pointer;
      transition: transform 0.2s ease;
    `;

    notification.addEventListener('mouseenter', () => {
      notification.style.transform = 'translateX(-5px)';
    });

    notification.addEventListener('mouseleave', () => {
      notification.style.transform = 'translateX(0)';
    });

    const closeBtn = notification.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('mouseenter', () => {
        (closeBtn as HTMLElement).style.background = 'rgba(255,255,255,0.3)';
      });
      closeBtn.addEventListener('mouseleave', () => {
        (closeBtn as HTMLElement).style.background = 'rgba(255,255,255,0.2)';
      });
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeNotification(notification);
      });
    }

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