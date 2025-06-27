import { Routes } from '@angular/router';
import { BoardDetailsComponent } from './features/board-details/board-details-component/board-details-component';
import { HomeComponent } from './features/home/home-component/home-component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'board/:boardId', component: BoardDetailsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];
