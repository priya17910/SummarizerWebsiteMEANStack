import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AuthComponent } from './component/auth/auth.component';
import { SummarizerComponent } from './component/summarizer/summarizer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { AddSummarizerComponent } from './component/add-summarizer/add-summarizer.component';
@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        SummarizerComponent,
        SidebarComponent,
        AddSummarizerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
    providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
    bootstrap: [AppComponent]
})
export class AppModule { }