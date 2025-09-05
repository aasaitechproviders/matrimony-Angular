import { Component } from '@angular/core';
import { MatchService } from '../../services/match/match.service';
import { ChatService } from '../../services/chat/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterestService } from '../../services/intrest/intrest.service';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {
  matches: any[] = [];
  loading = true;
  selectedProfile: any = null;

  photoUrls: string[] = [];
  selectedFiles: File[] = [];
  currentPhotoIndex = 0;
  isFullscreen = false;

  constructor(
    private matchService: MatchService,
    private interestService: InterestService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.matchService.getMatches().subscribe({
      next: (data) => {
        this.matches = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  selectProfile(profile: any) {
    this.selectedProfile = profile;
    this.buildPhotoUrls(profile.photos || []);
    this.currentPhotoIndex = 0;
  }

  calculateAge(dob: string): number {
    if (!dob) return 0;
    const birth = new Date(dob);
    const diff = Date.now() - birth.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
  }

  // 🔹 Photo helpers
  private buildPhotoUrls(photos: any[]): void {
    this.photoUrls = photos.map(
      (p: any) => `data:${p.contentType};base64,${p.data}`
    );
  }

  prevPhoto(): void {
    if (this.photoUrls.length > 0) {
      this.currentPhotoIndex =
        (this.currentPhotoIndex - 1 + this.photoUrls.length) % this.photoUrls.length;
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

  // 🔹 NEW Methods
  sendInterest(userId: number): void {
    this.interestService.sendInterest(userId).subscribe({
      next: () => alert('💖 Interest sent successfully!'),
      error: (err) => console.error('Error sending interest', err)
    });
  }

  startChat(userId: number): void {
    this.chatService.startChat(userId).subscribe({
      next: (chat) => alert('💬 Chat started! Chat ID: ' + chat.id),
      error: (err) => console.error('Error starting chat', err)
    });
  }

  startCall(userId: number): void {
    // placeholder for premium call feature
    alert('📞 Starting call with user ' + userId);
  }
}
