import { Component } from '@angular/core';
import { SummarizerService } from '../../service/summarizer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-summarizer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './summarizer.component.html',
  styleUrl: './summarizer.component.css'
})
export class SummarizerComponent {
  inputText: string = '';
  summarizedText: string = '';
  userId: any = "";
  summarizedTextList: any[] = [];
  constructor(private summarizerService: SummarizerService, private authService: AuthService) { }
  ngOnInit(): void {
    this.userId = this.getUserId();
    if (this.userId)
    {
      this.getSummarizedText(this.userId);
    }
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

  getSummarizedText(userId: string) {
    this.summarizerService.getSummarizedText(userId)
      .subscribe((response: any) => {
        this.summarizedTextList = response.summarizedTexts;
      }, (error: any) => {
        console.error('Error occurred:', error);
      });
  }
}
