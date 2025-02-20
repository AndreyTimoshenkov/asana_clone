import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { select, Store } from "@ngrx/store";
import { FilterActions } from "../../state/filter/filter.actions";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { TPriorityFilter, TStatusFilter } from "../../model/model";
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatInput } from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { selectAllFilters } from "../../state/filter/filter.selectors";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { selectAllAssignees } from "../../state/assignees/assignee.selector";
import { map, startWith } from "rxjs";

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

  private dialogRef = inject(MatDialogRef<FilterComponent>);
  private store =inject(Store);
  private destroyRef = inject(DestroyRef);

  protected assignees$$ = toSignal(this.store.pipe(select(selectAllAssignees)));

  filterForm = new FormGroup({
    priority: new FormControl<TPriorityFilter>(null, { nonNullable: false }),
    deadline: new FormControl<Date | null>(null),
    status: new FormControl<TStatusFilter>(null, { nonNullable: false }),
    assignee: new FormControl<string>(''),
  });

  protected filteredOptions$$ = toSignal(this.filterForm.get('assignee')!.valueChanges.pipe(
    startWith(''),
    map((value) => this.filter(value || ''))
  ));

  ngOnInit() {
    this.store.pipe(
      select(selectAllFilters),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(filters => {
      this.filterForm.patchValue(filters, { emitEvent: false });
    });
  }

  private filter(value: string): string[]  {
    if (!this.assignees$$()) { return  []; }

    const filterValue = value.toLowerCase();
    return this.assignees$$()!.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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
}
