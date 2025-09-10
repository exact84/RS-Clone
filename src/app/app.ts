import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.production';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  ngOnInit() {
    if (environment.API_KEY) console.log('🔑 environment.API_KEY:', environment.API_KEY);
    if (import.meta.env) console.log('🔑 import.meta.env:', import.meta.env);
  }
}
