import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/components/footer/footer';
import { BoardComponent } from './features/dashboard/board-component/board-component';
import { Dashboard } from './features/dashboard/dashboard';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Nav } from './shared/components/nav/nav';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Footer, FormsModule, DragDropModule, Nav],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {}
