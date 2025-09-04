import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
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
  
    // 🔹 Address
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
    brotherDetails: '', // JSON or text describing brothers
    sisterDetails: '',  // JSON or text describing sisters
  
    // 🔹 Other
    hobbies: '',
    createdDate: '',
  
    // 🔹 Photos
    photos: []
  };
   // 🔹 Dropdown values
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
  photoUrls: string[] = [];   // ✅ built from backend photos
  currentPhotoIndex: number = 0;

  // 🔹 fullscreen viewer state
  isFullscreen: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  // ✅ Load profile + build base64 photo URLs
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

  // 🔹 Helper: build photo URLs from backend photo objects
  private buildPhotoUrls(photos: any[]): void {
    this.photoUrls = photos.map((p: any) =>
      `data:${p.contentType};base64,${p.data}`
    );
  }

  // ✅ Handle file input
  onFileChange(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  // ✅ Save (profile + photos)
  onSaveProfile(): void {
    this.profileService.saveProfile(this.profile, this.selectedFiles).subscribe({
      next: (res) => {
        alert('Profile saved successfully!');
        this.profile = res;
        this.selectedFiles = [];
        this.buildPhotoUrls(res.photos || []);
        this.currentPhotoIndex = 0;
      },
      error: () => alert('Error saving profile')
    });
  }

  // ✅ Delete profile
  onDeleteProfile(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.profileService.deleteProfile().subscribe({
        next: () => {
          alert('Profile deleted successfully!');
          this.profile = {};
          this.photoUrls = [];
          this.selectedFiles = [];
          this.currentPhotoIndex = 0;
        },
        error: () => alert('Error deleting profile')
      });
    }
  }

  // ✅ Photo navigation
  prevPhoto(): void {
    if (this.photoUrls.length > 0) {
      this.currentPhotoIndex =
        (this.currentPhotoIndex - 1 + this.photoUrls.length) %
        this.photoUrls.length;
    }
  }

  nextPhoto(): void {
    if (this.photoUrls.length > 0) {
      this.currentPhotoIndex =
        (this.currentPhotoIndex + 1) % this.photoUrls.length;
    }
  }

  // ✅ Fullscreen viewer controls
  openFullscreen(index: number): void {
    this.currentPhotoIndex = index;
    this.isFullscreen = true;
  }

  closeFullscreen(): void {
    this.isFullscreen = false;
  }
}
