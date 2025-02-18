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
import { ITask } from "../../model/model";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatButton } from "@angular/material/button";

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
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  api = inject(MockApiService);
  dataSource = new MatTableDataSource<ITask>();
  tasks: ITask[] = [];
  displayedColumns: string[] = ['title', 'description', 'deadline', 'priority', 'status', 'assignee'];

  @ViewChild(MatSort) sort: MatSort | null = null;

  ngOnInit(): void {
    this.api.getTasks().subscribe(tasks => {
      if (tasks !== undefined) {
        this.tasks = tasks;
        this.dataSource = new MatTableDataSource<ITask>(this.tasks);
      }

      this.dataSource.sort = this.sort;
    })
  }

  addNewTask(task: ITask): void {
    this.tasks.push(task);
    this.dataSource.data = [...this.tasks];
  }
}
