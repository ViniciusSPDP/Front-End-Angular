import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu';
@Component({
 selector: 'app-root',
 standalone: true,
 imports: [CommonModule, RouterOutlet, MenuComponent],
 templateUrl: './app.html',
 styleUrls: ['./app.scss']
})
export class AppComponent {
 title = 'Comercio';
}