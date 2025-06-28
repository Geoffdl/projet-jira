import { Component, computed, inject, signal } from '@angular/core';
import { BoardComponent } from '../../features/kanban/board/board.component';
import { FilterByTagComponent } from '../../features/kanban/list/filter-by-tag.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-board-detail',
    imports: [BoardComponent, FilterByTagComponent],
    template: `
        <div class="space-y-6">
            <!-- Filter Controls -->
            <div class="flex justify-end">
                <app-filter-by-tag [boardId]="boardId()" [selectedTags]="selectedTags()" (tagFiltersChanged)="onTagFiltersChanged($event)" />
            </div>

            <!-- Board -->
            <app-board [boardId]="boardId()" [fullWidth]="true" [tagFilters]="selectedTags()" />
        </div>
    `,
    styles: ``,
})
/**
 * Single board view
 */
export class BoardDetailComponent {
    private route = inject(ActivatedRoute);

    private readonly paramMap = toSignal(this.route.paramMap);
    private readonly selectedTagsSignal = signal<string[]>([]);

    readonly boardId = computed(() => {
        const params = this.paramMap();
        return Number(params?.get('boardId')) || 1;
    });

    readonly selectedTags = computed(() => this.selectedTagsSignal());

    onTagFiltersChanged(tags: string[]): void {
        this.selectedTagsSignal.set(tags);
    }
}
