import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']   // <-- correct property name
})
export class ProfileComponent implements OnInit {
  profile: any = {
    // 🔹 Basic Info
    fullName: '',
    email: '',
    gender: '',
    dob: '',
    birthTime: '',
    birthPlace: '',

    // 🔹 Astrology
    raasi: '',
    natchathiram: '',
    laknam: '',
    bloodGroup: '',

    // 🔹 Cultural Info
    religion: '',
    caste: '',
    motherTongue: '',
    maritalStatus: '',

    // 🔹 Education / Work
    education: '',
    profession: '',
    employmentType: '',  // Employed / Self-Employed / Business
    companyName: '',
    companyAddress: '',
    income: 0,

    // 🔹 Physical
    height: 0,
    weight: 0,
    complexion: '',
    bodyType: '',

    // 🔹 Lifestyle
    diet: '',
    smoking: '',
    drinking: '',

    // 🔹 Address (added country/state/city)
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',

    // 🔹 Family Info
    kulatheivam: '',
    fatherName: '',
    fatherOccupation: '',
    fatherContact: '',
    fatherNativePlace: '',
    motherName: '',
    motherOccupation: '',
    motherContact: '',
    motherNativePlace: '',
    familyAnnualIncome: 0,

    // 🔹 Siblings
    brotherDetails: '',
    sisterDetails: '',

    // 🔹 Other
    hobbies: '',
    createdDate: '',

    // 🔹 Photos
    photos: []
  };

  // Dropdown lists used in template
  raasiList: string[] = [
    'Mesham (Aries)', 'Rishabam (Taurus)', 'Mithunam (Gemini)',
    'Kadagam (Cancer)', 'Simmam (Leo)', 'Kanni (Virgo)',
    'Thulam (Libra)', 'Viruchigam (Scorpio)', 'Dhanusu (Sagittarius)',
    'Magaram (Capricorn)', 'Kumbam (Aquarius)', 'Meenam (Pisces)'
  ];

  natchathiramList: string[] = [
    'Ashwini', 'Bharani', 'Karthigai', 'Rohini', 'Mrigasira',
    'Thiruvathirai', 'Punarpoosam', 'Poosam', 'Ayilyam', 'Magam',
    'Pooram', 'Uthiram', 'Hastham', 'Chithirai', 'Swathi',
    'Visakam', 'Anusham', 'Kettai', 'Moolam', 'Pooradam',
    'Uthiradam', 'Thiruvonam', 'Avittam', 'Sadayam', 'Poorattathi',
    'Uthirattathi', 'Revathi'
  ];

  laknamList: string[] = [
    'Mesham', 'Rishabam', 'Mithunam', 'Kadagam', 'Simmam', 'Kanni',
    'Thulam', 'Viruchigam', 'Dhanusu', 'Magaram', 'Kumbam', 'Meenam'
  ];

  bloodGroups: string[] = [
    'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
  ];

  selectedFiles: File[] = [];
  photoUrls: string[] = [];
  currentPhotoIndex: number = 0;
  isFullscreen: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        if (res) {
          this.profile = res;
          this.buildPhotoUrls(res.photos || []);
          this.currentPhotoIndex = 0;
        }
      },
      error: () => console.log('No profile found, please create one.')
    });
  }

  private buildPhotoUrls(photos: any[]): void {
    // backend returns contentType and base64 data
    this.photoUrls = photos.map((p: any) => `data:${p.contentType};base64,${p.data}`);
  }

  onFileChange(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSaveProfile(): void {
    this.profileService.saveProfile(this.profile, this.selectedFiles).subscribe({
      next: (res) => {
        alert('Profile saved successfully!');
        this.profile = res;
        this.selectedFiles = [];
        this.buildPhotoUrls(res.photos || []);
        this.currentPhotoIndex = 0;
      },
      error: (err) => {
        console.error('Save error', err);
        alert('Error saving profile');
      }
    });
  }

  onDeleteProfile(): void {
    if (!confirm('Are you sure you want to delete your profile?')) return;

    this.profileService.deleteProfile().subscribe({
      next: () => {
        alert('Profile deleted successfully!');
        // reset model
        this.resetProfileModel();
      },
      error: () => alert('Error deleting profile')
    });
  }

  private resetProfileModel(): void {
    // reset to initial shape (keeps properties)
    Object.keys(this.profile).forEach(k => {
      if (Array.isArray(this.profile[k])) this.profile[k] = [];
      else if (typeof this.profile[k] === 'number') this.profile[k] = 0;
      else this.profile[k] = '';
    });
    this.photoUrls = [];
    this.selectedFiles = [];
    this.currentPhotoIndex = 0;
  }

  prevPhoto(): void {
    if (this.photoUrls.length > 0) {
      this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photoUrls.length) % this.photoUrls.length;
    }
  }

  nextPhoto(): void {
    if (this.photoUrls.length > 0) {
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photoUrls.length;
    }
  }

  openFullscreen(index: number): void {
    this.currentPhotoIndex = index;
    this.isFullscreen = true;
  }

  closeFullscreen(): void {
    this.isFullscreen = false;
  }
}
