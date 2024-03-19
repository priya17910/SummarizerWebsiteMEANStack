import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  username!: string;
  email!: string;
  password!: string;
  credentials: any = {};
  successMessage: string = '';
  errorMessage: string = '';
  loginActive: boolean = true;
  registerActive: boolean = false;
  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) { }
  ngOnInit(): void {
    this.sharedService.loginEvent.subscribe(() => {
      this.errorMessage = "";
      this.successMessage = "";
      this.loginActive = true;
      this.registerActive = false;
    });
    this.sharedService.registerEvent.subscribe(() => {
      this.errorMessage = "";
      this.successMessage = "";
      this.registerActive = true;
      this.loginActive = false;
    });
  }

  login(): void {
    const credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.login(credentials).subscribe(
      (response: any) => {
        const token = response.token;
        localStorage.setItem("token", token);
        this.authService.emitLoggedInEvent();
        this.loginActive = false;
        this.registerActive = false;
        this.email = "";
        this.password = "";
        this.successMessage = response.message;
        this.router.navigate(["/summarized-text"]);
      },
      (error: any) => {
        console.error('Error logging in:', error);
        this.errorMessage = "Login unsuccessfull ! Please reload or try in incognito tab";
      }
    );
    this.errorMessage = "";
    this.successMessage = "";
    this.email = "";
    this.password = "";
  }

  register(): void {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe(
      (response: any) => {
        this.successMessage = response.message;
        this.loginActive = true;
        this.registerActive = false;
        this.username = '';
        this.email = '';
        this.password = '';
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = "User not registered successfully";
      }
    );
    this.username = "";
    this.email = "";
    this.password = "";
  }
}
