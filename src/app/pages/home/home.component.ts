import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatButton } from "@angular/material/button";
import { CreateTaskComponent } from '../../components/create-task/create-task.component';
import {MatDialog} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { select, Store } from "@ngrx/store";
import { ITask, TaskState } from '../../state/task/task.model';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FilterComponent } from "../../components/filter/filter.component";
import { FilterState } from "../../state/filter/filter.model";
import { combineLatest, map, Observable } from "rxjs";
import { selectAllFilters } from "../../state/filter/filter.selectors";
import { DateTime } from "luxon";

@Component({
  selector: 'app-home',
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatSortHeader,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatButton,
    MatIconModule,
    MatFormFieldModule,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<ITask>();
  displayedColumns: string[] = ['title', 'description', 'deadline', 'priority', 'status', 'assignee'];

  private destroyRef = inject(DestroyRef);
	private dialog = inject(MatDialog);
  private store: Store<{ tasks: TaskState }> = inject(Store<{ tasks: TaskState, filters: FilterState }>);

  private tasks$ = this.store.pipe(
    select(state => state.tasks.tasks),
    takeUntilDestroyed(this.destroyRef),
  );

  filteredTasks$: Observable<ITask[]>;

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(CreateTaskComponent) createTaskComp: CreateTaskComponent | undefined;

  constructor() {
    this.filteredTasks$ = combineLatest([
      this.tasks$,
      this.store.pipe(select(selectAllFilters))
    ]).pipe(
      map(([tasks, filters]) => this.filterTasks(tasks, filters))
    );
  }

  ngOnInit(): void {
    this.filteredTasks$.subscribe(tasks => {
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

  openFiltersDialog() {
    this.dialog.open(FilterComponent);
  }

  private filterTasks(tasks: ITask[], filters: FilterState): ITask[] {
    return tasks.filter(task => {
      let match = true;

      if (filters.assignee && task.assignee !== filters.assignee) {
        match = false;
      }

      if (filters.deadline) {
        const filterDeadline = DateTime.fromISO(filters.deadline.toString()).toISODate();

        if (task.deadline !== filterDeadline) {
          return false;
        }
      }

      if (filters.priority && task.priority !== filters.priority) {
        match = false;
      }

      if (filters.status && task.status !== filters.status) {
        match = false;
      }

      return match;
    });
  }
}
