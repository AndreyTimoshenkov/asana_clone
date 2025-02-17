import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  styleUrl: './list.component.less',
  template: '<ng-content select="app-list-item"></ng-content>',
})
export class ListComponent {

}
