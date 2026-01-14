import { Component } from '@angular/core';
import { ClientFormComponent } from './components/client-form.component';
import { SupportDashboardComponent } from './components/support-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClientFormComponent, SupportDashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}

