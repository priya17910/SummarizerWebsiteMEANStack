import { Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { SummarizerComponent } from './component/summarizer/summarizer.component';
import { AddSummarizerComponent } from './component/add-summarizer/add-summarizer.component';

export const routes: Routes = [
    { path: "", component: AuthComponent },
    { path: "summarized-text", component: AddSummarizerComponent },
    { path: "getSummarizedText", component: SummarizerComponent }
];
