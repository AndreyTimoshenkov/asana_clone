import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { TFilter } from "../../state/filter/filter.model";
import { FilterActions } from "../../state/filter/filter.actions";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { ASSIGNEES } from "../../model/model";
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatInput } from "@angular/material/input";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";

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
    MatSuffix
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.less'
})
export class FilterComponent {
  selectedStatus: string | null = null;
  selectedAssignee: string | null = null;
  selectedDeadline: string | null = null;
  selectedPriority: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<FilterComponent>,
    private store: Store
  ) {}

  dispatchFilterAction(filterType: TFilter, value: string | null) {
    if (value !== null) {
      this.store.dispatch(FilterActions.setFilter({ filterType, value }));
    } else {
      this.store.dispatch(FilterActions.clearFilter({ filterType }));
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dispatchFilterAction('status', this.selectedStatus);
    this.dispatchFilterAction('assignee', this.selectedAssignee);
    this.dispatchFilterAction('deadline', this.selectedDeadline);
    this.dispatchFilterAction('priority', this.selectedPriority);

    this.dialogRef.close();
  }

  protected readonly ASSIGNEES = ASSIGNEES;
}
