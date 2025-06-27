import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    imports: [],
    template: `
        <footer class="du-footer bg-base-300 text-base-content border-primary/20 border-t py-6">
            <div class="container mx-auto text-center">
                <p class="text-base-content/80 text-sm">
                    &copy; 2025
                    <span class="text-primary hover:text-accent font-semibold transition-colors"
                        ><a href="https://github.com/Geoffdl" target="_blank">&#64;Geoffdl</a></span
                    >
                </p>
            </div>
        </footer>
    `,
    styles: ``,
})
/**
 * footer component
 */
export class FooterComponent {}
