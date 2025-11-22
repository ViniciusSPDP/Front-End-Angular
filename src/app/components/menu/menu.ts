import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
<div class="sidebar" [class.collapsed]="isCollapsed">
      <div class="sidebar-header">
        <div class="logo" routerLink="/" style="cursor: pointer;">
          <i class="material-icons">store</i>
          <span *ngIf="!isCollapsed">Comércio</span>
        </div>
        <button class="toggle-btn" (click)="toggleSidebar()">
          <i class="material-icons">{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</i>
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="section-title" *ngIf="!isCollapsed">
            <i class="material-icons">location_on</i>
            <span>Endereços</span>
          </div>
          <a routerLink="/ufs" routerLinkActive="active" class="nav-item">
            <i class="material-icons">map</i>
            <span *ngIf="!isCollapsed">UFs</span>
          </a>
          <a routerLink="/cidades" routerLinkActive="active" class="nav-item">
            <i class="material-icons">location_city</i>
            <span *ngIf="!isCollapsed">Cidades</span>
          </a>
          <a routerLink="/bairros" routerLinkActive="active" class="nav-item">
            <i class="material-icons">home_work</i>
            <span *ngIf="!isCollapsed">Bairros</span>
          </a>
          <a routerLink="/ruas" routerLinkActive="active" class="nav-item">
            <i class="material-icons">add_road</i>
            <span *ngIf="!isCollapsed">Ruas</span>
          </a>
          <a routerLink="/ceps" routerLinkActive="active" class="nav-item">
            <i class="material-icons">pin_drop</i>
            <span *ngIf="!isCollapsed">CEPs</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="section-title" *ngIf="!isCollapsed">
            <i class="material-icons">inventory_2</i>
            <span>Produtos</span>
          </div>
          <a routerLink="/marcas" routerLinkActive="active" class="nav-item">
            <i class="material-icons">label</i>
            <span *ngIf="!isCollapsed">Marcas</span>
          </a>
          <a routerLink="/tipos" routerLinkActive="active" class="nav-item">
            <i class="material-icons">category</i>
            <span *ngIf="!isCollapsed">Tipos</span>
          </a>
          <a routerLink="/produtos" routerLinkActive="active" class="nav-item">
            <i class="material-icons">shopping_bag</i>
            <span *ngIf="!isCollapsed">Produtos</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="section-title" *ngIf="!isCollapsed">
            <i class="material-icons">business</i>
            <span>Gestão</span>
          </div>
          <a routerLink="/sexos" routerLinkActive="active" class="nav-item">
            <i class="material-icons">wc</i>
            <span *ngIf="!isCollapsed">Sexos</span>
          </a>
          <a routerLink="/clientes" routerLinkActive="active" class="nav-item">
            <i class="material-icons">people</i>
            <span *ngIf="!isCollapsed">Clientes</span>
          </a>
          <a routerLink="/vendas" routerLinkActive="active" class="nav-item">
            <i class="material-icons">point_of_sale</i>
            <span *ngIf="!isCollapsed">Vendas</span>
          </a>
        </div>
      </nav>
    </div>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      background: white;
      border-right: 1px solid #e2e8f0;
      transition: width 0.3s ease;
      width: 260px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 70px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.25rem;
      font-weight: 600;
      color: #2d3748;
    }

    .logo i {
      font-size: 28px;
      color: #3182ce;
    }

    .toggle-btn {
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 0;
    }

    .toggle-btn:hover {
      background: #edf2f7;
      border-color: #cbd5e0;
    }

    .toggle-btn i {
      font-size: 20px;
      color: #4a5568;
    }

    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 20px 0;
    }

    .nav-section {
      margin-bottom: 24px;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #718096;
      margin-bottom: 4px;
    }

    .section-title i {
      font-size: 18px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      color: #4a5568;
      text-decoration: none;
      transition: all 0.2s ease;
      font-size: 0.95rem;
      border-left: 3px solid transparent;
      margin: 2px 0;
    }

    .nav-item i {
      font-size: 22px;
      min-width: 22px;
    }

    .nav-item:hover {
      background: #f7fafc;
      color: #2d3748;
      border-left-color: #cbd5e0;
    }

    .nav-item.active {
      background: #ebf8ff;
      color: #3182ce;
      font-weight: 500;
      border-left-color: #3182ce;
    }

    .sidebar.collapsed .nav-item {
      justify-content: center;
      padding: 12px;
    }

    .sidebar.collapsed .section-title {
      justify-content: center;
      padding: 12px;
    }

    /* Scrollbar */
    .sidebar-nav::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar-nav::-webkit-scrollbar-track {
      background: transparent;
    }

    .sidebar-nav::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 3px;
    }

    .sidebar-nav::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .sidebar {
        width: 70px;
      }

      .sidebar.collapsed {
        width: 0;
        border: none;
      }
    }
  `]
})
export class MenuComponent {
  isCollapsed = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}