import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main-content',
    imports: [CommonModule],
    template: `
        <main class="bg-base-200 min-h-screen flex-1">
            <div class="container mx-auto max-w-8/10 px-4 py-8 lg:max-w-7/10">
                <div class="bg-base-100 min-h-[600px] rounded-lg p-6 shadow-lg">
                    <ng-content></ng-content>
                </div>
            </div>
        </main>
    `,
})
export class MainContentComponent {}
