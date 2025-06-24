import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-component',
  imports: [],
  template: `
    <p>{{ title() }} </p>
    <p>{{ description() }}</p>
    <p>{{ tag() }}</p>
  `,
  styles: ``
})
export class TaskComponent {

  title = input<string>();
  description = input<string>();
  tag = input<string>();

}
