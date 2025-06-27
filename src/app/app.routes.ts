import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BoardDetailComponent } from './pages/board-detail/board-detail.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'board/:boardId', component: BoardDetailComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];
