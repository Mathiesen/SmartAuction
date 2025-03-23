import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, MatToolbar, RouterLink, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = '';
  bidAmount: number = 0;

  constructor(private router: Router) {

  }

  createAuction() {
    this.router.navigate(['/', 'createAuction']);
  }
}
