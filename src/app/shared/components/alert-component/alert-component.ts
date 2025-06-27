import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-alert-component',
    imports: [],
    template: `
        <div role="alert" class="alert-container du-alert du-alert-success" (click)="handleClick()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ description() }}</span>
        </div>
    `,
    styles: `
        .alert-container {
            position: fixed;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
        }
    `,
})
/**
 * WIP imp of an alert / toast component
 */
export class AlertComponent {
    description = input<string>();
    close = output();

    private timeOut: any;

    constructor() {
        this.init();
    }
    init() {
        this.timeOut = setTimeout(() => {
            this.close.emit();
        }, 3000);
    }

    onDestroy() {
        if (this.timeOut) clearTimeout(this.timeOut);
    }
    handleClick() {
        this.close.emit();
        if (this.timeOut) clearTimeout(this.timeOut);
    }
}
