import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatButton } from "@angular/material/button";
import { CreateTaskComponent } from '../../components/create-task/create-task.component';
import {MatDialog} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { select, Store } from "@ngrx/store";
import { ITask, TaskState } from '../../state/task/task.model';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-home',
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    MatIconModule,
    MatFormField,
    MatFormFieldModule,
    MatInput,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<ITask>();
  displayedColumns: string[] = ['title', 'description', 'deadline', 'priority', 'status', 'assignee'];

  private destroyRef = inject(DestroyRef);
	private dialog = inject(MatDialog);
  private store: Store<{ tasks: TaskState }> = inject(Store<{ tasks: TaskState }>);
  tasks$ = this.store.pipe(
    select(state => state.tasks.tasks),
    takeUntilDestroyed(this.destroyRef),
  );

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(CreateTaskComponent) createTaskComp: CreateTaskComponent | undefined;

  ngOnInit(): void {
    this.tasks$.subscribe(tasks => {
      this.dataSource.data = tasks || [];
    });
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

	openCreateTaskDialog(): void {
		this.dialog.open(CreateTaskComponent);
	}

  applyFilter(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dataSource.filter = inputElement.value.trim().toLowerCase();
    }
  }
}
