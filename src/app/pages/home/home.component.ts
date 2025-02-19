import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MockApiService } from "../../services/mock-api.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import { ITask, ITaskCreation } from "../../model/model";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatButton } from "@angular/material/button";
import { CreateTaskComponent } from '../../components/create-task/create-task.component';
import {MatDialog} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

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
    MatInput
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  api = inject(MockApiService);
  dataSource = new MatTableDataSource<ITask>();
  tasks: ITask[] = [];
  displayedColumns: string[] = ['title', 'description', 'deadline', 'priority', 'status', 'assignee'];
	private dialog = inject(MatDialog);

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(CreateTaskComponent) createTaskComp: CreateTaskComponent | undefined;

  ngOnInit(): void {
    this.api.getTasks().subscribe(tasks => {
      if (tasks !== undefined) {
        this.tasks = tasks;
        this.dataSource = new MatTableDataSource<ITask>(this.tasks);
      }

      this.dataSource.sort = this.sort;
    })
  }

  addNewTask(task: ITask | null): void {
    if (task === null) { return; }
    this.tasks.push(task);
    this.dataSource.data = [...this.tasks];
  }

	openCreateTaskDialog(): void {
		const dialogRef = this.dialog.open(CreateTaskComponent);

		dialogRef.afterClosed().subscribe((result: ITaskCreation) => {
			if (result?.success) {
        this.addNewTask(result.task);
			}
		});
	}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
