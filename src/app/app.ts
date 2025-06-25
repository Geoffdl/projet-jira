import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './shared/nav/nav';
import { Footer } from './shared/footer/footer';
import { BoardComponent } from './features/dashboard/board-component/board-component';
import { Dashboard } from './features/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
