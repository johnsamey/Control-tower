import { Component } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';

@Component({
  selector: 'grocer-root',
  standalone: true,
  imports: [LayoutComponent],
  template: '<grocer-layout></grocer-layout>',
  styles: []
})
export class AppComponent {
  title = 'grocer-inventory-app';
}
