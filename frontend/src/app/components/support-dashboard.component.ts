import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService, Ticket } from '../services/ticket.service';

@Component({
  selector: 'app-support-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-dashboard.component.html',
  styleUrls: ['./support-dashboard.component.css']
})
export class SupportDashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = false;
  statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  error?: string;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.loading = true;
    this.ticketService.listTickets().subscribe({
      next: tickets => {
        this.tickets = tickets;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load tickets';
        this.loading = false;
      }
    });
  }

  updateStatus(ticket: Ticket, status: string): void {
    this.ticketService.updateStatus(ticket.id, status).subscribe({
      next: updated => {
        ticket.status = updated.status;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to update status';
      }
    });
  }
}

