import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  filters: any = {
    religion: '',
    caste: '',
    education: '',
    income: '',
    location: ''
  };
  results: any[] = [];
  loading = false;

  constructor(private searchService: SearchService) {}

  applyFilters() {
    this.loading = true;
    this.searchService.search(this.filters).subscribe({
      next: data => {
        this.results = data;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  viewProfile(profile: any) {
    alert('Viewing profile: ' + profile.fullName);
  }
}
