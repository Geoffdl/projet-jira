import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-component',
  imports: [],
  template: `

    <div class="p-2">
    <div class="du-mockup-code bg-primary/70  text-primary-content hover:bg-accent-content hover:text-accent">
      <pre data-prefix="ttl"><code class="font-extrabold">{{ title() }}</code></pre>
      <pre data-prefix="dsc"><code class="font-extrabold">{{ description() }}</code></pre>
      <pre data-prefix="tag"><code class="font-extrabold">{{ tag() }}</code></pre>
    </div>
    </div>
  `,
  styles: ``
})
export class TaskComponent {

  title = input<string>();
  description = input<string>();
  tag = input<string>();

}
