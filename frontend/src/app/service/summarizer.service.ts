import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummarizerService {
  private baseUrl = "http://localhost:5000/api/summarize";
  constructor(private http: HttpClient) { }

  summarizeText(inputText: string, userId: string, summaryLength: number): Observable<any> {
    console.log("In service");
    return this.http.post<any>(`${this.baseUrl}/summarized-text`, { text: inputText, userId: userId, summaryLength: summaryLength });
  }

  getSummarizedText(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/summarized-text/${userId}`);
  }
}
