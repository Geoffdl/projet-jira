import { Component, output } from '@angular/core';

@Component({
    selector: 'app-click-action',
    imports: [],
    template: `
        <div
            class="hover:text-accent-content cursor-grab shadow-md transition-all duration-300 hover:shadow-lg active:cursor-grabbing"
            (contextmenu)="onRightClick($event)"
            (dblclick)="onDoubleClick($event)"
        >
            <ng-content></ng-content>
        </div>
    `,
    styles: ``,
})
export class ClickActionComponent {
    rightClick = output<MouseEvent>();
    doubleClick = output<MouseEvent>();

    onRightClick(event: MouseEvent): void {
        event.preventDefault();
        this.rightClick.emit(event);
    }

    onDoubleClick(event: MouseEvent): void {
        this.doubleClick.emit(event);
    }
}
