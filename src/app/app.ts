import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './shared/nav/nav';
import { Footer } from './shared/footer/footer';
import { Task } from './features/dashboard/task/task';
import { List } from './features/dashboard/list/list';
import { Board } from './features/dashboard/board/board';
import { Dashboard } from './features/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
