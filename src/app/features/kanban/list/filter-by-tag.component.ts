import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBoardById } from '../../../store/board.selectors';

@Component({
    selector: 'app-filter-by-tag',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <button class="du-btn du-btn-outline du-btn-sm gap-2" popovertarget="tag-filter-popover" style="anchor-name: --tag-filter-anchor">
            Filter by Tag
            @if (selectedTags().length > 0) {
                <span class="du-badge du-badge-primary du-badge-sm">{{ selectedTags().length }}</span>
            }
        </button>

        @if (availableTags().length > 0) {
            <div
                popover
                id="tag-filter-popover"
                style="position-anchor: --tag-filter-anchor"
                class="du-dropdown du-menu bg-base-300 text-base-content du-w-52 du-rounded-box du-shadow max-h-96 overflow-y-auto p-2"
            >
                <div class="border-base-content/20 mb-2 border-b p-2">
                    <h3 class="text-sm font-semibold">Filter by Tags</h3>
                </div>

                <!-- Clear All Button -->
                @if (selectedTags().length > 0) {
                    <li class="mb-2">
                        <button (click)="clearAllFilters()" class="du-btn du-btn-ghost du-btn-xs text-error w-full">Clear All Filters</button>
                    </li>
                }

                <!-- Tag List -->
                @for (tag of availableTags(); track tag) {
                    <li>
                        <label class="du-label hover:bg-base-200 cursor-pointer justify-start gap-2 rounded p-2">
                            <input
                                type="checkbox"
                                class="du-checkbox du-checkbox-sm du-checkbox-primary"
                                [checked]="isTagSelected(tag)"
                                (change)="toggleTag(tag)"
                            />
                            <span class="du-badge du-badge-accent du-badge-sm">{{ tag }}</span>
                            <span class="text-xs opacity-60">({{ getTagCount(tag) }})</span>
                        </label>
                    </li>
                }
            </div>
        }
    `,
    styles: ``,
})
export class FilterByTagComponent {
    private readonly store = inject(Store);

    boardId = input.required<number>();
    selectedTags = input<string[]>([]);
    tagFiltersChanged = output<string[]>();

    private readonly board = computed(() => {
        return this.store.selectSignal(selectBoardById(this.boardId()))() ?? null;
    });

    readonly availableTags = computed(() => {
        const currentBoard = this.board();
        if (!currentBoard) return [];

        const allTags = currentBoard.lists
            .flatMap((list) => list.tasks)
            .map((task) => task.tag)
            .filter((tag) => tag && tag.trim() !== '');

        // Get unique tags
        return [...new Set(allTags)].sort();
    });

    isTagSelected(tag: string): boolean {
        return this.selectedTags().includes(tag);
    }

    toggleTag(tag: string): void {
        const currentTags = this.selectedTags();
        let newTags: string[];

        if (this.isTagSelected(tag)) {
            // Remove tag
            newTags = currentTags.filter((t) => t !== tag);
        } else {
            // Add tag
            newTags = [...currentTags, tag];
        }

        this.tagFiltersChanged.emit(newTags);
    }

    clearAllFilters(): void {
        this.tagFiltersChanged.emit([]);
    }

    getTagCount(tag: string): number {
        const currentBoard = this.board();
        if (!currentBoard) return 0;

        return currentBoard.lists.flatMap((list) => list.tasks).filter((task) => task.tag === tag).length;
    }
}
