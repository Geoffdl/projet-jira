import { Component, input, model } from '@angular/core';
import { TaskModel } from '../dashboard-models/task-model';

@Component({
  selector: 'app-task-component',
  imports: [],
  template: `

    <div class="p-2">
      <div class="du-mockup-code bg-primary/70  text-primary-content hover:bg-accent-content hover:text-accent">
        <pre data-prefix="ttl"><code class="font-extrabold">{{ task().title }}</code></pre>
        <pre data-prefix="dsc"><code class="font-extrabold">{{ task().description }}</code></pre>
        <pre data-prefix="tag"><code class="font-extrabold">{{ task().tag }}</code></pre>
      </div>
    </div>
  `,
  styles: ``
})
export class TaskComponent {

  task = input.required<TaskModel>();

}
