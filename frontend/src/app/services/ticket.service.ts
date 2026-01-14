// frontend/src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  clientName: string;
  status: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  // Must point to your Spring Boot base URL
  private apiBase = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  createTicket(body: Pick<Ticket, 'title' | 'description' | 'clientName'>): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiBase}/tickets`, body);
  }

  listTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiBase}/tickets`);
  }

  updateStatus(id: number, status: string): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiBase}/tickets/${id}`, { status });
  }
}