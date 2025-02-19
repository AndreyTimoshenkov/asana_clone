import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { ASSIGNEES, ITask, ITaskForm, TPriority, TStatus } from "../../model/model";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-create-task',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    MatButton,
    MatIcon,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    MatAutocomplete,
    MatAutocompleteTrigger
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.less'
})
export class CreateTaskComponent {

  newTaskForm = new FormGroup<ITaskForm>({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true }),
    deadline: new FormControl<Date | null>(null, { validators: [Validators.required] }),
    priority: new FormControl<TPriority>('medium', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl<TStatus>('open', { nonNullable: true, validators: [Validators.required] }),
    assignee: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected readonly ASSIGNEES = ASSIGNEES;
  @Output() taskCreated = new EventEmitter<ITask>();
  @Output() dialogToBeClosed = new EventEmitter<void>();

  constructor(readonly dialogRef: MatDialogRef<CreateTaskComponent>) {}

  onSubmit() {
    const formValues = this.newTaskForm.value;
    const task: ITask = {
      title: formValues.title!,
      description: formValues.description || undefined,
      deadline: (formValues.deadline!).toString().slice(0, 10),
      priority: formValues.priority!,
      status: formValues.status!,
      assignee: formValues.assignee!,
    };
    const taskData = { success: true, task: task };
    this.dialogRef.close(taskData);
    this.newTaskForm.reset();
  }

  onCancel() {
    const taskData = { success: false, task: null };
    this.dialogRef.close(taskData);
  }
}
