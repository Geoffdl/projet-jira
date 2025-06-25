import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './shared/nav/nav';
import { Footer } from './shared/footer/footer';
import { Dashboard } from './features/dashboard/dashboard';
import { BoardComponent } from './features/dashboard/board-component/board-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, Dashboard, BoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
