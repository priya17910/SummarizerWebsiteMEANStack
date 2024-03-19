import { Component } from '@angular/core';
import { SummarizerService } from '../../service/summarizer.service';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-summarizer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-summarizer.component.html',
  styleUrl: './add-summarizer.component.css'
})
export class AddSummarizerComponent {
  inputText: string = '';
  summarizedText: string = '';
  userId: any = "";
  summaryLength: number = 1;
  constructor(private summarizerService: SummarizerService, private authService: AuthService) { }
  ngOnInit(): void {
  }
  getUserId(): string | null {
    if (typeof localStorage !== 'undefined')
    {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        return tokenPayload.user.id;
      }
    }
    return null;
  }
  summarize() {
    if (this.getUserId() && this.getUserId() !== "")
    {
      this.userId = this.getUserId();
    }
    this.summarizerService.summarizeText(this.inputText, this.userId, this.summaryLength)
      .subscribe((response: any) => {
        this.summarizedText = response.summary;
      }, (error: any) => {
        console.error('Error occurred:', error);
      });
  }
}
