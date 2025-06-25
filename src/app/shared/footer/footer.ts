import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `<footer class="du-footer bg-base-300 text-base-content border-t border-primary/20 py-6">
  <div class="container mx-auto text-center">
    <p class="text-sm text-base-content/80">
      &copy; 2025
      <span class="text-primary font-semibold hover:text-accent transition-colors"><a href="https://github.com/Geoffdl" target="_blank">&#64;Geoffdl</a></span>
    </p>
  </div>
</footer>
`,
  styles : ``,
})
export class Footer {

}
