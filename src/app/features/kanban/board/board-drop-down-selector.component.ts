import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllBoards } from '../../../store/board.selectors';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-board-drop-down-selector',
    imports: [RouterLink],
    template: `
        <button class="hover:text-primary" popovertarget="board-popover" style="anchor-name: --board-anchor">Board details</button>
        @if (boards()) {
            <ul
                popover
                id="board-popover"
                style="position-anchor: --board-anchor"
                class="du-dropdown du-menu bg-base-300 text-base-content du-w-52 du-rounded-box du-shadow max-h-96 overflow-y-auto"
            >
                @for (board of boards(); track $index) {
                    <li>
                        <a [routerLink]="['/board/', board.id]">{{ board.title }}</a>
                    </li>
                }
            </ul>
        }
    `,
    styles: ``,
})
export class BoardDropDownSelectorComponent {
    private readonly store = inject(Store);
    readonly boards = computed(() => {
        return this.store.selectSignal(selectAllBoards())();
    });
}
