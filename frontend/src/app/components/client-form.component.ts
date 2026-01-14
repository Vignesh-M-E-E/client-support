import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService, Ticket } from '../services/ticket.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {
  ticket?: Ticket;
  submitting = false;
  error?: string;

  form = this.fb.group({
    title: this.fb.nonNullable.control('', Validators.required),
    description: this.fb.nonNullable.control('', Validators.required),
    clientName: this.fb.nonNullable.control('', Validators.required)
  });

  constructor(private fb: FormBuilder, private ticketService: TicketService) {}

  submit(): void {
    this.error = undefined;
  
    // 🧩 Validate form
    if (this.form.invalid) {
      this.error = 'Please fill in all required fields.';
      this.form.markAllAsTouched(); // ✅ Highlights missing fields
      return;
    }
  
    this.submitting = true;
  
    // 🧠 Destructure values safely
    const { title, description, clientName } = this.form.getRawValue();
  
    this.ticketService.createTicket({ title, description, clientName }).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        this.form.reset();
        this.submitting = false;
  
        // ✅ Optional: show success message
        // this.success = 'Ticket created successfully!';
      },
      error: (err) => {
        console.error('Error creating ticket:', err);
        this.error = err?.error?.message || 'Failed to submit ticket';
        this.submitting = false;
      },
      complete: () => {
        // ✅ Optional: clean up or log
        console.log('Ticket submission completed');
      }
    });
  }
  
}

