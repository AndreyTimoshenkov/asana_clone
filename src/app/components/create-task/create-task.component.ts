import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { ITask, ITaskForm, TPriority, TStatus } from "../../model/model";
import { MatDialogRef } from "@angular/material/dialog";
import { select, Store } from "@ngrx/store";
import { TaskActions } from "../../state/task/task.actions";
import { selectAllAssignees } from "../../state/assignees/assignee.selector";
import { toSignal } from "@angular/core/rxjs-interop";
import { addAssignee } from "../../state/assignees/assignee.actions";
import { map, startWith } from "rxjs";

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
    MatAutocompleteTrigger,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.less'
})
export class CreateTaskComponent {

  newTaskForm = new FormGroup<ITaskForm>(<ITaskForm>{
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true }),
    deadline: new FormControl<Date | string | null>(null, { validators: [Validators.required] }),
    priority: new FormControl<TPriority>('medium', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl<TStatus>('open', { nonNullable: true, validators: [Validators.required] }),
    assignee: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  readonly dialogRef = inject(MatDialogRef<CreateTaskComponent>);
  private store = inject(Store);

  private assignees$$ = toSignal(this.store.pipe(select(selectAllAssignees)));

  protected filteredOptions$$ = toSignal(this.newTaskForm.get('assignee')!.valueChanges.pipe(
    startWith(''),
    map((value) => this.filter(value || ''))
  ));

  private filter(value: string): string[]  {
    if (!this.assignees$$()) { return  []; }

    const filterValue = value.toLowerCase();
    return this.assignees$$()!.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  createTask(): void {
    const formValues = this.newTaskForm.value;

    const task: ITask = {
      title: formValues.title!,
      description: formValues.description || undefined,
      deadline: formValues.deadline!.toString().slice(0, 10),
      priority: formValues.priority!,
      status: formValues.status!,
      assignee: formValues.assignee!,
    };

    this.store.dispatch(TaskActions.addTask({ task }));

    if (this.isNewAssignee(formValues.assignee!)) {
      this.store.dispatch(addAssignee({ assignee: formValues.assignee as string }));
    }
  }

  onSubmit() {
    this.createTask();
    this.dialogRef.close();
    this.newTaskForm.reset();
  }

  isNewAssignee(assignee: string): boolean {
    return !this.assignees$$()?.includes(assignee);
  }
}
