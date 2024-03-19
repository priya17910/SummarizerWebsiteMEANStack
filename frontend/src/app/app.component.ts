import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../app/service/auth.service';
import { SharedService } from './service/shared.service';
import { SidebarComponent } from './component/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GeeksForGeeks Summarizer';
  isLoggedIn: boolean = false;
  constructor (private router: Router, private authService: AuthService, private sharedService: SharedService) {}
  ngOnInit(): void {
    this.authService.loggedInEvent.subscribe((data: any) => {
      this.isLoggedIn = true;
    });
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token'))
    {
      this.isLoggedIn = true;
    }
  }

  login(): void {
    this.sharedService.triggerLoginEvent();
    this.router.navigate(["/"]);
  }

  register(): void {
    this.sharedService.triggerRegisterEvent();
    this.router.navigate(["/"]);
  }

  logout(): void {
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      this.router.navigate(["/"]);
  }

  loadContent(page: any) {
    if (page === "summarizedText")
    {
      this.router.navigate(["/getSummarizedText"]);
    }
    else if (page === "summarizeHere")
    {
      this.router.navigate(["/summarized-text"]);
    }
  }
}
