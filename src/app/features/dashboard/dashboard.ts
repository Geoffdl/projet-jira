import { Component, computed, effect, inject, signal } from '@angular/core';
import { ListModel } from './dashboard-models/list-model';
import { BoardComponent } from './board-component/board-component';
import { BoardModel } from './dashboard-models/board-model';
import { ModalComponent } from '../../shared/modal-component/modal-component';
import { TaskComponent } from './task-component/task-component';

import { FormBoardComponent } from './form-board-component/form-board-component';
import { AlertComponent } from '../../shared/alert-component/alert-component';
import { BoardDataService } from './board-data-service/board-data-service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    imports: [
        BoardComponent,
        ModalComponent,
        FormBoardComponent,
        RouterOutlet,
        // BoardComponent,
        // ModalComponent,
        //
        // FormBoardComponent,
        // AlertComponent
    ],
    template: `
        <h1
            class="text-primary hover:text-accent pb-6 text-4xl font-bold transition-colors duration-200"
        >
            Dashboard
        </h1>

        <app-modal-component (openModal)="showModal()" [modalId]="modalId">
            <app-form-board-component
                (formResult)="handleFormResult($event)"
            ></app-form-board-component>
        </app-modal-component>

        <div class="mb-6 flex justify-end">
            <button
                (click)="showModal()"
                class="du-btn du-btn-primary du-btn-sm gap-2 shadow-md transition-shadow hover:shadow-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                New board
            </button>
        </div>

        <div class="space-y-6">
            @for (board of boards(); track $index) {
                @if (!$first) {
                    <div class="du-divider du-divider-accent/40"></div>
                }
                <app-board-component
                    class="overflow-x-auto"
                    [boardId]="board.id"
                ></app-board-component>
            } @empty {
                <div class="py-8 text-center">
                    <p class="text-base-content/60 italic">No boards yet!</p>
                </div>
            }
        </div>

        <router-outlet></router-outlet>
    `,
    styles: ``,
})
export class Dashboard {
    private boardService = inject(BoardDataService);
    boards = computed(() => this.boardService.boards());

    modalId = 'modalId';

    showModal() {
        const dialog = document.getElementById(
            this.modalId,
        ) as HTMLDialogElement;
        dialog.showModal();
    }
    addBoard(title: string) {
        const newBoard: BoardModel = {
            id: Date.now(),
            title,
            lists: [],
        };
        this.boardService.addBoard(newBoard);
    }
    handleFormResult(event: any) {
        this.addBoard(event.title);
        const dialog = document.getElementById(
            this.modalId,
        ) as HTMLDialogElement;
        dialog.close();
    }
}
