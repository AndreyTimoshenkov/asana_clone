import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { select, Store } from "@ngrx/store";
import { FilterActions } from "../../state/filter/filter.actions";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { ASSIGNEES, TPriorityFilter, TStatusFilter } from "../../model/model";
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatInput } from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { selectAllFilters } from "../../state/filter/filter.selectors";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-filter',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepickerModule,

  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.less'
})
export class FilterComponent implements OnInit {

  filterForm = new FormGroup({
    priority: new FormControl<TPriorityFilter>(null, { nonNullable: false }),
    deadline: new FormControl<Date | null>(null),
    status: new FormControl<TStatusFilter>(null, { nonNullable: false }),
    assignee: new FormControl<string>(''),
  });

  constructor(
    private dialogRef: MatDialogRef<FilterComponent>,
    private store: Store,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.store.pipe(
      select(selectAllFilters),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(filters => {
      this.filterForm.patchValue(filters, { emitEvent: false });
    });
  }

  onSave() {
    const value = this.filterForm.value;

    this.store.dispatch(
      FilterActions.setFilter({ filterType: 'assignee', value: value.assignee! })
    );
    this.store.dispatch(
      FilterActions.setFilter({ filterType: 'deadline', value: value.deadline! })
    );
    this.store.dispatch(
      FilterActions.setFilter({ filterType: 'priority', value: value.priority! })
    );
    this.store.dispatch(
      FilterActions.setFilter({ filterType: 'status', value: value.status! })
    );

    this.dialogRef.close();
  }

  clearFilters() {
    this.store.dispatch(FilterActions.clearAllFilters());
    this.filterForm.reset();
  }

  protected readonly ASSIGNEES = ASSIGNEES;
}
