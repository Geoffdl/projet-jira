import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllLists } from '../../../store/board.selectors';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-list-drop-down-selector',
    imports: [RouterLink],
    template: `
        <button class="du-btn du-btn-outline" popovertarget="theme-popover" style="anchor-name: --theme-anchor">Board details</button>
        @if (lists()) {
            <ul
                popover
                id="theme-popover"
                style="position-anchor: --theme-anchor"
                class="du-dropdown du-menu bg-accent text-accent-content du-w-52 du-rounded-box du-shadow max-h-96 overflow-y-auto"
            >
                @for (list of lists(); track $index) {
                    <li>
                        <a routerLink="board/list.id">list.title</a>
                    </li>
                }
            </ul>
        }
    `,
    styles: ``,
})
export class ListDropDownSelectorComponent {
    private readonly store = inject(Store);
    readonly lists = computed(() => {
        return this.store.selectSignal(selectAllLists())();
    });
}
