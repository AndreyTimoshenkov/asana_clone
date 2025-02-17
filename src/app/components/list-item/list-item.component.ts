import { Component, Input } from '@angular/core';
import { ITask } from "../../model/model";

@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.less'
})
export class ListItemComponent {
  @Input() task: ITask | undefined;

}
