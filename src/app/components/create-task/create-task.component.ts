import { Component } from '@angular/core';
import {TPriority, TStatus} from "../../model/model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-task',
  imports: [],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.less'
})
export class CreateTaskComponent {
	newTaskForm = new FormGroup({
		title: new FormControl('', Validators.required),
		description: new FormControl(''),
		deadline: new FormControl('', Validators.required),
		priority: new FormControl('', Validators.required),
		status: new FormControl('', Validators.required),
		assignee: new FormControl('', Validators.required),
	})

}


// title: string,
// 	description?: string,
// 	deadline: string,
// 	priority: TPriority,
// 	status: TStatus,
// 	assignee: string,
