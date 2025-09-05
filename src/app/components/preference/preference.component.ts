import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PreferenceService } from '../../services/preference/preference.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.css'
})
export class PreferenceComponent implements OnInit {

  prefs: any = {
    minAge: null,
    maxAge: null,
    minHeight: null,
    maxHeight: null,
    religion: '',
    caste: '',
    education: '',
    profession: '',
    country: '',
    state: '',
    city: '',
    diet: '',
    smoking: '',
    drinking: ''
  };
  casteList: string[] = [];

  
  saving = false;
  loading = false;

  constructor(private prefService: PreferenceService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.prefService.getPreferences().subscribe({
      next: (res) => {
        if (res) this.prefs = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false; // keep defaults if not found
      }
    });
  }

  save(form: NgForm): void {
    this.saving = true;
    this.prefService.savePreferences(this.prefs).subscribe({
      next: () => {
        this.saving = false;
        alert('Preferences saved!');
      },
      error: () => {
        this.saving = false;
        alert('Error saving preferences');
      }
    });
  }

  delete(): void {
    if (!confirm('Are you sure you want to clear your partner preferences?')) return;
    this.prefService.deletePreferences().subscribe({
      next: () => {
        this.prefs = {
          minAge: null,
          maxAge: null,
          minHeight: null,
          maxHeight: null,
          religion: '',
          caste: '',
          education: '',
          profession: '',
          country: '',
          state: '',
          city: '',
          diet: '',
          smoking: '',
          drinking: ''
        };
        alert('Preferences removed.');
      },
      error: () => alert('Error removing preferences')
    });
  }
}
