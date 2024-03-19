import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isLoggedIn: boolean = true;
  constructor () {}
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined')
    {
      const token = localStorage.getItem('token');
      if (token)
      {
        this.isLoggedIn = true;
      }
    }
  }
  @Output() contentLoad = new EventEmitter<string>();

  loadContent(page: any) {
    console.log("Event emit");
    this.contentLoad.emit(page);
  }
}
