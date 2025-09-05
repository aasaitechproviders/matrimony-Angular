import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { InterestService } from '../../services/intrest/intrest.service';

@Component({
  selector: 'app-intrest',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './intrest.component.html',
  styleUrls: ['./intrest.component.css']
})
export class InterestComponent implements OnInit {
  incoming: any[] = [];
  outgoing: any[] = [];

  constructor(private interestService: InterestService) {}

  ngOnInit() {
    this.loadInterests();
  }

  loadInterests() {
    this.interestService.getIncoming().subscribe({
      next: data => this.incoming = data,
      error: err => console.error(err)
    });

    this.interestService.getOutgoing().subscribe({
      next: data => this.outgoing = data,
      error: err => console.error(err)
    });
  }

  accept(id: number) {
    this.interestService.acceptInterest(id).subscribe({
      next: () => this.loadInterests(),
      error: err => console.error(err)
    });
  }

  reject(id: number) {
    this.interestService.rejectInterest(id).subscribe({
      next: () => this.loadInterests(),
      error: err => console.error(err)
    });
  }
}
